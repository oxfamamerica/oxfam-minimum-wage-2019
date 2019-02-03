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
      senator1Twitter: d.senator1Twitter,
      senator2Twitter: d.senator2Twitter,
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
      aged0to25ShareOfTotal: d.age16To24ShareOfTotal,
      aged25to39ShareOfTotal: d.age25To39ShareOfTotal,
      aged40to54ShareOfTotal: d.age40To54ShareOfTotal,
      aged55plusShareOfTotal: d.age55UpShareOfTotal,
      ageTeenagerShareOfTotal: d.ageTeenagerShareOfTotal,
      age20UpShareOfTotal: d.age20UpShareOfTotal,
      menOfColorShare: d.blackOrHispanicMenShare,
      menOfColorCount: d.blackOrHispanicMenCount,
      womenOfColorShare: d.blackOrHispanicWomenShare,
      womenOfColorCount: d.blackOrHispanicWomenCount
    };
  });

  return data;
}

const data = parseCsv();

export default data;
