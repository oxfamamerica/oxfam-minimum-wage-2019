import csv from "../data/data.csv";

// ********************
// Parse CSV data
// ********************
function parseCsv() {
  let data = {};

  csv.forEach(d => {
    data[d.id] = {
      districtName: d.districtName,
      repName: d.fullName,
      twitter: d.twitter,
      povertyShare: d.povertyShare,
      poorShare: d.poorShare,
      poorCount: d.poorCount,
      foodstampsCount: d.foodstampsCount,
      foodstampsShare: d.foodstampsShare,
      gini: d.gini,
      affectedAllShare: d.affectedAllShare,
      affectedAllCount: d.affectedAllCount,
      affectedAllRank: d.affectedAllRank,
      affectedWomenShare: d.affectedWomenShare,
      affectedWomenCount: d.affectedWomenCount,
      affectedMenCount: d.affectedMenCount,
      affectedMenShare: d.affectedMenShare,
      childrenCount: d.childrenCount,
      childrenShare: d.childrenShare,
      parentsCount: d.parentsCount,
      parentsShare: d.parentsShare,
      parentsShareOfAll: d.parentsShareOfAll,
      momsCount: d.momsCount,
      momsShare: d.momsShare,
      dadsCount: d.dadsCount,
      dadsShare: d.dadsShare,
      familyMemberCount: d.familyMemberCount,
      familyMemberShare: d.familyMemberShare,
      familyShareIncome: d.familyShareIncome,
      whiteShare: d.whiteShare,
      whiteAllShare: d.whiteAllShare,
      blackShare: d.blackShare,
      blackAllShare: d.blackAllShare,
      hispanicShare: d.hispanicShare,
      hispanicAllShare: d.hispanicAllShare,
      otherRaceShare: d.otherRaceShare,
      otherRaceAllShare: d.otherRaceAllShare,
      aged0to25Share: d.aged0to25Share,
      aged25to39Share: d.aged25to39Share,
      aged40to54Share: d.aged40to54Share,
      aged55plusShare: d.aged55plusShare
    };
  });

  return data;
}

const data = parseCsv();

export default data;
