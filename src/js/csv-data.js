import csv from "../data/data.csv";

// ********************
// Parse CSV data
// ********************
function parseCsv() {
  let data = {};

  csv.forEach(d => {
    data[d.id] = {
      districtName: d.stateName,
      senator1: d.senator1,
      senator2: d.senator2,
      senator1twitter: d.senator1twitter,
      senator2twitter: d.senator2twitter,
      povertyShare: d.povertyShare,
      poorShare: d.poorShare,
      poorCount: d.poorCount,
      // foodstampsCount: d.foodstampsCount,
      // foodstampsShare: d.foodstampsShare,
      // gini: d.gini,
      allShare: d.allShare,
      allCount: d.allCount,
      affectedAllRank: d.affectedAllRank,
      womenShare: d.womenShare,
      womenCount: d.womenCount,
      menCount: d.menCount,
      menShare: d.menShare,
      singleParentsCount: d.singleParentsCount,
      singleParentsShare: d.singleParentsShare,
      singleParentsShareOfAll: d.singleParentsShareOfAll,
      marriedParentsCount: d.marriedParentsCount,
      marriedParentsShare: d.marriedParentsShare,
      marriedParentsShareOfAll: d.marriedParentsShareOfAll,
      momsCount: d.momsCount,
      momsShare: d.momsShare,
      dadsCount: d.dadsCount,
      dadsShare: d.dadsShare,
      whiteShare: d.whiteShare,
      whiteAllShare: d.whiteAllShare,
      whiteShareOfTotal: d.whiteShareOfTotal,
      blackShare: d.blackShare,
      blackAllShare: d.blackAllShare,
      blackShareOfTotal: d.blackShareOfTotal,
      hispanicShare: d.hispanicShare,
      hispanicAllShare: d.hispanicAllShare,
      hispanicShareOfTotal: d.hispanicShareOfTotal,
      otherRaceShare: d.otherRaceShare,
      otherRaceAllShare: d.otherRaceAllShare,
      otherRaceShareOfTotal: d.otherRaceShareOfTotal,
      aged0to25Share: d.age16To24Share,
      aged25to39Share: d.age25To39Share,
      aged40to54Share: d.age40To54Share,
      aged55plusShare: d.age55UpShare,
      menOfColorShare: d.menOfColorShare,
      menOfColorCount: d.menOfColorCount,
      womenOfColorShare: d.womenOfColorShare,
      womenOfColorCount: d.womenOfColorCount
    };
  });

  return data;
}

const data = parseCsv();

export default data;
