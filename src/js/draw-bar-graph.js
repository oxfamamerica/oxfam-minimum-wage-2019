import * as d3 from "d3";
import formatPercent from "./format-percent";

// Creates bars for the scorecard page

export default function drawBarGraph(container, data, multiplier = 1) {
  if (isNaN(parseFloat(data[0]))) {
    data[0] = 0;
  }

  var width = 550 * multiplier,
    barHeight = 22,
    gap = 6;

  var x = d3.scaleLinear()
    .domain([0, 1.05])
    .range([0, width]);

  var chart = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", barHeight * data.length - gap / 2);

  var bar = chart
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {
      return "translate(0," + i * barHeight + ")";
    });

  bar
    .append("rect")
    .attr("width", x)
    .attr("height", barHeight - gap)
    .attr("y", gap / 2)
    .attr("class", function(d, i) {
      return "bar" + i;
    });

  bar
    .append("text")
    .attr("x", function(d) {
      if (d === 0) {
        return x(d);
      } else {
        return x(d) + 5;
      }
    })
    .attr("y", barHeight / 2)
    .attr("dy", "5px")
    .text(function(d) {
      return formatPercent(d);
    })
    .style("fill", function(d, i) {
      if (i > 0) {
        return "#888";
      }
    })
    .style("font-size", function(d, i) {
      if (i > 0) {
        return "12px";
      }
    });
}
