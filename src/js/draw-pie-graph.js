import * as d3 from "d3";
import formatPercent from "./format-percent";

// Creates pies for the scorecard page
// 
// assumes data is an array of object like this:
// data = [
//   {
//     label: "Men",
//     value: "30"
//   },
//   {
//     label: "Women",
//     value: "70"
//   }
// ]


export default function drawPieGraph(container, data, size = 250) {
  const width = size;
  const height = size;
  const radius = width / 2;

  var color = d3.scaleOrdinal().range(["#41B6C4", "#225EA8",  "#0C2C84"]);

  var pie = d3.pie().value(function(d) {
    return d * 100;
  })(data);

  var arc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var labelArc = d3
    .arc()
    .outerRadius(radius * 0.6)
    .innerRadius(radius * 0.6);

  var svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var g = svg
    .selectAll("arc")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("stroke", "white")
    .style("stroke-width", "1px")
    .style("fill", function(d) {
      return color(d.data);
    });

  g.append("text")
    .attr("transform", function(d) {
      return "translate(" + labelArc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
      return formatPercent(d.data);
    })
    .style("fill", "#fff");
}
