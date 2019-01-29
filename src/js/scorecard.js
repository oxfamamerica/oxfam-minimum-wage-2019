import * as d3 from "d3";
import csvData from "./csv-data";
import getQueryVariable from "./get-query-variable";
import formatPercent from "./format-percent";
import drawBarGraph from "./draw-bar-graph";

import "../styles/scorecard.scss";

const id = getQueryVariable("state");
const data = csvData[id];


d3.selectAll(".js-districtName").html(data.districtName);

d3.selectAll(".js-affectedAllCount").html(data.affectedAllCount);
d3.selectAll(".js-affectedAllShare").html(formatPercent(data.affectedAllShare));

d3.selectAll(".js-affectedMenCount").html(data.affectedMenCount);
d3.selectAll(".js-affectedMenShare").html(formatPercent(data.affectedMenShare));
d3.selectAll(".js-affectedWomenCount").html(data.affectedWomenCount);
d3.selectAll(".js-affectedWomenShare").html(formatPercent(data.affectedWomenShare));

d3.selectAll(".js-parentsCount").html(data.parentsCount);
d3.selectAll(".js-parentsShare").html(formatPercent(data.parentsShare));
d3.selectAll(".js-parentsShareOfAll").html(formatPercent(data.parentsShareOfAll));
d3.selectAll(".js-childrenCount").html(data.childrenCount);
d3.selectAll(".js-childrenShare").html(formatPercent(data.childrenShare));
d3.selectAll(".js-momsCount").html(data.momsCount);
d3.selectAll(".js-momsShare").html(formatPercent(data.momsShare));
d3.selectAll(".js-dadsCount").html(data.dadsCount);
d3.selectAll(".js-dadsShare").html(formatPercent(data.dadsShare));
d3.selectAll(".js-familyMemberCount").html(data.familyMemberCount);
d3.selectAll(".js-familyMemberShare").html(formatPercent(data.familyMemberShare));

d3.selectAll(".js-familyShareIncome").html(formatPercent(data.familyShareIncome));

drawBarGraph(".js-ageBand1", [data.aged0to25Share, csvData.US.aged0to25Share]);
drawBarGraph(".js-ageBand2", [data.aged25to39Share, csvData.US.aged25to39Share]);
drawBarGraph(".js-ageBand3", [data.aged40to54Share, csvData.US.aged40to54Share]);
drawBarGraph(".js-ageBand4", [data.aged55plusShare, csvData.US.aged55plusShare]);

drawBarGraph(".js-shareWhite", [data.whiteShare, csvData.US.whiteShare]);
drawBarGraph(".js-shareBlack", [data.blackShare, csvData.US.blackShare]);
drawBarGraph(".js-shareHispanic", [data.hispanicShare, csvData.US.hispanicShare]);
drawBarGraph(".js-shareOtherRace", [data.otherRaceShare, csvData.US.otherRaceShare]);

drawBarGraph(".js-shareAllWhite", [data.whiteAllShare, csvData.US.whiteAllShare]);
drawBarGraph(".js-shareAllBlack", [data.blackAllShare, csvData.US.blackAllShare]);
drawBarGraph(".js-shareAllHispanic", [data.hispanicAllShare, csvData.US.hispanicAllShare]);
drawBarGraph(".js-shareAllOtherRace", [data.otherRaceAllShare, csvData.US.otherRaceAllShare]);

d3.selectAll(".js-poorCount").html(data.poorCount);
d3.selectAll(".js-poorShare").html(formatPercent(data.poorShare));
d3.selectAll(".js-foodstampsCount").html(data.foodstampsCount);
d3.selectAll(".js-foodstampsShare").html(formatPercent(data.foodstampsShare));

d3.selectAll(".js-gini").html(data.gini);