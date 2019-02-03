import * as d3 from "d3";
import data from "./csv-data";
import formatPercent from "./format-percent";
import getTweetHref from "./get-tweet-href";
import { resetMap } from "./map";

var id;

export function openPopUp() {
  $("#popup").addClass("show");
}

export function closePopUp() {
  $("#popup").removeClass("show");
  d3.selectAll("#map .selected").classed("selected", false);
  resetMap();
  // document.getElementById('address').value = "";
}

export function updatePopUp(series, state) {
  if (state) {
    id = state;
  }
  
  // Update link to scorecard
  $(".js-scorecard-btn").attr("href", function() {
    return "scorecard.html?state=" + id;
  });
  
  
  // Update twitter link
  $("a.js-tweet-btn").attr("href", getTweetHref(data[id]));
  
  // update state name
  $(".js-districtName").html(data[id].districtName);
  
  // update senator(s) names
  $(".js-senator-names").html(() => {
    if (data[id].senator2) {
      return `senators ${data[id].senator1} and ${data[id].senator2}`;
    } else {
      return data[id].senator1;
    }
  });
  
  // update senator/congressman title
  $(".js-senator-title").html(() => {
    if (id === "DC") {
      return "U.S. Congresswoman";
    } else {
      return "U.S. Senators";
    }
  });

  // All count
  $(".js-all-count").html(data[id].allCount);
  
  

  $("#popup .popupTable").html(
    `
      <tr class="label">
        <td colspan="2">Percent of workers likely to benefit from increasing the minimum wage to $15</td>
      </tr>
      <tr class="data">
        <td class="col1">All</td>
        <td class="col2">${formatPercent(data[id].allShare)}</td>
      </tr>
    `
  );

  // $("#popup .popupTable").append(
  //   `
  //     <tr class="data">
  //       <td class="col1">Women</td>
  //       <td class="col2">${formatPercent(data[id].womenShare)}</td>
  //     </tr>
  //     <tr class="data last">
  //       <td class="col1">Men</td>
  //       <td class="col2">${formatPercent(data[id].menShare)}</td>
  //     </tr>
  //     <tr class="label">
  //       <td colspan="2">Percent of working families that live ...</td>
  //     </tr>
  //     <tr class="data">
  //       <td class="col1">In poverty</td>
  //       <td class="col2">${formatPercent(data[id].povertyShare)}</td>
  //     </tr>
  //     <tr class="data last">
  //       <td class="col1">Below 200% of the poverty line</td>
  //       <td class="col2">${formatPercent(data[id].poorShare)}</td>
  //     </tr>
  //   `
  // );
  
  // if (series === "all") {
  //   $("#popup .popupTable").append(
  //     `
  //       <tr class="label">
  //         <td colspan="2">Percent of each demographic group likely to benefit from increasing the minimum wage to $15</td>
  //       </tr>
  //       <tr class="data">
  //         <td class="col1">Women</td>
  //         <td class="col2">${formatPercent(data[id].womenShare)}</td>
  //       </tr>
  //       <tr class="data last">
  //         <td class="col1">Men</td>
  //         <td class="col2">${formatPercent(data[id].menShare)}</td>
  //       </tr>
  //     `
  //   );
  // }


  if (series === "gender" || series === "all") {
    $("#popup .popupTable").append(
      `
        <tr class="label">
          <td colspan="2">Percent of each demographic group likely to benefit from increasing the minimum wage to $15</td>
        </tr>
        <tr class="data">
          <td class="col1">Women</td>
          <td class="col2">${formatPercent(data[id].womenShare)}</td>
        </tr>
        <tr class="data">
          <td class="col1">Women of color<sup>3</sup></td>
          <td class="col2">${formatPercent(data[id].womenOfColorShare)}</td>
        </tr>
        <tr class="data">
          <td class="col1">Men</td>
          <td class="col2">${formatPercent(data[id].menShare)}</td>
        </tr>
        <tr class="data last">
          <td class="col1">Men of color<sup>3</sup></td>
          <td class="col2">${formatPercent(data[id].menOfColorShare)}</td>
        </tr>
      `
    );
  }

  if (series === "poverty") {
    $("#popup .popupTable").append(
      '<tr class="label"><td colspan="2">Percent of working families that live ...</td></tr><tr class="data"><td class="col1">In poverty</td><td class="col2">' +
        formatPercent(data[id].povertyShare) +
        '</td></tr><tr class="data last"><td class="col1">Below 200% of the poverty line</td><td class="col2">' +
        formatPercent(data[id].poorShare) +
        "</td></tr>"
    );
  }

  if (series === "race") {
    $("#popup .popupTable").append(
      `
        <tr class="label">
          <td colspan="2">Percent of each demographic group likely to benefit from increasing the minimum wage to $15</td>
        </tr>
        <tr class="data">
          <td class="col1">Whites</td>
          <td class="col2">${formatPercent(data[id].whiteShare)}</td>
        </tr>
        <tr class="data">
          <td class="col1">African Americans</td>
          <td class="col2">${formatPercent(data[id].blackShare)}</td>
        </tr>
        <tr class="data">
          <td class="col1">Latinos</td>
          <td class="col2">${formatPercent(data[id].hispanicShare)}</td>
        </tr>
        <tr class="data last">
          <td class="col1">Asian Americans and others</td>
          <td class="col2">${formatPercent(data[id].otherRaceShare)}</td>
        </tr>
      `
    );
  }

  if (series === "family") {
    $("#popup .popupTable").append(
      `
        <tr class="label">
          <td colspan="2">Percent of each demographic group likely to benefit from increasing the minimum wage to $15</td>
        </tr>
        <tr class="data">
          <td class="col1">Working mothers</td>
          <td class="col2">${formatPercent(data[id].momsShare)}</td>
        </tr>
        <tr class="data">
          <td class="col1">Working fathers</td>
          <td class="col2">${formatPercent(data[id].dadsShare)}</td>
        </tr>
        <tr class="data">
          <td class="col1">Single parents</td>
          <td class="col2">${formatPercent(data[id].singleParentsShare)}</td>
        </tr>
        <tr class="data last">
          <td class="col1">Married parents</td>
          <td class="col2">${formatPercent(data[id].marriedParentsShare)}</td>
        </tr>
      `
    );
  }

  if (series === "age") {
    $("#popup .popupTable").append(
      `
        <tr class="label">
          <td colspan="2">Percent of each demographic group likely to benefit from increasing the minimum wage to $15</td>
        </tr>
        <tr class="data">
          <td class="col1">16-24 years old</td>
          <td class="col2">${formatPercent(data[id].aged0to25Share)}</td>
        </tr>
        <tr class="data">
          <td class="col1">25-39 years old</td>
          <td class="col2">${formatPercent(data[id].aged25to39Share)}</td>
        </tr>
        <tr class="data">
          <td class="col1">40-54 years old</td>
          <td class="col2">${formatPercent(data[id].aged40to54Share)}</td>
        </tr>
        <tr class="data last">
          <td class="col1">55 or older</td>
          <td class="col2">${formatPercent(data[id].aged55plusShare)}</td>
        </tr>
      `
    );
  }

  

} // updatePopUp

$(".js-close-popup").click(e => {
  e.preventDefault();
  closePopUp();
});
