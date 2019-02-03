import * as d3 from "d3";
import csvData from "./csv-data";
import getQueryVariable from "./get-query-variable";
import formatPercent from "./format-percent";
import drawBarGraph from "./draw-bar-graph";
import drawPieGraph from "./draw-pie-graph";
import getTweetHref from "./get-tweet-href";

import "../styles/scorecard.scss";

const id = getQueryVariable("state");
const data = csvData[id];


d3.selectAll(".js-districtName").html(data.districtName);

d3.selectAll(".js-allCount").html(data.allCount);
d3.selectAll(".js-allShare").html(formatPercent(data.allShare));

d3.selectAll(".js-menCount").html(data.menCount);
d3.selectAll(".js-menShare").html(formatPercent(data.menShare));
d3.selectAll(".js-womenCount").html(data.womenCount);
d3.selectAll(".js-womenShare").html(formatPercent(data.womenShare));

d3.selectAll(".js-singleParentsCount").html(data.singleParentsCount);
d3.selectAll(".js-singleParentsShare").html(formatPercent(data.singleParentsShare));
d3.selectAll(".js-marriedParentsCount").html(data.marriedParentsCount);
d3.selectAll(".js-marriedParentsShare").html(formatPercent(data.marriedParentsShare));
d3.selectAll(".js-momsCount").html(data.momsCount);
d3.selectAll(".js-momsShare").html(formatPercent(data.momsShare));
d3.selectAll(".js-dadsCount").html(data.dadsCount);
d3.selectAll(".js-dadsShare").html(formatPercent(data.dadsShare));


d3.selectAll(".js-familyShareIncome").html(formatPercent(data.familyShareIncome));

drawBarGraph(".js-shareAll-graph", [data.allShare, csvData.US.allShare], 2.5);

drawBarGraph(".js-ageBand1", [data.aged0to25Share, csvData.US.aged0to25Share]);
drawBarGraph(".js-ageBand2", [data.aged25to39Share, csvData.US.aged25to39Share]);
drawBarGraph(".js-ageBand3", [data.aged40to54Share, csvData.US.aged40to54Share]);
drawBarGraph(".js-ageBand4", [data.aged55plusShare, csvData.US.aged55plusShare]);

drawPieGraph(".js-age-pie", [data.ageTeenagerShareOfTotal, data.age20UpShareOfTotal])

drawBarGraph(".js-shareWhite", [data.whiteShare, csvData.US.whiteShare]);
drawBarGraph(".js-shareBlack", [data.blackShare, csvData.US.blackShare]);
drawBarGraph(".js-shareHispanic", [data.hispanicShare, csvData.US.hispanicShare]);
drawBarGraph(".js-shareOtherRace", [data.otherRaceShare, csvData.US.otherRaceShare]);

drawBarGraph(".js-shareAllWhite", [data.whiteAllShare, csvData.US.whiteAllShare]);
drawBarGraph(".js-shareAllBlack", [data.blackAllShare, csvData.US.blackAllShare]);
drawBarGraph(".js-shareAllHispanic", [data.hispanicAllShare, csvData.US.hispanicAllShare]);
drawBarGraph(".js-shareAllOtherRace", [data.otherRaceAllShare, csvData.US.otherRaceAllShare]);
drawBarGraph(".js-shareWomenOfColor", [data.womenOfColorShare, csvData.US.womenOfColorShare]);
drawBarGraph(".js-shareMenOfColor", [data.menOfColorShare, csvData.US.menOfColorShare]);

// Update twitter link
d3.selectAll(".js-tweet-btn").attr("href", getTweetHref(data));
