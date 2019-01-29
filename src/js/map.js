import * as d3 from "d3";
import * as topojson from "topojson";
import throttle from "lodash.throttle";
import data from "./csv-data";
import cd113 from "../data/states-projected.json";
import formatPercent from "./format-percent";
import { openPopUp, updatePopUp } from "./popup";

let mobile = false;

if (window.screen.width < 500) {
  mobile = true;
}

let path = d3.geoPath().projection(null);

let m_width = $(".map-container").outerWidth();
let widthMap = 790;
let heightMap = 490;
let aspectMap = heightMap / widthMap;

let svgMap = d3
  .select("#map")
  .attr("preserveAspectRatio", "xMidYMin")
  .attr("viewBox", "85 5 " + widthMap + " " + heightMap)
  .attr("width", m_width)
  .attr("height", m_width * aspectMap);

let keyMargin = { top: 5, right: 0, bottom: 0, left: 0 };
let keyWidth = 240 - keyMargin.left - keyMargin.right;
let keyHeight = 35 - keyMargin.top - keyMargin.bottom;

let svgKey = d3
  .select("#key")
  .attr("width", keyWidth + keyMargin.left + keyMargin.right)
  .attr("height", keyHeight + keyMargin.top + keyMargin.bottom)
  .append("g")
  .attr("transform", "translate(" + keyMargin.left + "," + keyMargin.top + ")");

let g = svgKey.append("g").attr("class", "key");

let features;
// let housePolygons;
// let cities;
let statePolygons;

const scaleExtent = [1, 20];
const zoom = d3
  .zoom()
  .scaleExtent(scaleExtent)
  .extent([[0, 0], [widthMap, heightMap]])
  .on("zoom", zoomed);

let t = [0, 0];
let s = 1;

// const districtBorderWidth = 0.3;
const stateBorderWidth = 1.25;
// let placeLabelSize;
let stateLabelSize;

const transitionSpeed = 600;

if (mobile) {
  // placeLabelSize = widthMap / m_width * 9;
  stateLabelSize = (widthMap / m_width) * 9;
} else {
  // placeLabelSize = widthMap / m_width * 13;
  stateLabelSize = (widthMap / m_width) * 13;
}

const tooltip = d3.select("#mapTooltip");

const colorKey6blue = [
  "rgb(199,233,180)",
  "rgb(127,205,187)",
  "rgb(65,182,196)",
  "rgb(29,145,192)",
  "rgb(34,94,168)",
  "rgb(12,44,132)"
];
const colorKey6red = [
  "rgb(255,213,125)",
  "rgb(255,184,97)",
  "rgb(255,138,72)",
  "rgb(254,80,54)",
  "rgb(228,38,41)",
  "rgb(165,24,42)"
];

const redDomain = [0.12, 0.16, 0.2, 0.24, 0.28];
const blueDomain = [0.1, 0.15, 0.2, 0.25, 0.3];
const redxDomain = [0, 0.32];
const bluexDomain = [0, 0.4];

let color = d3
  .scaleThreshold()
  .domain(redDomain)
  .range(colorKey6red);

const state = {
  map: "states",
  series: "all",
  view: "affectedAllShare"
};

let x = d3
  .scaleLinear()
  .domain(redxDomain)
  .range([0, 230]);

let xAxis = d3
  .axisBottom(x)
  .tickFormat(d3.format(".0%"))
  .tickValues(color.domain());

let active = d3.select(null);
let stateLabels;

$(window).resize(
  throttle(function() {
    const w = $(".map-container").outerWidth();

    if (window.screen.width < 500) {
      mobile = true;
    }

    svgMap.attr("width", w);
    svgMap.attr("height", w * aspectMap);
    // placeLabelSize = widthMap / w * 13;
    stateLabelSize = (widthMap / w) * 13;

    svgMap
      .transition()
      .duration(transitionSpeed)
      .call(zoom.transform, d3.zoomIdentity.translate(t[0], t[1]).scale(s));
  }, 20)
);

// function eraseMap() {
//   svgMap.select("g").remove();
// }

function drawKey() {
  g.selectAll("rect")
    .data(
      color.range().map(function(d, i) {
        return {
          x0: i ? x(color.domain()[i - 1]) : x.range()[0],
          x1: i < color.domain().length ? x(color.domain()[i]) : x.range()[1],
          z: d
        };
      })
    )
    .enter()
    .append("rect")
    .attr("height", 8)
    .attr("x", function(d) {
      return d.x0;
    })
    .attr("width", function(d) {
      return d.x1 - d.x0;
    })
    .style("fill", function(d) {
      return d.z;
    });

  g.call(xAxis)
    .append("text")
    .attr("class", "caption")
    .attr("y", -6);
}

function updateKey() {
  xAxis.scale(x).tickValues(color.domain());

  g.selectAll("rect")
    .data(
      color.range().map(function(d, i) {
        return {
          x0: i ? x(color.domain()[i - 1]) : x.range()[0],
          x1: i < color.domain().length ? x(color.domain()[i]) : x.range()[1],
          z: d
        };
      })
    )
    .transition()
    .duration(transitionSpeed)
    .attr("height", 8)
    .attr("x", function(d) {
      return d.x0;
    })
    .attr("width", function(d) {
      return d.x1 - d.x0;
    })
    .style("fill", function(d) {
      return d.z;
    });

  g.transition()
    .duration(transitionSpeed)
    .call(xAxis);
}

function onMouseover(d) {
  if (screen.width > 600) {
    d3.select(this).classed("hover", true);

    tooltip
      .html(
        "<h5>" +
          data[d.id].districtName +
          "</h5><p>" +
          formatPercent(data[d.id][state.view]) +
          "</p><p class=\"more\">Click to get state scorecard</p>"
      )
      .style("display", "block");
  }
}

function drawStates(view, series) {
  state.view = view;
  state.series = series;

  tooltip.style("display", "none");
  s = 1;
  t = [0, 0];

  svgMap
    .call(zoom)
    .on("click", stopped, true)
    .on("wheel.zoom", null);

  svgMap
    .append("rect")
    .attr("class", "background")
    .attr("fill", "white")
    .attr("width", m_width)
    .attr("height", m_width * aspectMap)
    .on("click", resetMap);

  features = svgMap.append("g").classed("features", true);

  statePolygons = features
    .selectAll("path")
    .data(topojson.feature(cd113, cd113.objects.states).features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", function(d) {
      return "state " + d.id;
    })
    .attr("fill", function(d) {
      if (isNaN(parseFloat(data[d.id][view]))) {
        return "#d7d7d7";
      } else {
        return color(data[d.id][view]);
      }
    })
    .on("mouseover", onMouseover)
    .on("mousemove", function() {
      if (screen.width > 600) {
        tooltip
          .style(
            "left",
            d3.mouse(document.getElementById("interactive-container"))[0] + "px"
          )
          .style(
            "top",
            d3.mouse(document.getElementById("interactive-container"))[1] +
              20 +
              "px"
          );
      }
    })
    .on("mouseout", function() {
      if (screen.width > 600) {
        d3.select(this).classed("hover", false);
        tooltip.style("display", "none");
      }
    })
    .on("click", function(d) {
      if (active.node() === this) {
        return resetMap();
      }

      active.classed("selected", false);
      stateLabels.classed("selected", false);

      active = d3.select(this).classed("selected", true);
      d3.select(`.stateLabel-${d.id}`).classed("selected", true);

      updatePopUp(d.id, state.series);

      // if ( ! mobile ) {
      //     zoomTo(d.id);
      // } else {
      //     updateSelectedPath(d.id);
      //     openPopUp();
      // }

      zoomTo(d.id);
    });

  features
    .append("path")
    .datum(
      topojson.mesh(cd113, cd113.objects.states, function(a, b) {
        return a !== b;
      })
    )
    .attr("class", "state-border")
    .style("stroke-width", stateBorderWidth + "px")
    .attr("d", path);

  stateLabels = features
    .selectAll(".stateLabel")
    .data(topojson.feature(cd113, cd113.objects.states).features)
    .enter()
    .append("text")
    .text(function(d) {
      if (
        d.properties.APname !== "D.C." &&
        d.properties.APname !== "Del." &&
        d.properties.APname !== "R.I." &&
        d.properties.APname !== "Md."
      ) {
        return d.properties.APname;
      }
    })
    .attr("class", function(d) {
      return "stateLabel " + `stateLabel-${d.id}`;
    })
    .attr("transform", function(d) {
      return "translate(" + path.centroid(d) + ")";
    })
    .attr("dy", function(d) {
      switch (d.properties.APname) {
        case "Mich.":
          return widthMap / 33;
        case "N.H.":
          return widthMap / 120;
        case "Idaho":
          return widthMap / 45;
        case "Mass.":
          return 0;
        case "Conn.":
          return 1;
        default:
          return 3;
      }
    })
    .attr("dx", function(d) {
      switch (d.properties.APname) {
        case "Calif.":
          return -widthMap / 120;
        case "Fla.":
          return widthMap / 60;
        case "Hawaii":
          return -widthMap / 40;
        case "La.":
          return -widthMap / 120;
        case "Mich.":
          return widthMap / 60;
        case "N.H.":
          return widthMap / 500;
        case "N.J.":
          return widthMap / 200;
        default:
          return 0;
      }
    })
    .style("opacity", function() {
      if (mobile) {
        return 0;
      } else {
        return 1;
      }
    })
    .attr("font-size", function(d) {
      switch (d.properties.APname) {
        case "Conn.":
          return 0.6 * stateLabelSize + "px";
        case "N.J.":
          return 0.6 * stateLabelSize + "px";
        case "Mass.":
          return 0.7 * stateLabelSize + "px";
        case "N.H.":
          return 0.7 * stateLabelSize + "px";
        default:
          return stateLabelSize + "px";
      }
    });
}

export function updateStates(view, series, colorScale) {
  if (colorScale === "blue" && state.colorScale !== "blue") {
    color.domain(blueDomain).range(colorKey6blue);
    x.domain(bluexDomain);
    updateKey();
  } else if (colorScale === "red" && state.colorScale !== "red") {
    color.domain(redDomain).range(colorKey6red);
    x.domain(redxDomain);
    updateKey();
  }

  state.view = view;
  state.series = series;
  state.colorScale = colorScale;

  statePolygons
    .transition()
    .duration(transitionSpeed)
    .attr("fill", function(d) {
      if (isNaN(parseFloat(data[d.id][view]))) {
        return "#d7d7d7";
      } else {
        return color(data[d.id][view]);
      }
    });

  statePolygons.on("mouseover", onMouseover);
}

// function updateFeatures() {
//     if ( mobile ) {
//         features.attr("transform", "translate(" + t + ")scale(" + d3.event.transform.k + ")");
//         features.select(".state-border").style("stroke-width", stateBorderWidth / d3.event.transform.k + "px");
//         features.selectAll(".district").style("stroke-width", districtBorderWidth / d3.event.transform.k + "px");
//     } else {
//         features.transition().duration(500)
//             .attr("transform", "translate(" + t + ")scale(" + s + ")");
//         features.select(".state-border").transition().duration(500)
//             .style("stroke-width", stateBorderWidth / d3.event.transform.k + "px");
//         features.selectAll(".district").transition().duration(500)
//             .style("stroke-width", districtBorderWidth / d3.event.transform.k + "px");
//     }
// }

// function updateSelectedPath(location) {
//   d3.selectAll("#map .selected").classed("selected", false);
//   d3.select("path." + location).classed("selected", true);
// }
//
export function resetMap() {
  active.classed("selected", false);
  active = d3.select(null);
  stateLabels.classed("selected", false);

  svgMap
    .transition()
    .duration(transitionSpeed)
    // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
    .call(zoom.transform, d3.zoomIdentity); // updated for d3 v4
}

function stopped() {
  if (d3.event.defaultPrevented) {
    d3.event.stopPropagation();
  }
}

function zoomed() {
  tooltip.style("display", "none");

  t[0] = d3.event.transform.x;
  t[1] = d3.event.transform.y;
  s = d3.event.transform.k;

  t[0] = Math.min(150 * (s - 1), Math.max((widthMap + 450) * (1 - s), t[0]));
  t[1] = Math.min(
    (heightMap / 2 - widthMap / 2 + 155) * (s - 1),
    Math.max((heightMap / 2 + widthMap / 2 - 120) * (1 - s), t[1])
  );

  features.attr(
    "transform",
    "translate(" + t[0] + ", " + t[1] + ")scale(" + s + ")"
  );
  features
    .select(".state-border")
    .style("stroke-width", stateBorderWidth / d3.event.transform.k + "px");
  // features.attr("transform", d3.event.transform)
  // features.selectAll(".district").style("stroke-width", districtBorderWidth / s + "px");

  // if ( view.map === "house") {
  //     updateCities();
  // }

  if (mobile) {
    stateLabels
      .attr("font-size", function(d) {
        switch (d.properties.APname) {
          case "Conn.":
            return (0.6 * stateLabelSize) / s + "px";
          case "Mass.":
            return (0.7 * stateLabelSize) / s + "px";
          case "N.H.":
            return (0.7 * stateLabelSize) / s + "px";
          case "N.J.":
            return (0.7 * stateLabelSize) / s + "px";
          default:
            return stateLabelSize / s + "px";
        }
      })
      .style("opacity", function() {
        return -1 + s;
      });
  } else {
    if (s < 3) {
      stateLabels.attr("font-size", function(d) {
        switch (d.properties.APname) {
          case "Conn.":
            return (0.6 * stateLabelSize) / s + "px";
          case "Mass.":
            return (0.7 * stateLabelSize) / s + "px";
          case "N.H.":
            return (0.7 * stateLabelSize) / s + "px";
          case "N.J.":
            return (0.7 * stateLabelSize) / s + "px";
          default:
            return stateLabelSize / s + "px";
        }
      });
    } else {
      stateLabels.attr("font-size", function() {
        return stateLabelSize / d3.event.transform.k + "px";
      });
    }
  }
}

function zoomTo() {
  var element = active.node(),
    bbox = element.getBBox(),
    bboxArea = bbox.width * bbox.height;

  var zoomX = bbox.x + bbox.width / 2,
    zoomY = bbox.y + bbox.height / 2;

  if (bboxArea < 30) {
    s = 12;
  } else if (bboxArea < 200) {
    s = 8;
  } else if (bboxArea < 2200) {
    s = 4;
  } else {
    s = 2;
  }

  // Offsets the center so state isn't under the popup
  t[0] = -(zoomX * s - widthMap / 2.2);

  if (zoomY < 130) {
    t[1] = -(zoomY * s - heightMap / 4);
  } else {
    t[1] = -(zoomY * s - heightMap / 2);
  }

  // prevent the map from going too far off screen
  t[0] = Math.min(150 * (s - 1), Math.max((widthMap + 450) * (1 - s), t[0]));
  t[1] = Math.min(
    (heightMap / 2 - widthMap / 2 + 155) * (s - 1),
    Math.max((heightMap / 2 + widthMap / 2 - 120) * (1 - s), t[1])
  );

  svgMap
    .transition()
    .duration(transitionSpeed)
    .call(zoom.transform, d3.zoomIdentity.translate(t[0], t[1]).scale(s));

  if (!d3.select("#popup").classed("show")) {
    openPopUp();
    // setTimeout(() => { openPopUp() }, 200);
  }
}

// Search, Reset/Home, Zoom in and out map control buttons
d3.select(".homeBtn").on("click", function() {
  tooltip.style("display", "none");
  s = 1;
  t = [0, 0];

  svgMap
    .transition()
    .duration(transitionSpeed)
    .call(zoom.transform, d3.zoomIdentity.translate(t[0], t[1]).scale(s));
});

d3.select(".zoomInBtn").on("click", function() {
  tooltip.style("display", "none");

  if (s * 2 <= scaleExtent[1]) {
    t[0] = t[0] * 2 - widthMap / 2;
    t[1] = t[1] * 2 - heightMap / 2;
    s = Math.min(s * 2, scaleExtent[1]);

    svgMap
      .transition()
      .duration(transitionSpeed)
      .call(zoom.transform, d3.zoomIdentity.translate(t[0], t[1]).scale(s));
  }
});

d3.select(".zoomOutBtn").on("click", function() {
  tooltip.style("display", "none");

  if (s > scaleExtent[0]) {
    s = Math.max(s / 2, scaleExtent[0]);

    if (s === 1) {
      t = [0, 0];
    } else {
      t[0] = t[0] / 2 + widthMap / 4;
      t[1] = t[1] / 2 + heightMap / 4;
    }

    svgMap
      .transition()
      .duration(transitionSpeed)
      .call(zoom.transform, d3.zoomIdentity.translate(t[0], t[1]).scale(s));
  }
});

drawStates("affectedAllShare", "all");
drawKey();
