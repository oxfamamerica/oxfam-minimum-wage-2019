define(['jquery', 'foundation','slick'], function ($, lightbox) {
window.whatInput = (function() {

  'use strict';

  /*
    ---------------
    variables
    ---------------
  */

  // array of actively pressed keys
  var activeKeys = [];

  // cache document.body
  var body;

  // boolean: true if touch buffer timer is running
  var buffer = false;

  // the last used input type
  var currentInput = null;

  // `input` types that don't accept text
  var nonTypingInputs = [
    'button',
    'checkbox',
    'file',
    'image',
    'radio',
    'reset',
    'submit'
  ];

  // detect version of mouse wheel event to use
  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  var mouseWheel = detectWheel();

  // list of modifier keys commonly used with the mouse and
  // can be safely ignored to prevent false keyboard detection
  var ignoreMap = [
    16, // shift
    17, // control
    18, // alt
    91, // Windows key / left Apple cmd
    93  // Windows menu / right Apple cmd
  ];

  // mapping of events to input types
  var inputMap = {
    'keydown': 'keyboard',
    'keyup': 'keyboard',
    'mousedown': 'mouse',
    'mousemove': 'mouse',
    'MSPointerDown': 'pointer',
    'MSPointerMove': 'pointer',
    'pointerdown': 'pointer',
    'pointermove': 'pointer',
    'touchstart': 'touch'
  };

  // add correct mouse wheel event mapping to `inputMap`
  inputMap[detectWheel()] = 'mouse';

  // array of all used input types
  var inputTypes = [];

  // mapping of key codes to a common name
  var keyMap = {
    9: 'tab',
    13: 'enter',
    16: 'shift',
    27: 'esc',
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  // map of IE 10 pointer events
  var pointerMap = {
    2: 'touch',
    3: 'touch', // treat pen like touch
    4: 'mouse'
  };

  // touch buffer timer
  var timer;


  /*
    ---------------
    functions
    ---------------
  */

  // allows events that are also triggered to be filtered out for `touchstart`
  function eventBuffer() {
    clearTimer();
    setInput(event);

    buffer = true;
    timer = window.setTimeout(function() {
      buffer = false;
    }, 650);
  }

  function bufferedEvent(event) {
    if (!buffer) setInput(event);
  }

  function unBufferedEvent(event) {
    clearTimer();
    setInput(event);
  }

  function clearTimer() {
    window.clearTimeout(timer);
  }

  function setInput(event) {
    var eventKey = key(event);
    var value = inputMap[event.type];
    if (value === 'pointer') value = pointerType(event);

    // don't do anything if the value matches the input type already set
    if (currentInput !== value) {
      var eventTarget = target(event);
      var eventTargetNode = eventTarget.nodeName.toLowerCase();
      var eventTargetType = (eventTargetNode === 'input') ? eventTarget.getAttribute('type') : null;

      if (
        (// only if the user flag to allow typing in form fields isn't set
        !body.hasAttribute('data-whatinput-formtyping') &&

        // only if currentInput has a value
        currentInput &&

        // only if the input is `keyboard`
        value === 'keyboard' &&

        // not if the key is `TAB`
        keyMap[eventKey] !== 'tab' &&

        // only if the target is a form input that accepts text
        (
           eventTargetNode === 'textarea' ||
           eventTargetNode === 'select' ||
           (eventTargetNode === 'input' && nonTypingInputs.indexOf(eventTargetType) < 0)
        )) || (
          // ignore modifier keys
          ignoreMap.indexOf(eventKey) > -1
        )
      ) {
        // ignore keyboard typing
      } else {
        switchInput(value);
      }
    }

    if (value === 'keyboard') logKeys(eventKey);
  }

  function switchInput(string) {
    currentInput = string;
    body.setAttribute('data-whatinput', currentInput);

    if (inputTypes.indexOf(currentInput) === -1) inputTypes.push(currentInput);
  }

  function key(event) {
    return (event.keyCode) ? event.keyCode : event.which;
  }

  function target(event) {
    return event.target || event.srcElement;
  }

  function pointerType(event) {
    if (typeof event.pointerType === 'number') {
      return pointerMap[event.pointerType];
    } else {
      return (event.pointerType === 'pen') ? 'touch' : event.pointerType; // treat pen like touch
    }
  }

  // keyboard logging
  function logKeys(eventKey) {
    if (activeKeys.indexOf(keyMap[eventKey]) === -1 && keyMap[eventKey]) activeKeys.push(keyMap[eventKey]);
  }

  function unLogKeys(event) {
    var eventKey = key(event);
    var arrayPos = activeKeys.indexOf(keyMap[eventKey]);

    if (arrayPos !== -1) activeKeys.splice(arrayPos, 1);
  }

  function bindEvents() {
    body = document.body;

    // pointer events (mouse, pen, touch)
    if (window.PointerEvent) {
      body.addEventListener('pointerdown', bufferedEvent);
      body.addEventListener('pointermove', bufferedEvent);
    } else if (window.MSPointerEvent) {
      body.addEventListener('MSPointerDown', bufferedEvent);
      body.addEventListener('MSPointerMove', bufferedEvent);
    } else {

      // mouse events
      body.addEventListener('mousedown', bufferedEvent);
      body.addEventListener('mousemove', bufferedEvent);

      // touch events
      if ('ontouchstart' in window) {
        body.addEventListener('touchstart', eventBuffer);
      }
    }

    // mouse wheel
    body.addEventListener(mouseWheel, bufferedEvent);

    // keyboard events
    body.addEventListener('keydown', unBufferedEvent);
    body.addEventListener('keyup', unBufferedEvent);
    document.addEventListener('keyup', unLogKeys);
  }


  /*
    ---------------
    utilities
    ---------------
  */

  // detect version of mouse wheel event to use
  // via https://developer.mozilla.org/en-US/docs/Web/Events/wheel
  function detectWheel() {
    return mouseWheel = 'onwheel' in document.createElement('div') ?
      'wheel' : // Modern browsers support "wheel"

      document.onmousewheel !== undefined ?
        'mousewheel' : // Webkit and IE support at least "mousewheel"
        'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
  }


  /*
    ---------------
    init

    don't start script unless browser cuts the mustard,
    also passes if polyfills are used
    ---------------
  */

  if (
    'addEventListener' in window &&
    Array.prototype.indexOf
  ) {

    // if the dom is already ready already (script was placed at bottom of <body>)
    if (document.body) {
      bindEvents();

    // otherwise wait for the dom to load (script was placed in the <head>)
    } else {
      document.addEventListener('DOMContentLoaded', bindEvents);
    }
  }


  /*
    ---------------
    api
    ---------------
  */

  return {

    // returns string: the current input type
    ask: function() { return currentInput; },

    // returns array: currently pressed keys
    keys: function() { return activeKeys; },

    // returns array: all the detected input types
    types: function() { return inputTypes; },

    // accepts string: manually set the input type
    set: switchInput
  };

}());

'use strict';

// Polyfill for requestAnimationFrame
(function() {
  if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
      window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                 || window[vp+'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
                          nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
})();

var initClasses   = ['mui-enter', 'mui-leave'];
var activeClasses = ['mui-enter-active', 'mui-leave-active'];

// Find the right "transitionend" event for this browser
var endEvent = (function() {
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  }
  var elem = window.document.createElement('div');

  for (var t in transitions) {
    if (typeof elem.style[t] !== 'undefined') {
      return transitions[t];
    }
  }

  return null;
})();

function animate(isIn, element, animation, cb) {
  element = $(element).eq(0);

  if (!element.length) return;

  if (endEvent === null) {
    isIn ? element.show() : element.hide();
    cb();
    return;
  }

  var initClass = isIn ? initClasses[0] : initClasses[1];
  var activeClass = isIn ? activeClasses[0] : activeClasses[1];

  // Set up the animation
  reset();
  element.addClass(animation);
  element.css('transition', 'none');
  requestAnimationFrame(function() {
    element.addClass(initClass);
    if (isIn) element.show();
  });

  // Start the animation
  requestAnimationFrame(function() {
    element[0].offsetWidth;
    element.css('transition', '');
    element.addClass(activeClass);
  });

  // Clean up the animation when it finishes
  element.one('transitionend', finish);

  // Hides the element (for out animations), resets the element, and runs a callback
  function finish() {
    if (!isIn) element.hide();
    reset();
    if (cb) cb.apply(element);
  }

  // Resets transitions and removes motion-specific classes
  function reset() {
    element[0].style.transitionDuration = 0;
    element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
  }
}

var MotionUI = {
  animateIn: function(element, animation, cb) {
    animate(true, element, animation, cb);
  },

  animateOut: function(element, animation, cb) {
    animate(false, element, animation, cb);
  }
};

//var $ = jQuery.noConflict();


    $.fn.OALightbox = function(){
        return this.each(function(){
            new Lightbox($(this));
        });
    };
//$(document).ready(function(){
  function Lightbox(el){
  //$(document).foundation();
  //var ousLightbox = new Foundation.Reveal($('#ousLightbox'));
  var ousLightbox = new Foundation.Reveal(el);
  if($("#lightboxBtn").length){
    //console.log("there is a lightboxBtn");
  if($('.oxfam-lightbox__slider').length){
    console.log(".oxfam-lightbox__slider");
    if(!$('.oxfam-lightbox__slider').hasClass('slick-initialized')) {
      //console.log("in slick not initialized");
      try{
        //console.log("trying");
        if(Content){
          //console.log("got Content");
          Content.initSlick();
          Content.initForm();
          //console.log("all good");

        }
      }catch(e){
        if(e){
          console.log("ERR");
        }
      }
    }
  }
  else{
    dataLayer.push({
      'event': 'LightboxInit',
      'eventLabel': 'LightboxInit',
      'eventCategory': 'LightboxInit',
      'eventAction': 'LightboxLoaded'
    });
  }
  if($('.donateform').length){
    //has a donate form, so need to handle the urls
    var baseurl = "https://secure2.oxfamamerica.org/page/content/donate";
    var sourceParam = Content.getUrlParameter('source');
    $("#submit-button").click( function(e){
      e.preventDefault();
      var otherVal = $("#other-amount-input").val();
      if(sourceParam){
        window.location.href = baseurl + "?donation_level="+otherVal+"&s_src=eoy_lightbox"+"&source="+sourceParam;
      }
      else{
        window.location.href = baseurl+ "?donation_level="+otherVal+"&s_src=eoy_lightbox&source=CB1612DMONEOYLB";
      }
    });
    $("button.donation-amount").click(function(e){
      e.preventDefault();
      var amtVal = $(this).data("amount");
      if(sourceParam){
        window.location.href = baseurl + "?donation_level="+amtVal+"&s_src=eoy_lightbox"+"&source="+sourceParam;
      }
      else{
        window.location.href = baseurl+ "?donation_level="+amtVal+"&s_src=eoy_lightbox&source=CB1612DMONEOYLB";
      }

    });
    $("#submit-button-mobile").click( function(e){
      e.preventDefault();
      //var otherVal = $("#other-amount-input").val();
      if(sourceParam){
        window.location.href = baseurl + "?s_src=eoy_lightbox"+"&source="+sourceParam;
      }
      else{
        window.location.href = baseurl+ "?s_src=eoy_lightbox&source=CB1612DMONEOYLB";
      }
    });
  }
  //if($('.oxfam-lightbox__slider').hasClass('slick-initialized')){
    //console.log("it is initialized");
    //$("#lightboxBtn").click();
    //$('#ousLightbox').foundation('open');
  //}
  //$("#lightboxBtn").click(function(){
    //console.log("clicked the lightboxBtn");
    //$('.oxfam-lightbox__slider').slick('slickGoTo',0);
    //});

  }
}//});

var Content = {
  initForm: function()
  {
    //console.log("in init");
    var emailFormButton = $("#emailSubmitButton");
    var mobileFormButton = $("#mobileSubmitButton");
    var mobileOptOutButton = $("#mobileOptOutButton");
    //Content.formCheck();
    Content.formAction(emailFormButton);
    Content.formAction(mobileFormButton);
    mobileOptOutButton.on("click", function(){
      $('.oxfam-lightbox__slider').slick('slickNext');
    });
    dataLayer.push({
      'event': 'SlickInit',
      'eventLabel': 'SlickInit',
      'eventCategory': 'SlickInit',
      'eventAction': 'SlickLoaded'
    });
    //$("#lightboxBtn").trigger("click");

    $('.oxfam-lightbox__slider').slick('slickGoTo',0);
    //$("#ousLightbox").foundation('open');



  },

  initSlick: function(){
  //console.log("slick init");

    $('.oxfam-lightbox__slider').slick({
      variableWidth: false,
      touchMove: false,
      swipe: false,
      draggable: false,
      arrows:false,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight:false
    });




  },
/***** FORM Check *****/

  formCheck : function()
  {
    var formFilled = localStorage['formFilled'];
    if(formFilled){
      // hide form content and show success
        $(".form-content").each(function(){
          if(!$(this).hasClass('hide')){
            $(this).addClass('hide');
          }

        });
        $(".form-success").each(function(){
          if($(this).hasClass('hide')){
            $(this).removeClass('hide');
          }

        });
    }
  },
  /***** FORM ACTION *****/
  formAction : function(formButton)
  {
    // Petition form using BSD API
    //console.log("Current Form: "+formButton);
    $(formButton).on('click', function(event){
      event.preventDefault();
      //console.log("FormAction clicked");
      //$('.petition_form').on('submit', function(event){

      //console.log("form submit");
      var $form = $(this).closest("form");
      var formData = {};
      var inputOk = false;
      var formId = $form.attr("id");
      if(formId == "emailForm"){
        var email = $form.find('.email').val();
        formData = {'email': email};
        inputOk = true;
        //console.log("this is the email form: "+email);
        localStorage["email"] = email;
      }
      else if(formId == "mobileForm"){
        var mobile = $form.find('.mobile').val();
        inputOk = true;
        //console.log("this is the mobile form: "+mobile);
        if(localStorage["email"]){
          var storedEmail = localStorage.getItem('email');

          formData = {'email': storedEmail,'phone': mobile};
          //console.log("And I also have this email stored: "+ storedEmail);
        }
        else{
          formData = {'email': 'blank@blank.com','phone':mobile};
        }
      }
      var formUrl = "";
      var source = Content.getUrlParameter('source');
      if(source){
        formUrl = "https://secure2.oxfamamerica.org/page/sapi/lightboxsignup?source="+source+"&";
      }
      else{
        formUrl = "https://secure2.oxfamamerica.org/page/sapi/lightboxsignup?";
      }
      if(inputOk){
      $.ajax({
        type: 'POST',
        url: formUrl,
        data: formData
      }).done(function(data){
        //console.log("Done form");
      })
      .success(function( data ) {
          $('.error_status').hide();
          $('.success').removeClass('hide');
          //$('.form').addClass('hide');
          $form.closest(".form").addClass('hide');
          //$('.form-success').html("thank you");
          localStorage["formFilled"] = true;
          if(formId == "emailForm"){
            localStorage["email"] = email;
          }
          $('.oxfam-lightbox__slider').slick('slickNext');

      }).error(function( jqXHR, data ){
        //console.log("error: "+$form.attr("id") );

        //$('.oxfam-lightbox__slider').slick('slickNext');

        if(data.field_errors){
          for(var i=0; i < data.field_errors.length; i++){
            var field = $form.find("."+data.field_errors[i].field+"_error"),
                error_message = data.field_errors[i].message;

            field.html(error_message).css('display', 'block').hide().fadeIn();
            $('.global_error').html(error_message).css('display', 'block').show().fadeIn();
          }
        }else{
          $('.global_error').html("There was a problem submitting the form. Please try again.").css('display', 'block').show().fadeIn();
        }
      });

    }else{
      //console.log("error");
      $('.global_error').html("Please complete all fields and submit again.").css('display', 'block').hide().fadeIn();
    }

  });

  },
  getUrlParameter : function(sParam){
    //var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    //};
  },


};


});
