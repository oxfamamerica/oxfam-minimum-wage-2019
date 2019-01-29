import * as d3 from "d3";
import data from "./csv-data";
import formatPercent from './format-percent';
import { resetMap } from './map';

export function openPopUp() {
    $('#popup').addClass("show");
}

export function closePopUp() {
    $('#popup').removeClass("show");
    d3.selectAll("#map .selected").classed("selected", false);
    resetMap();
    // document.getElementById('address').value = "";
}

export function updatePopUp(id, series) {
    var state = id.substring(0,2);

    $('#popup .districtName').html(data[id].districtName);
    $('#popup .senatorName').html(data[state].repName);
    $('#popup .affectedCount').html(data[id].affectedAllCount);
    $('.js-scorecard-btn').attr("href", function() { return "scorecard.html?state=" + id; });
    
    $('#popup .popupTable').html('<tr class="label"><td colspan="2">Percent of workers likely to benefit from increasing the minimum wage to $10.10</td></tr><tr class="data"><td class="col1">All</td><td class="col2">' + formatPercent(data[id].affectedAllShare) + '</td></tr>');

    if ( series === "all" ) {
        $('#popup .popupTable').append('<tr class="data"><td class="col1">Women</td><td class="col2">' + formatPercent(data[id].affectedWomenShare) + '</td></tr><tr class="data last"><td class="col1">Men</td><td class="col2">' + formatPercent(data[id].affectedMenShare) + '</td></tr>' + '<tr class="label"><td colspan="2">Percent of working families that live ...</td></tr><tr class="data"><td class="col1">In poverty</td><td class="col2">' + formatPercent(data[id].povertyShare) + '</td></tr><tr class="data last"><td class="col1">Below 200% of the poverty line</td><td class="col2">' + formatPercent(data[id].poorShare) + '</td></tr>');
    }

    if ( series === "gender" ) {
        $('#popup .popupTable').append('<tr class="data"><td class="col1">Women</td><td class="col2">' + formatPercent(data[id].affectedWomenShare) + '</td></tr><tr class="data last"><td class="col1">Men</td><td class="col2">' + formatPercent(data[id].affectedMenShare) + '</td></tr>');
    }

    if ( series === "poverty" ) {
        $('#popup .popupTable').append('<tr class="label"><td colspan="2">Percent of working families that live ...</td></tr><tr class="data"><td class="col1">In poverty</td><td class="col2">' + formatPercent(data[id].povertyShare) + '</td></tr><tr class="data last"><td class="col1">Below 200% of the poverty line</td><td class="col2">' + formatPercent(data[id].poorShare) + '</td></tr>');
    }

    if ( series === "race") {
        $('#popup .popupTable').append('<tr class="data"><td class="col1">Whites</td><td class="col2">' + formatPercent(data[id].whiteShare) + '</td></tr><tr class="data"><td class="col1">African Americans</td><td class="col2">' + formatPercent(data[id].blackShare) + '</td></tr><tr class="data"><td class="col1">Latinos</td><td class="col2">' + formatPercent(data[id].hispanicShare) + '</td></tr><tr class="data"><td class="col1">Asian Americans and others</td><td class="col2">' + formatPercent(data[id].otherRaceShare) + '</td></tr>');

        $('#popup .popupTable').append('<tr class="label"><td colspan="2">Share of all affected workers who are ...<sup id="footnoteRef5"><a class="inlineFootnote" href="#fn5">5</a></sup></td></tr><tr class="data"><td class="col1">White</td><td class="col2">' + formatPercent(data[id].whiteAllShare) + '</td></tr><tr class="data"><td class="col1">African American</td><td class="col2">' + formatPercent(data[id].blackAllShare) + '</td></tr><tr class="data"><td class="col1">Latino</td><td class="col2">' + formatPercent(data[id].hispanicAllShare) + '</td></tr><tr class="data last"><td class="col1">Asian American and other</td><td class="col2">' + formatPercent(data[id].otherRaceAllShare) + '</td></tr>');
    }

    if ( series === "family" ) {
        $('#popup .popupTable').append('<tr class="data"><td class="col1">Parents</td><td class="col2">' + formatPercent(data[id].parentsShare) + '</td></tr><tr class="data"><td class="col1">Mothers</td><td class="col2">' + formatPercent(data[id].momsShare) + '</td></tr><tr class="data"><td class="col1">Fathers</td><td class="col2">' + formatPercent(data[id].dadsShare) + '</td></tr>');
        $('#popup .popupTable').append('<tr class="label"><td colspan="2">Percent of members of working families likely to benefit</td></tr><tr class="data"><td class="col1">Children<sup id="footnoteRef3"><a class="inlineFootnote" href="#fn3">3</a></sup></td><td class="col2">' + formatPercent(data[id].childrenShare) + '</td></tr><tr class="data last"><td class="col1">All family members<sup id="footnoteRef4"><a class="inlineFootnote" href="#fn4">4</a></sup></td><td class="col2">' + formatPercent(data[id].familyMemberShare) + '</td></tr>');
    }

    if ( series === "age") {
        $('#popup .popupTable').append('<tr class="label"><td colspan="2">Share of all affected workers who are ...</td></tr><tr class="data"><td class="col1">Younger than 25</td><td class="col2">' + formatPercent(data[id].aged0to25Share) + '</td></tr><tr class="data"><td class="col1">25-39 years old</td><td class="col2">' + formatPercent(data[id].aged25to39Share) + '</td></tr><tr class="data"><td class="col1">40-54 years old</td><td class="col2">' + formatPercent(data[id].aged40to54Share) + '</td></tr><tr class="data last"><td class="col1">55 and older</td><td class="col2">' + formatPercent(data[id].aged55plusShare) + '</td></tr>');
    }

    if (data[state].twitter !== "") {
        d3.select('#popup a.tweetSen')
            .classed('hidden', false)
            .attr("href", function() {
                var baseURL = "https://twitter.com/home?status=";
                var message1 = "%20workers%20in%20",
                    message2 = "%20could%20benefit%20from%20a%20$10.10%20minimum%20wage.%20See%20this%20Oxfam%20report:%20http://www.oxfamamerica.org/workingpoormap";
                return baseURL + data[state].twitter + ":%20" + data[state].affectedAllCount + message1 + state + message2;
            });
    } else {
        d3.select('#popup a.tweetSen').classed('hidden', true);
    }

    // if (view.map === "house") {
    //     $('.houseOnly').removeClass('hidden');
    //     $('.statesOnly').addClass('hidden');
    // 
    //     $('#popup .districtRank').html(data[id].affectedAllRank);
    //     $('#popup .repName').html(data[id].repName);
    // 
    //     d3.select("#popup a.contactBtn").attr("href", data[id].contact);
    // 
    //     if (data[id].twitter !== "") {
    //         d3.select('#popup a.tweetRep')
    //             .classed('hidden', false)
    //             .attr("href", function() {
    //                 var baseURL = "https://twitter.com/home?status=";
    //                 var message = "%20workers%20in%20your%20district%20could%20benefit%20from%20a%20$10.10%20minimum%20wage.%20See%20this%20Oxfam%20report:%20http://www.oxfamamerica.org/workingpoormap";
    //                 return baseURL + data[id].twitter + ":%20" + data[id].affectedAllCount + message;
    //             });
    //     } else {
    //         d3.select('#popup a.tweetRep').classed('hidden', true);
    //     }
    // } else {
    //     $('.houseOnly').addClass('hidden');
    //     $('.statesOnly').removeClass('hidden');
    // }
    
    $('.houseOnly').addClass('hidden');
    $('.statesOnly').removeClass('hidden');
} // updatePopUp

$(".js-close-popup").click((e) => {
    e.preventDefault();
    closePopUp();
});