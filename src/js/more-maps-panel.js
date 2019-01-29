import { updateStates } from "./map";

function openMoreMaps() {
  $(".panel-overlay").removeClass("hidden");
  $("div.mapOptionsPanel").addClass("show");
  $(".mapOptionsBtn").addClass("active");
}

function closeMoreMaps() {
  $(".panel-overlay").addClass("hidden");
  $("div.mapOptionsPanel").removeClass("show");
  $(".mapOptionsBtn").removeClass("active");
}

function isMoreMapsOpen() {
  return !$(".panel-overlay").hasClass("hidden");
}

$(".mapOptionsBtn").on("click touchend", function() {
  if (isMoreMapsOpen) {
    openMoreMaps();
  } else {
    closeMoreMaps();
  }
});

$(".panel-overlay").on("click touchend", function() {
  closeMoreMaps();
});

$(document).keyup(e => {
  if (e.keyCode === 27 && isMoreMapsOpen()) {
    closeMoreMaps();
  }
});

$("ul.tabs button").click(function() {
  var $this = $(this);

  if (!$this.closest("li").hasClass("active")) {
    $("ul.tabs li").toggleClass("active");
    $(".benefit-content").toggleClass("hidden");
    $(".poverty-content").toggleClass("hidden");
  }
});

$("ul.sub-group button").click(function() {
  $(this)
    .closest(".group-header")
    .addClass("has-active");
});

$("ul.btn-list li.group-header > button").click(function() {
  var $this = $(this);

  if ($this.closest("li.group-header").hasClass("open")) {
    $("ul.btn-list li.group-header").removeClass("open");
  } else {
    $("ul.btn-list li.group-header").removeClass("open");
    $(this)
      .closest("li.group-header")
      .addClass("open");
  }
});

$("button.btn").click(function() {
  var $this = $(this);

  $("ul.btn-list li").removeClass("active");
  $this.closest("li").addClass("active");

  if ($this.closest("ul").hasClass("btn-list")) {
    $("li.group-header").removeClass("has-active");
    $("li.group-header").removeClass("open");
  }

  if ($this.closest("ul").hasClass("sub-group")) {
    $("li.group-header").removeClass("has-active");
    $this.closest("li.group-header").addClass("has-active");
  }

  closeMoreMaps();

  switch ($this.attr("data-value")) {
    case "all":
      // $(".mapTitle").text("Concentrations of low-wage workers");
      // $(".mapSubtitle").text(
      //   "This map illustrates the percentages of workers who would benefit from a raise in the minimum wage to $10.10. The darker colors indicate higher concentrations of low-wage workers."
      // );
      // $(".mapSubtitle").removeClass("hidden");
      // view.data = affectedAllShareById;
      // view.series = "all";
      // color
      //     .domain(redDomain)
      //     .range(colorKey6red);
      // x.domain(redxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(affectedAllShareById);
      // } else {
      //     closePopUp();
      //     updateStates(affectedAllShareById);
      // }
      $(".js-mapOptionsBtn-label").text("All workers");
      updateStates("affectedAllShare", "all", "red");
      break;
    case "women":
      // $(".mapTitle").html("Concentrations of low-wage female workers");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all female workers in each district that would benefit by increasing the minimum wage to $10.10. The darker colors indicate higher concentrations of low-wage workers."
      // );
      // $(".mapSubtitle").removeClass("hidden");
      // view.data = affectedWomenShareById;
      // view.series = "gender";
      // color
      //     .domain(redDomain)
      //     .range(colorKey6red);
      // x.domain(redxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(affectedWomenShareById);
      // } else {
      //     closePopUp();
      //     updateStates(affectedWomenShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Women");
      updateStates("affectedWomenShare", "gender", "red");
      break;
    case "men":
      // $(".mapTitle").html("Concentrations of low-wage male workers");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all male workers in each district that would benefit by increasing the minimum wage to $10.10. The darker colors indicate higher concentrations of low-wage workers."
      // );
      // $(".mapSubtitle").removeClass("hidden");
      // view.data = affectedMenShareById;
      // view.series = "gender";
      // color
      //     .domain(redDomain)
      //     .range(colorKey6red);
      // x.domain(redxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(affectedMenShareById);
      // } else {
      //     closePopUp();
      //     updateStates(affectedMenShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Men");
      updateStates("affectedMenShare", "gender", "red");
      break;
    case "poverty":
      // $(".mapTitle").html("Percent of working families living in poverty");
      // $(".mapSubtitle").text(
      //   "This map shows the percentage of families who live near poverty despite having at least one employed adult. The darker colors indicate higher concentrations of low-wage workers."
      // );
      // view.data = povertyShareById;
      // view.series = "poverty";
      // color
      //     .domain(blueDomain)
      //     .range(colorKey6blue);
      // x.domain(bluexDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(povertyShareById);
      // } else {
      //     closePopUp();
      //     updateStates(povertyShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Living in poverty");
      updateStates("povertyShare", "poverty", "red");
      break;
    case "nearPoverty":
      // $(".mapTitle").html(
      //   "Percent of working families living below 200% of the poverty line"
      // );
      // $(".mapSubtitle").text(
      //   "The percentage of families who live near the poverty line despite having at least one employed adult. The darker colors indicate higher concentrations of low-wage workers."
      // );
      // view.data = poorShareById;
      // view.series = "poverty";
      // color
      //     .domain(blueDomain)
      //     .range(colorKey6blue);
      // x.domain(bluexDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(poorShareById);
      // } else {
      //     closePopUp();
      //     updateStates(poorShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Living below 200% of the poverty line");
      updateStates("poorShare", "poverty", "red");
      break;
    case "dads":
      // $(".mapTitle").html("Concentrations of low-wage fathers");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all working fathers in each district that would benefit by increasing the minimum wage to $10.10. The darker colors indicate higher concentrations of low-wage workers."
      // );
      // view.data = dadsShareById;
      // view.series = "family";
      // color
      //     .domain(redDomain)
      //     .range(colorKey6red);
      // x.domain(redxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(dadsShareById);
      // } else {
      //     closePopUp();
      //     updateStates(dadsShareById);
      // }
      // 
      $(".js-mapOptionsBtn-label").text("Fathers");
      updateStates("dadsShared", "family", "red");
      break;
    case "moms":
      // $(".mapTitle").html("Concentrations of low-wage mothers");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all working mothers in each district that would benefit by increasing the minimum wage to $10.10. The darker colors indicate higher concentrations of low-wage workers."
      // );
      // view.data = momsShareById;
      // view.series = "family";
      // color
      //     .domain(redDomain)
      //     .range(colorKey6red);
      // x.domain(redxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(momsShareById);
      // } else {
      //     closePopUp();
      //     updateStates(momsShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Mothers");
      updateStates("momsShare", "family", "red");
      break;
    case "parents":
      // $(".mapTitle").html("Concentrations of low-wage parents");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all working  parents in each district that would benefit by increasing the minimum wage to $10.10. The darker colors indicate higher concentrations of low-wage workers."
      // );
      // view.data = parentsShareById;
      // view.series = "family";
      // color
      //     .domain(redDomain)
      //     .range(colorKey6red);
      // x.domain(redxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(parentsShareById);
      // } else {
      //     closePopUp();
      //     updateStates(parentsShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Parents");
      updateStates("parentsShare", "family", "red");
      break;
    case "children":
      // $(".mapTitle").html("Concentrations of children of low-wage workers");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all children (under 18 years old) in each district who have a parent that would benefit by increasing the minimum wage to $10.10. The darker colors indicate higher concentrations of children with a low-wage working parent."
      // );
      // view.data = childrenShareById;
      // view.series = "family";
      // color
      //     .domain(redDomain)
      //     .range(colorKey6red);
      // x.domain(redxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(childrenShareById);
      // } else {
      //     closePopUp();
      //     updateStates(childrenShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Children of low-wage workers");
      updateStates("childrenShare", "family", "red");
      break;
    case "family":
      // $(".mapTitle").html(
      //   "Concentrations of families dependent on low-wage workers"
      // );
      // $(".mapSubtitle").text(
      //   "This map shows the share of households in each district where a low-wage worker is sustaining other family members. The darker colors indicate higher concentrations of dependents with a low-wage working head of household."
      // );
      // view.data = familyMemberShareById;
      // view.series = "family";
      // color
      //     .domain(redDomain)
      //     .range(colorKey6red);
      // x.domain(redxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(familyMemberShareById);
      // } else {
      //     closePopUp();
      //     updateStates(familyMemberShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Families dependent on low-wage workers");
      updateStates("familyMemberShare", "family", "red");
      break;

    case "white":
      // $(".mapTitle").html("Low-wage workers by race/ethnicity: Whites");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all low-wage workers who would benefit from a raise in the minimum wage to $10.10 who are white. The darker colors indicate higher percentages of low-wage workers in this category."
      // );
      // view.data = whiteAllShareById;
      // view.series = "race";
      // color
      //     .domain(testDomain)
      //     .range(colorKey6red);
      // x.domain(testxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(whiteAllShareById);
      // } else {
      //     closePopUp();
      //     updateStates(whiteAllShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Whites");
      updateStates("whiteShare", "race", "red");
      break;

    case "black":
      // $(".mapTitle").html(
      //   "Low-wage workers by race/ethnicity: African Americans"
      // );
      // $(".mapSubtitle").text(
      //   "This map shows the share of all low-wage workers who would benefit from a raise in the minimum wage to $10.10 who are African American. The darker colors indicate higher percentages of low-wage workers in this category."
      // );
      // view.data = blackAllShareById;
      // view.series = "race";
      // color
      //     .domain(testDomain)
      //     .range(colorKey6red);
      // x.domain(testxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(blackAllShareById);
      // } else {
      //     closePopUp();
      //     updateStates(blackAllShareById);
      // }
      $(".js-mapOptionsBtn-label").text("African Americans");
      updateStates("blackShare", "race", "red");
      break;

    case "hispanic":
      // $(".mapTitle").html("Low-wage workers by race/ethnicity: Latinos");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all low-wage workers who would benefit from a raise in the minimum wage to $10.10 who are latino. The darker colors indicate higher percentages of low-wage workers in this category."
      // );
      // view.data = hispanicAllShareById;
      // view.series = "race";
      // color
      //     .domain(testDomain)
      //     .range(colorKey6red);
      // x.domain(testxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(hispanicAllShareById);
      // } else {
      //     closePopUp();
      //     updateStates(hispanicAllShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Latinos");
      updateStates("hispanicShare", "race", "red");
      break;

    case "otherRace":
      // $(".mapTitle").html(
      //   "Low-wage workers by race/ethnicity: Asian Americans and Others"
      // );
      // $(".mapSubtitle").text(
      //   "This map shows the share of all low-wage workers who would benefit from a raise in the minimum wage to $10.10 who are Asian American or another race not included in other categories. The darker colors indicate higher percentages of low-wage workers in this category."
      // );
      // view.data = otherRaceAllShareById;
      // view.series = "race";
      // color
      //     .domain(testDomain)
      //     .range(colorKey6red);
      // x.domain(testxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(otherRaceAllShareById);
      // } else {
      //     closePopUp();
      //     updateStates(otherRaceAllShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Asian Americans and others");
      updateStates("otherRaceShare", "race", "red");
      break;

    case "age1":
      // $(".mapTitle").html("Low-wage workers by age: Younger than 25");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all low-wage workers who would benefit from a raise in the minimum wage to $10.10 who are younger than 25. The darker colors indicate higher percentages of low-wage workers in this category."
      // );
      // view.data = aged0to25ShareById;
      // view.series = "age";
      // color
      //     .domain(testDomain)
      //     .range(colorKey6red);
      // x.domain(testxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(aged0to25ShareById);
      // } else {
      //     closePopUp();
      //     updateStates(aged0to25ShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Younger than 25");
      updateStates("aged0to25Share", "age", "red");
      break;

    case "age2":
      // $(".mapTitle").html("Low-wage workers by age: 25-39 years old");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all low-wage workers who would benefit from a raise in the minimum wage to $10.10 who are between the ages of 25 and 39. The darker colors indicate higher percentages of low-wage workers in this category."
      // );
      // view.data = aged25to39ShareById;
      // view.series = "age";
      // color
      //     .domain(testDomain)
      //     .range(colorKey6red);
      // x.domain(testxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(aged25to39ShareById);
      // } else {
      //     closePopUp();
      //     updateStates(aged25to39ShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Aged 25-39");
      updateStates("aged25to39Share", "age", "red");
      break;

    case "age3":
      // $(".mapTitle").html("Low-wage workers by age: 40-54 years old");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all low-wage workers who would benefit from a raise in the minimum wage to $10.10 who are between the ages of 40 and 54. The darker colors indicate higher percentages of low-wage workers in this category."
      // );
      // view.data = aged40to54ShareById;
      // view.series = "age";
      // color
      //     .domain(testDomain)
      //     .range(colorKey6red);
      // x.domain(testxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(aged40to54ShareById);
      // } else {
      //     closePopUp();
      //     updateStates(aged40to54ShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Aged 40-54");
      updateStates("aged40to54Share", "age", "red");
      break;

    case "age4":
      // $(".mapTitle").html("Low-wage workers by age: 55 or older");
      // $(".mapSubtitle").text(
      //   "This map shows the share of all low-wage workers who would benefit from a raise in the minimum wage to $10.10 who are 55 years old or older. The darker colors indicate higher percentages of low-wage workers in this category."
      // );
      // view.data = aged55plusShareById;
      // view.series = "age";
      // color
      //     .domain(testDomain)
      //     .range(colorKey6red);
      // x.domain(testxDomain);
      // updateKey();
      // if (view.map === "house") {
      //     closePopUp();
      //     updateHouse(aged55plusShareById);
      // } else {
      //     closePopUp();
      //     updateStates(aged55plusShareById);
      // }
      $(".js-mapOptionsBtn-label").text("Aged 55 and older");
      updateStates("aged55plusShare", "age", "red");
      break;
  }
});
