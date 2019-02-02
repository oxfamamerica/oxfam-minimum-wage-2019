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
      //   "This map illustrates the percentages of workers who would benefit from a raise in the minimum wage to $15. The darker colors indicate higher concentrations of low-wage workers."
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
      updateStates("allShare", "all", "red");
      break;
    case "women":
      $(".js-mapOptionsBtn-label").text("Women");
      updateStates("womenShare", "gender", "blue");
      break;
    case "men":
      $(".js-mapOptionsBtn-label").text("Men");
      updateStates("menShare", "gender", "blue");
      break;
    case "women-of-color":
      $(".js-mapOptionsBtn-label").text("Women of color");
      updateStates("womenOfColorShare", "gender", "blue");
      break;
    case "men-of-color":
      $(".js-mapOptionsBtn-label").text("Men of color");
      updateStates("menOfColorShare", "gender", "blue");
      break;
    case "poverty":
      $(".js-mapOptionsBtn-label").text("Workers living in poverty");
      updateStates("povertyShare", "poverty", "blue");
      break;
    case "nearPoverty":
      $(".js-mapOptionsBtn-label").text("Workers living below 200% of the poverty line");
      updateStates("poorShare", "poverty", "blue");
      break;
    case "dads":
      $(".js-mapOptionsBtn-label").text("Working fathers");
      updateStates("dadsShare", "family", "blue");
      break;
    case "moms":
      $(".js-mapOptionsBtn-label").text("Working mothers");
      updateStates("momsShare", "family", "blue");
      break;
    case "single-parents":
      $(".js-mapOptionsBtn-label").text("Working single parents");
      updateStates("singleParentsShare", "family", "blue");
      break;
    case "married-parents":
      $(".js-mapOptionsBtn-label").text("Working married parents");
      updateStates("marriedParentsShare", "family", "blue");
      break;

    case "white":
      $(".js-mapOptionsBtn-label").text("Whites");
      updateStates("whiteShare", "race", "blue");
      break;

    case "black":
      $(".js-mapOptionsBtn-label").text("African Americans");
      updateStates("blackShare", "race", "blue");
      break;

    case "hispanic":
      $(".js-mapOptionsBtn-label").text("Latinos");
      updateStates("hispanicShare", "race", "blue");
      break;

    case "otherRace":
      $(".js-mapOptionsBtn-label").text("Asian Americans and others");
      updateStates("otherRaceShare", "race", "blue");
      break;

    case "age1":
      $(".js-mapOptionsBtn-label").text("Workers aged 16-25");
      updateStates("aged0to25Share", "age", "blue");
      break;

    case "age2":
      $(".js-mapOptionsBtn-label").text("Workers aged 25-39");
      updateStates("aged25to39Share", "age", "blue");
      break;

    case "age3":
      $(".js-mapOptionsBtn-label").text("Workers aged 40-54");
      updateStates("aged40to54Share", "age", "blue");
      break;

    case "age4":
      $(".js-mapOptionsBtn-label").text("Workers aged 55 and older");
      updateStates("aged55plusShare", "age", "blue");
      break;
  }
});
