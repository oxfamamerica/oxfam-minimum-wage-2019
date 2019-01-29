define(['jquery', 'hammer'], function ($, hammer) {
    'use strict';

    var methods = {
        addButton: function() {
            this.button = $('<span class="js-cmpnt-slidenav-button">'+this.buttonText+'<span class="arrow"></span></span>');
            this.button
                .insertBefore(this.el)
                .on('click', $.proxy(methods.navToggle, this));
        },

        navToggle: function() {
            this.el.toggleClass('js-cmpnt-slidenav-open');
        },

        addTouch: function() {
            hammer(this.el[0]).on('dragleft swipeleft dragright swiperight', $.proxy(methods.handleTouch, this));
        },

        handleTouch: function(e) {
            // disable browser scrolling
            e.gesture.preventDefault();

            switch(e.type) {
                case 'dragleft':
                case 'swipeleft':
                    e.gesture.stopDetect();
                    this.el.removeClass('js-cmpnt-slidenav-open');
                    break;

                case 'dragright':
                case 'swiperight':
                    e.gesture.stopDetect();
                    this.el.addClass('js-cmpnt-slidenav-open');
                    break;
            }
        }
    };

    function SlideNav(el) {
        this.el          = el;
        this.button      = null;
        this.buttonText  = el.data('slidenavButton');

        methods.addButton.call(this);
				//JI 11/13/2013: disable touch functions
        //methods.addTouch.call(this);
    }

    $.fn.OASlideNav = function(){
        return this.each(function(){
            new SlideNav($(this));
        });
    };
});
