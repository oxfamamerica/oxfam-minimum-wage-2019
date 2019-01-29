define(['jquery'], function ($) {
    'use strict';

    $(function(){
        // Photo credit touch hack
        $('.cmpnt-credit-text')
            .click(function(){
                $(this).toggleClass('show');
            });

        // Nav skip link
        $('.skip-top-nav')
            .click(function(e){
                e.preventDefault();
            });

         // JI 3/19/2014 updated from Code
        var navBlockHeight = $('#Search').outerHeight() + $('#NavContainer #PrimaryNav').outerHeight();
        var nav = $('#NavContainer');

        // Mobile nav toggle
        $('a.skip-link-top-nav').click(function(e) {
            e.preventDefault();
            var navHeight = ($(document).height());
             // JI 3/19/2014 updated from Code
            var borderHeight = ($(document).height() - navBlockHeight);
            //var borderHeight = ($(document).height() - 250);
            //var nav = $('#NavContainer');
            // Toggle stuff
            nav.toggleClass('open');
            // Conditional height
            if (nav.hasClass('open')) {
                nav.animate({
                    height: navHeight,
                    borderBottomWidth: borderHeight
                  }, 300, 'ease-in-out');
            } else {
                nav.animate({
                    height: '0px',
                    borderBottomWidth: '0px'
                  }, 200, 'ease-in-out');
            }
        });

        // on browser resize...
        $(window).resize(function() {
            //moveSigBar();
            moveAllSigBar();
        });

        
        //FOOTER DONATE FORM
        // JI Updated 12/24/13

        // switch radio button when 'other' amount is focused
        $("#DonateValueCustomInput").focusin( function() {     
            $("ol.donation-values input[type=radio][name=v]#DonateValueCustom").click();
        });

        $("ol.donation-values li.donate-submit button").click(function(e){
             e.preventDefault();
          var footDonateType = $("ol.donation-values input[type=radio]:checked");
          var footDonateAmt = footDonateType.val();
           var otherAmount = $("#DonateValueCustomInput").val();

           if($("ol.donation-values input[type=radio]#DonateValueLow").is(':checked')){
             window.location.href = "https://secure2.oxfamamerica.org/page/content/donate?donation_level="+footDonateAmt+"&s_src=footer";
           }
           else if($("ol.donation-values input[type=radio]#DonateValueMiddle").is(':checked')){
               window.location.href = "https://secure2.oxfamamerica.org/page/content/donate?donation_level="+footDonateAmt+"&s_src=footer";
           }
           else if($("ol.donation-values input[type=radio]#DonateValueHigh").is(':checked')){
                window.location.href = "https://secure2.oxfamamerica.org/page/content/donate?donation_level="+footDonateAmt+"&s_src=footer";
           }
           else{
                window.location.href = "https://secure2.oxfamamerica.org/page/content/donate?donation_level="+otherAmount+"&s_src=footerother";
           }
        });


       // DONATE PAGE FORM
       // JI Updated 12/24/13
       // get the value of the radio
       $(document).ready(function(){
             var checkedDonate = $("ol.donation-group input[type=radio]:checked").val(); 
            if(checkedDonate == "Monthly donation"){
              $('#monthlyDonation').click();
            }
            else{
              $('#singleDonation').click();
            }
        });
       var typeVal = $("ol.donation-group input[type=radio][name=donateType]").val();
       $("ol.donation-group input[type=radio][name=donateType]").click(function() {
            var value = $(this).val();
            if(value == "Monthly donation"){
                $("ul.monthly-selection").css("display","block");
                $("ul.single-selection").css("display","none");
            }
            else{
                $("ul.monthly-selection").css("display","none");
                $("ul.single-selection").css("display","block");
            }
            //set the value of donation type to inform other button link
            typeVal = value; 
        });

        // redirect to the proper donation page when button clicked, prepopulated with Other amount
        $("#donateOtherAmount").click( function(){
            var otherVal = $("#DonateValueOther").val();
            if(typeVal == "Single donation"){
                 window.location.href = "https://secure2.oxfamamerica.org/page/content/donate?donation_level="+otherVal+"&s_src=other";
            }
            else {
                //otherVal = otherVal*100;
                window.location.href = "https://secure2.oxfamamerica.org/page/content/donate?donation_level="+otherVal;
            }
        });
        //JI 1/24/14 adding functionality for join us email submission boxes
         $("#joinus").click(function(){
            var consEmail = $("#consemail").val();
            window.location.href = "https://secure.oxfamamerica.org/site/SPageServer/?cons_email="+consEmail+"&pagename=eComm_Register";
        });
        $('#consemail').keyup(function(e){
          e.preventDefault();
          if(e.which == 13){//Enter key pressed
           $("#joinus").trigger('click');
          }
        });

        $(".joinus1").click(function(){
            var consEmailDesk = $(".hidden-phone .consemail1").val();
            var consEmailMobile = $(".hidden-desktop .consemail1").val();
            if(consEmailDesk === ""){
              window.location.href = "https://secure.oxfamamerica.org/site/SPageServer/?cons_email="+consEmailMobile+"&pagename=eComm_Register";
            }
            else{
              window.location.href = "https://secure.oxfamamerica.org/site/SPageServer/?cons_email="+consEmailDesk+"&pagename=eComm_Register";
            }
        });
        $('.consemail1').keyup(function(e){
          e.preventDefault();
          if(e.which == 13){//Enter key pressed
           $(".joinus1").trigger('click');
          }
        });


        // Show / Hide content
        $('button.hide-show-content').click( function() {
            var  hideShowContent = $('.show-more-mobile');
            hideShowContent.toggleClass('open');
            if (hideShowContent.hasClass('open')) {
                $(this).text("Hide content").addClass('hide-arrow');
            } else {
                $(this).text("Show  more").removeClass('hide-arrow');
            }
        });

          // Expand Content toggle
         $('.expand').click(function(e) {
             e.preventDefault();
             var expand = $(this);
             var expandSection = $(this).parents('.cmpnt-expand');
             var expandContent = expandSection.find('.expand-content');
             // Toggle stuff
             expand.toggleClass('open');
             expandSection.toggleClass('open');
             expandContent.toggleClass('open');
             // Conditional height
             if (expandContent.hasClass('open')) {
                 expandContent.animate({
                     display: 'block'
                   }, 300, 'ease-in-out');
             } else {
                 expandContent.animate({
                     display: 'none'
                   }, 200, 'ease-in-out');
             }
         });

        // SIGNATURE PROGRESS
          var getSigPercent = ($('.signature-progress-wrap').data('signature-progress-percent') / 100);
        // on page load...
        if (getSigPercent > 0) {
            // on page load, animate percentage bar to data percentage length
            $('.signature-progress-wrap').addClass('show');
            moveSigBar();
        }

        function moveSigBar() {
            var getSigWrapWidth = $('.signature-progress-wrap').width();
            var sigPercentTotal = getSigPercent * getSigWrapWidth;
            var animationLength = 2500;
            $('.signature-progress-bar').animate({
                left: sigPercentTotal
            }, animationLength, 'ease-in-out');
        }


        moveAllSigBar();

        function moveAllSigBar() {
          $(".signature-progress-wrap").each(function( index ) {
            var getSigPercent = ($(this).data('signature-progress-percent') / 100);
            if (getSigPercent > 0) {
              $(this).addClass('show');
              var getSigWrapWidth = $(this).width();
              var sigPercentTotal = getSigPercent * getSigWrapWidth;
              //var animationLength = 2500;
              var animationLength = 1500;
              $('.signature-progress-bar', this).each(function(barIndex){
                $(this).animate({
                  left: sigPercentTotal
                }, animationLength, 'ease-in-out');
              });
            }
          });
        }
    });
});
