/*======================================================
  responsiveScripts.js
  ======================================================

    1.  MODERNIZR MEDIA QUERIES
    2.  ADD MOBILE DEVICE CLASSES
    3.  NAVIGATION SCRIPTS (TRIGGER CLICK FUNCTIONS AND CLONING/APPENDING NAVS)

  ===================================================== */

var mobile = false;
var dropDownContainerVisible = false;
var navOpened = false;
var subNavOpened = false;
var colRightAdjust = false;
var ontarioLogoAdjust = false;
var topContentAdjust = false;
var searchAdjust = false;

/*==========================================================
  1. SET JAVASCRIPT BREAKPOINTS AND ENTER/EXIT SCRIPTS
==========================================================*/

function jsMediaQueries() {
    if (Modernizr.mq('only screen and (min-width: 992px)')) {
        $('html').removeClass('tablet').addClass('desktop');
        if (navOpened) {
            navClose();
        }
        subNavClose();
        if (colRightAdjust) {
            colRightReset();
        }
        if (ontarioLogoAdjust) {
            ontarioLogoReset();
        }
        if (topContentAdjust) {
            topContentReset();
        }
    }
    // if (Modernizr.mq('only screen and (min-width: 992px)') && (Modernizr.touch) || Modernizr.mq('only all and (min-width: 992px)')) {
    // Uncomment if search is repositioned on mobile
    // if (searchAdjust) {
    //     searchReset();
    // }
    // }

    if (Modernizr.mq('only screen and (max-width: 991px)') && (Modernizr.touch) || Modernizr.mq('only all and (max-width: 991px)')) {
        $('html').removeClass('desktop mobile').addClass('tablet');
        $('html').removeClass('mobile');

        colRightReset();
        ontarioLogoPos();
        topContentPos();
        mobile = false;
        $('#subNavContainer').css('min-height', '0px');
    }
    if (Modernizr.mq('only screen and (min-width: 768px)')) {
        navClose();
        // Uncomment if search is repositioned on mobile
        // if (searchAdjust) {
        //     searchReset();
        // }
    }
    if (Modernizr.mq('only screen and (max-width: 767px)')) {
        $('html').removeClass('tablet').addClass('mobile');
        document.addEventListener("touchstart", function() {}, true) // ADD 'ACTIVE' STATE TO TOUCH LINKS
            //searchPos();  Uncomment if search is repositioned on mobile
        colRightPos();
        topContentPos();
        ontarioLogoPos();
        mobile = true;
        $('#subNavContainer').css('min-height', '0px');
    }
}

function mainContentHeight() {

    var footer = $('.footerInner'),
        tweets = $('.tweet');

    if (Modernizr.mq('only all and (max-width: 991px)')) {
        $('#subNavWrapper').css('min-height', '0px');
        $('#contentInt').css('min-height', '0px');

    } else {
        if ($("#subNavWrapper").length > 0 && $('#subNavWrapper:visible').length > 0) {
            $('#subNavWrapper').css('min-height', '0px');
            $('#contentInt').css('min-height', '0px');

            var subNavHeight = $('#subNavWrapper').outerHeight();
            var mainHeight = $('#contentInt').outerHeight();

            if (subNavHeight > mainHeight) {
                $('#contentInt').css('min-height', subNavHeight);
            } else if (subNavHeight < mainHeight) {
                $('#subNavWrapper').css('min-height', mainHeight);
            }
        }
    }

    if (footer.length > 0) {
        $('.footerInner').find('ul ul').matchHeight();
    }

    if (tweets.length > 0) {
        $('.tweet').find('p:first').matchHeight();
        $('.tweet').find('small:first').matchHeight();
    }

    if ($('.interior').length > 0 && Modernizr.mq('only screen and (min-width: 768px)')) {
        // $('#topNavContainer').height();
        if ($('#topNavContainer').outerHeight(true) > 78) {
            $('.interior .ticker-content').css('padding-left', '0rem');
        } else {
            if (Modernizr.mq('only screen and (min-width: 1200px)')) {
                $('.interior .ticker-content').css('padding-left', '10rem');
            } else if (Modernizr.mq('only screen and (min-width: 992px)')) {
                $('.interior .ticker-content').css('padding-left', '9rem');
            } else {
                $('.interior .ticker-content').css('padding-left', '8.5rem');
            }
        }

    } else {
        $('.interior .ticker-content').css('padding-left', '1rem');
    }

}

function intBannerWidth() {
    if (Modernizr.mq('only screen and (min-width: 992px)')) {
        $('#intBanner').css('width', '0');
        var intFloatRightWidthValue = $('#intFloatRight').outerWidth(true) + 2;
        var intBannerWidthValue = $('#printArea').outerWidth() - intFloatRightWidthValue;
        $('#intBanner').css('width', intBannerWidthValue);
    }
    if (Modernizr.mq('only screen and (max-width: 991px)') && (Modernizr.touch) || Modernizr.mq('only all and (max-width: 991px)')) {
        $('#intBanner').css('width', '100%');
    }
    if (Modernizr.mq('only screen and (max-width: 767px)')) {
        $('#intBanner').css('width', 'auto');
    }
    var intBannerheightValue = intBannerWidthValue * .30; // Update .30 with the correct value when dividing the image height by the image width
    $('#intBannerImage').css('height', intBannerheightValue);
}

function feedbackPos() {
    if (Modernizr.mq('only screen and (max-width: 991px)')) {
        $('#feedbackLink').detach().appendTo('#topNav');
    } else {
        $('#feedbackLink').detach().insertAfter('footer');
    }
}

//Fix Gallery not visible in Accordion on expand
$(function() {
    $(".AccordionTrigger").on("click", function() {
        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
    });
});

$(function() {
    jsMediaQueries()
    mainContentHeight()
    intBannerWidth()
    feedbackPos();

    if ($('#uber').hasClass('interior')) {
        $('.lb-imageBox_header').matchHeight();
    }


    $(window).resize(function() {
        jsMediaQueries();
        mainContentHeight();
        intBannerWidth();
        feedbackPos();
    });
    $(window).load(function() {
        jsMediaQueries();
        mainContentHeight();
        intBannerWidth();
        feedbackPos();
    });

    /*==========================================================
      2. ADD MOBILE DEVICE CLASSES
    ==========================================================*/

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
        $('html').addClass('x-apple');
    }
    if (navigator.userAgent.match(/(Android)/i)) {
        $('html').addClass('x-android');
    }
    if (navigator.userAgent.match(/(blackberry)/i)) {
        $('html').addClass('x-blackberry');
    }
    if (navigator.userAgent.match(/(bb10)/i)) {
        $('html').addClass('x-bb10');
    }

    /*==========================================================
      3. NAVIGATION SCRIPTS
    ==========================================================*/

    $('#mainNav #nav > li> a').clone().appendTo('.mobileDropDown');
    $('.search').clone().appendTo('.mobileSearchContainer');
    $('.subNav').clone().appendTo('.mobileSubNavContainer');
    $('.socialLinks').clone().appendTo('.mobileSocialLinks');

    /* Mobile Nav Trigger is clicked */

    $('.menuTrigger').click(function() {
        if (navOpened) {
            navClose();
        } else {
            navOpen();
        }
    });

    /* Mobile subNav Trigger is clicked */

    $('.subNavTrigger').click(function() {
        subNavClick();
        return false;
    });

    $('.closeNav').click(function() {
        navClose();
        return false;
    });
});

function navOpen() {
    if (iCreateObject.lang == "fr") {
        $('.menuTriggerText').html('Fermer');
    } else {
        $('.menuTriggerText').html('Close');
    }
    $('body').addClass('navOpen');
    navOpened = true;
}

function navClose() {
    $('.menuTriggerText').html('Menu');
    $('body').removeClass('navOpen');
    navOpened = false;
    $('#nav li').removeClass('sfHover');
    $('#nav li .dropDownContainer').hide();
}


function subNavClose() {

    if (iCreateObject.lang == "fr") {
        $('.subNavTriggerText').html('Plus');
    } else {
        $('.subNavTriggerText').html('More');
    }
    $('body').removeClass('subNavOpen');
    subNavOpened = false;
}

function subNavOpen() {
    if (iCreateObject.lang == "fr") {
        $('.subNavTriggerText').html('Fermer');
    } else {
        $('.subNavTriggerText').html('Close');
    }
    $('body').addClass('subNavOpen');
    subNavOpened = true;
}

function subNavClick() {
    if (subNavOpened) {
        subNavClose();
    } else {
        subNavOpen();
    }
    return false;
}

function searchPos() {
    if (!searchAdjust) {
        $('.searchContainer').detach().appendTo('.mobileDropDown');
        searchAdjust = true;
    }
}

function searchReset() {
    var isHomepage = $('#uber').hasClass('homepage');
    var isLanding = $('#uber').hasClass('landing');

    if (!isLanding && !isHomepage) {
        $('.searchContainer').detach().prependTo('#intFloatRight');
        searchAdjust = false;
    } else if (isHomepage) {
        $('.searchContainer').detach().prependTo('.homeSearchWrapper');
        searchAdjust = false;
    } else if (isLanding) {
        $('.searchContainer').detach().appendTo('.landingSearchWrapper');
        searchAdjust = false;
    }
}

function homeSearchReset() {
    var isHomepage = $('#uber').hasClass('homepage');
    if (isHomepage) {
        $('.searchContainer').detach().prependTo('.homeSearchWrapper');
        searchAdjust = false;
    }
}

function landingSearchReset() {
    var isLanding = $('#uber').hasClass('landing');
    if (isLanding) {
        $('.searchContainer').detach().appendTo('.landingSearchWrapper');
        searchAdjust = false;
    }
}

function colRightPos() {
    $('#intFloatRight').detach().insertAfter('#printAreaContent');
    colRightAdjust = true;
}

function colRightReset() {
    $('#intFloatRight').detach().insertBefore('#printAreaContent');
    colRightAdjust = false;
}

function ontarioLogoPos() {
    $('.footerBottomRight').detach().insertBefore('.footerBottomLeft');
    ontarioLogoAdjust = true;
}

function ontarioLogoReset() {
    $('.footerBottomRight').detach().insertAfter('.footerBottomLeft');
    ontarioLogoAdjust = false;
}

function topContentPos() {
    if (!$('#uber').hasClass("landing")) {
        $('.topContentWrapper').detach().insertBefore('#printArea');
        topContentAdjust = true;
    } else {
        $('.topContentWrapper').detach().insertBefore('#printArea');
        topContentAdjust = true;
    };
}

function topContentReset() {
    if ($('#uber').hasClass("landing")) {
        $('.topContentWrapper').detach().insertAfter('header');
        topContentAdjust = false;
    } else {
        $('.topContentWrapper').detach().appendTo('#intBg');
        topContentAdjust = false;
    };
}

/*==========================================================
      4.REPLACE JUMPS WITH SCROLLS (EQUAL HEIGHT DIV FIX FOR ANCHORS
    ==========================================================*/

$(function() {
    $('#printAreaContent a[href*=#]:not([href=#]), #printAreaContentDotNet a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });
});

/*==========================================================
      4. BROWSER DETECTION SCRIPT
    ==========================================================*/

var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1) {
                return data[i].identity;
            }
        }
    },

    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },

    dataBrowser: [
        { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari", identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera", identity: "Opera" }
    ]

};

BrowserDetect.init();

$(function() {
    if (BrowserDetect.browser == 'Explorer') {
        $('html').addClass('ie');
    }
    if (BrowserDetect.browser == 'Opera') {
        $('html').addClass('opera');
    }
    if (BrowserDetect.browser == 'Firefox') {
        $('html').addClass('moz');
    }
    if (BrowserDetect.browser == 'Safari') {
        $('html').addClass('safari');
    }
    if (BrowserDetect.browser == 'Chrome') {
        $('html').addClass('chrome');
    }
});

/*==========================================================
      5. GOOGLE SEARCH AND MODAL SEARCH BOX
    ==========================================================*/
$(function() {
    var appendthis = ("<div class='modal-overlay js-modal-close'></div>");


    function modalSearchClose() {
        if ($("#popup").is(':visible')) {
            $('#navSearch > a').focus();
        }
        $(".modal-box, .modal-overlay").fadeOut(500, function () {
            $(".modal-overlay").remove();
        });
    }

    $('a[data-modal-id]').click(function(e) {
        e.preventDefault();
        $("body").append(appendthis);
        $(".modal-overlay").fadeTo(500, 0.4);
        var modalBox = $(this).attr('data-modal-id');
        $('#' + modalBox).fadeIn($(this).data());
        $('.search input').focus();
    });

    $(".js-modal-close, .modal-overlay").click(function() {
        modalSearchClose();
    });

    $(document).keyup(function(e) {
        if (e.which == 27) {
            modalSearchClose();
        }
    });

    $(document).mouseup(function(e) {
        var container = $(".modal-box");

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            modalSearchClose();
        }
    });

    $(window).resize(function() {
        $(".modal-box").css({
            top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
            left: ($(window).width() - $(".modal-box").outerWidth()) / 2
        });
    });

   // $(window).resize();
    $(".modal-box").css({
        top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
        left: ($(window).width() - $(".modal-box").outerWidth()) / 2
    });
});

//Google Search Script
$(window).load(function() {
    // Google Search Placeholder text
    setTimeout(function() {
        if ($(window).width() > 767) {
            $('form.gsc-search-box').find("input.gsc-input").each(function(ev) {
                $(this).attr("placeholder", "What are you looking for?");
            });
        } else {
            $('form.gsc-search-box').find("input.gsc-input").each(function(ev) {
                $(this).attr("placeholder", "Search");
            });
        }
    }, 300);
});


/*==========================================================
      6.RESPONSIVE IFRAME
    ==========================================================*/

$(function() {
    if (!iCreateObject.isSiteInICreateMode || iCreateObject.isSiteInPreview) {
        if ($('iframe').length > 0) {
            $('iframe').each(function(index) {
                var pattern = /(youtube\.com|youtu\.be|vimeo\.com)/,
                video = pattern.test($(this).attr('src'));
                if (video) {
                    var iframeWidth = $(this).outerWidth(),
                    iframeHeight = $(this).outerHeight(),
                    iframePadding = iframeHeight / iframeWidth * 100;
                    $(this).wrap('<div class="iframe-container" />');
                    $(this).parent('.iframe-container').css('padding-bottom', iframePadding + '%');
                    if ($(this).attr('width')) {
                        if (!$(this).attr('width').match('%$')) {
                            $(this).parent('.iframe-container').wrap('<div style="max-width:' + $(this).attr('width') + 'px"></div>');
                        }
                    }
                }
            });
        }
    }
});


/*==========================================================
      7.ACCORDION SCROLL FIX
    ==========================================================*/
$(function() {
    $('.AccordionTrigger').bind('click', function() {
        var self = this;
        setTimeout(function() {
            theOffset = $(self).offset();
            $('body,html').animate({ scrollTop: theOffset.top - 50 });
        }, 350);
    });
});
