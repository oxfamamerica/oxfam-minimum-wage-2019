import { updateStates } from "./map";
import { updatePopUp } from "./popup";

let series;

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
      series = "all";
      $(".js-mapOptionsBtn-label").text("All workers");
      updateStates("allShare", series, "red");
      break;
    case "women":
      series = "gender";
      $(".js-mapOptionsBtn-label").text("Women");
      updateStates("womenShare", series, "blue");
      break;
    case "men":
      series = "gender";
      $(".js-mapOptionsBtn-label").text("Men");
      updateStates("menShare", series, "blue");
      break;
    case "women-of-color":
      series = "gender";
      $(".js-mapOptionsBtn-label").text("Women of color");
      updateStates("womenOfColorShare", series, "blue");
      break;
    case "men-of-color":
      series = "gender";
      $(".js-mapOptionsBtn-label").text("Men of color");
      updateStates("menOfColorShare", series, "blue");
      break;
    case "poverty":
      series = "poverty";
      $(".js-mapOptionsBtn-label").text("Workers living in poverty");
      updateStates("povertyShare", series, "blue");
      break;
    case "nearPoverty":
      series = "poverty";
      $(".js-mapOptionsBtn-label").text("Workers living below 200% of the poverty line");
      updateStates("poorShare", series, "blue");
      break;
    case "dads":
      series = "family";
      $(".js-mapOptionsBtn-label").text("Working fathers");
      updateStates("dadsShare", series, "blue");
      break;
    case "moms":
      series = "family";
      $(".js-mapOptionsBtn-label").text("Working mothers");
      updateStates("momsShare", series, "blue");
      break;
    case "single-parents":
      series = "family";
      $(".js-mapOptionsBtn-label").text("Working single parents");
      updateStates("singleParentsShare", series, "blue");
      break;
    case "married-parents":
      series = "family";
      $(".js-mapOptionsBtn-label").text("Working married parents");
      updateStates("marriedParentsShare", series, "blue");
      break;

    case "white":
      series = "race";
      $(".js-mapOptionsBtn-label").text("Whites");
      updateStates("whiteShare", series, "blue");
      break;

    case "black":
      series = "race";
      $(".js-mapOptionsBtn-label").text("African Americans");
      updateStates("blackShare", series, "blue");
      break;

    case "hispanic":
      series = "race";
      $(".js-mapOptionsBtn-label").text("Latinos");
      updateStates("hispanicShare", series, "blue");
      break;

    case "otherRace":
      series = "race";
      $(".js-mapOptionsBtn-label").text("Asian Americans and others");
      updateStates("otherRaceShare", series, "blue");
      break;

    case "age1":
      series = "age";
      $(".js-mapOptionsBtn-label").text("Workers aged 16-25");
      updateStates("aged0to25Share", series, "blue");
      break;

    case "age2":
      series = "age";
      $(".js-mapOptionsBtn-label").text("Workers aged 25-39");
      updateStates("aged25to39Share", series, "blue");
      break;

    case "age3":
      series = "age";
      $(".js-mapOptionsBtn-label").text("Workers aged 40-54");
      updateStates("aged40to54Share", series, "blue");
      break;

    case "age4":
      series = "age";
      $(".js-mapOptionsBtn-label").text("Workers aged 55 and older");
      updateStates("aged55plusShare", series, "blue");
      break;
  }
  
  updatePopUp(series)
});
