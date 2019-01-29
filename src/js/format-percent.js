import * as d3 from "d3";

export default function formatPercent(value) {
  if (isNaN(parseFloat(value))) {
    return "Insufficient survey data available";
  } else {
    return d3.format(",.1%")(value);
  }
}
