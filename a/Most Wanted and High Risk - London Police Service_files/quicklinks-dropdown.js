
$(document).ready(function () {

    // preload the dropdown images
    var cache = [];
    // Arguments are image paths relative to the current page.
    $.preLoadImages = function () {
        var args_len = arguments.length;
        for (var i = args_len; i--;) {
            var cacheImage = document.createElement('img');
            cacheImage.src = arguments[i];
            cache.push(cacheImage);
        }
    }

    var isTouch = Modernizr.touch || navigator.msMaxTouchPoints > 1;
    var mobileAccordSetup = false;
    var panelActionsSetup = false;

    //TODO: QUICKLINKS: make these items match the appropriate dropdown panels
    var panels = new Array();
    panels[0] = $('.share');
	panels[1] = $('#idLikeTo');
    panels[2] = $('#quickLink01');
    panels[3] = $('#quickLink02');
    panels[4] = $('#quickLink03');
    panels[5] = $('#quickLink04');
    panels[6] = $('#quickLink05');
    panels[7] = $('#quickLink06');
    panels[8] = $('.bannerDescription');

    var dropdowns = new Array();
    dropdowns[0] = $('.share .shareDropDown');
	dropdowns[1] = $('#idLikeTo .quickDropDown');
    dropdowns[2] = $('#quickLink01 .quickDropDown');
    dropdowns[3] = $('#quickLink02 .quickDropDown');
    dropdowns[4] = $('#quickLink03 .quickDropDown');
    dropdowns[5] = $('#quickLink04 .quickDropDown');
    dropdowns[6] = $('#quickLink05 .quickDropDown');
    dropdowns[7] = $('#quickLink06 .quickDropDown');
    dropdowns[8] = $('.bannerDescription .quickDropDown');

    var openPanel;
    $.openTimer = 0;
    $.closeTimer = 0;

    $.keepButtonOpen = false;
    $.keepDropdownOpen = false;

    var mobileAccord = false;
	
	function openPanel(panel) {

        panel.find('.quickDropDown').css({ 'display': 'block' }).addClass('current');
		panel.find('.shareDropDown').css({ 'display': 'block' }).addClass('current');
		panel.parents('#searchWrapper').addClass('hover');
        panel.find('a').addClass('current');

    };


    function closePanel(panel) {
        if (!$.keepDropdownOpen) {
            panel.find('.quickDropDown').css({ 'display': 'none' }).removeClass('current');
			panel.find('.shareDropDown').css({ 'display': 'none' }).removeClass('current');
			panel.parents('#searchWrapper').removeClass('hover');
            panel.find('a').removeClass('current');
        };
    };


    // function controls the mouseover of quicklink buttons
    $.each(panels, function (index, panel) {

        panel.mouseenter(function () {
            $.openTimer = setTimeout(function () { openPanel(panel) }, 250);
        });

        panel.mouseleave(function () {
            clearTimeout($.openTimer);
            $.closeTimer = setTimeout(function () { closePanel(panel) }, 250);
        });


        // Tabbing
        panel.focusin(function () {
            $.openTimer = setTimeout(function () { openPanel(panel) }, 250);
        }).focusout(function () {
            clearTimeout($.openTimer);
            $.closeTimer = setTimeout(function () { closePanel(panel) }, 250);
        });

    });


    // function controls the jump from dropdown button, to dropdown content
    $.each(dropdowns, function (index, dropdown) {

        dropdown.mouseenter(function () {
            $.keepDropdownOpen = true;
            clearTimeout($.closeTimer);
        });

        dropdown.mouseleave(function () {
            $.keepDropdownOpen = false;
            $.closeTimer = setTimeout(function () { closePanel(dropdown) }, 250);
        });

        //tabbing
        dropdown.focusin(function () {
            $.keepDropdownOpen = true;
            clearTimeout($.closeTimer);
        }).focusout(function () {
            $.keepDropdownOpen = false;
            $.closeTimer = setTimeout(function () { closePanel(dropdown) }, 250);
        });


    });
	
	
	 //*** Commented Portion Below from Oshawa - Used for Accordions on Mobile Devices, if using commented code above @ function openPanel(panel) ***//
	//**********************************************************************************************************************************************//
	
//    function openPanel(panel) {
//        if (panel.attr('id') == 'quickLink01') {
//            $('#quickLink01').attr('class', 'current');
//        } else if (panel.attr('id') == 'quickLink02') {
//            $('#quickLink02').attr('class', 'current');
//        } else if (panel.attr('id') == 'quickLink03') {
//            $('#quickLink03').attr('class', 'current');
//        } else if (panel.attr('id') == 'quickLink04') {
//            $('#quickLink04').attr('class', 'current');
//        } else if (panel.attr('id') == 'quickLink05') {
//            $('#quickLink05').attr('class', 'current');
//        } else if (panel.attr('id') == 'quickLink06') {
//            $('#quickLink06').attr('class', 'current');
//        } else if (panel.attr('class') == 'bannerDescription') {
//            $('.bannerDescription').attr('class', 'bannerDescription current');
//        };
//
//        panel.find('.quickDropDown').css({ 'display': 'block' }).addClass('current');
//		panel.find('.shareDropDown').css({ 'display': 'block' }).addClass('current');
//        panel.find('a').addClass('current');
//        $("#quickLinksContainer").addClass("hover");
//
//        // POSITION DROPDOWN CONTAINERS
//
//        var panelOffset = $('.quickDropDown.current').outerHeight();
//        $('.quickDropDown.current').css('top', '-' + panelOffset + 'px');
//    };
//
//
//    function closePanel(panel) {
//			panel.find('.quickDropDown').css({ 'display': 'none' }).removeClass('current');
//			panel.find('.shareDropDown').css({ 'display': 'none' }).removeClass('current');
//			panel.find('a').removeClass('current');
//			panel.removeClass('current');
//			$("#quickLinksContainer").removeClass("hover");
//    };
//
//    function closeAllPanels() {
//        if (Modernizr.mq('only screen and (min-width: 992px)')) {
//            var el = $('#quickLinksAdvanced > ul > li, .bannerDescription');
//            el.find('.quickDropDown').hide().removeClass('current');
//            el.removeClass('current');
//            el.find('a.current').removeClass('current');
//            $("#quickLinksContainer").removeClass("hover");
//         }
//    }
//
//
//    function panelActions() {
//
//        if (!panelActionsSetup) {
//
//            $('.mainQuickLink').removeClass('quickMainAccordOpen');
//            $('.quickAccordTrigger').removeClass('quickAccordOpen');
//            $('.quickDropDown .myZone > *:first-child').unbind();
//
//            $.each(panels, function (index, panel) {
//
//                panel.unbind("mouseenter");
//                panel.unbind("mouseleave");
//                panel.unbind("click");
//                panel.children('.mainQuickLink:first').unbind('click');
//
//                if (!isTouch) {
//
//                    panel.mouseenter(function () {
//                        $.openTimer = setTimeout(function () { openPanel(panel) }, 250);
//                    });
//
//                    panel.mouseleave(function () {
//                        clearTimeout($.openTimer);
//                        $.closeTimer = setTimeout(function () { closePanel(panel) }, 250);
//                    });
//
//                }
//
//                if (isTouch) {
//
//                    panel.children('.mainQuickLink:first').click(function (event) {
//                        event.preventDefault();
//                        if ($(this).parent().hasClass('current')) {
//                            closeAllPanels();
//                        } else {
//                            closeAllPanels();
//                            openPanel(panel);
//                        }
//                    })
//                } else {
//                    panel.children('.mainQuickLink:first').unbind('click');
//                }
//
//                panel.find('.quickLinksClose a').click(function (event) {
//                    event.preventDefault();
//                    closeAllPanels();
//                });
//
//                if (!isTouch && Modernizr.mq('only screen and (min-width: 992px)')) {
//
//                    // Tabbing
//                    panel.focusin(function () {
//                        $.openTimer = setTimeout(function () { openPanel(panel) }, 250);
//                    }).focusout(function () {
//                        clearTimeout($.openTimer);
//                        $.closeTimer = setTimeout(function () { closePanel(panel) }, 250);
//                    });
//
//                }
//
//            });
//
//            panelActionsSetup = true;
//        }
//    }
//
//    function panelAccordions() {
//
//        var quickMainTrigger = $('.mainQuickLink');
//        var quickMainContent = $('.quickDropDown');
//        var quickTrigger = $('.quickAccordTrigger');
//        var quickContent = $('.quickAccordContent');
//
//        if (!mobileAccordSetup) {
//
//            // unbind panel actions
//            $.each(panels, function (index, panel) {
//                panel.unbind("mouseenter");
//                panel.unbind("mouseleave");
//                panel.unbind("click");
//                panel.children('.mainQuickLink:first').unbind('click');
//            });
//            $('.quickLinksClose a').unbind('click');
//
//            // MAIN QUICKLINK CLICK FUNCTION (LVL 1)
//
//			quickMainTrigger.not('#quickLink03 .mainQuickLink').click(function (event) {
//				event.preventDefault();
//
//				if ($(this).hasClass('quickMainAccordOpen')) {
//					$(this).siblings('.quickDropDown').slideUp();
//					$(this).removeClass('quickMainAccordOpen');
//				} else {
//					quickMainTrigger.removeClass('quickMainAccordOpen');
//					$(this).addClass('quickMainAccordOpen');
//					quickMainContent.slideUp();
//					$(this).siblings('.quickDropDown').slideDown();
//				}
//			});
//
//            // MY ZONE FIRST CHILD CLICK FUNCTION (LVL 2)
//
//            quickTrigger.click(function (event) {
//                event.preventDefault();
//                if ($(this).hasClass('quickAccordOpen')) {
//                    $(this).next().slideUp();
//                    $(this).removeClass('quickAccordOpen');
//                } else {
//                    quickTrigger.removeClass('quickAccordOpen');
//                    $(this).addClass('quickAccordOpen');
//                    quickContent.slideUp();
//                    $(this).next().slideDown();
//                }
//            });
//
//            mobileAccordSetup = true;
//        }
//
//    }
//
//    function infoPanelActions() {
//
//		$.each(panels, function (index, panel) {
//
//		    if (isTouch || Modernizr.mq('only screen and (max-width: 991px)')) {
//		        panel.children('.info').click(function (event) {
//		            event.preventDefault();
//		            if ($(this).parent().hasClass('current')) {
//		                closePanel(panel);
//		            } else {
//		                openPanel(panel);
//		            }
//		        })
//		    } 
//		});
//    }
//
//    function sharePanelActions() {
//
//        $.each(panels, function (index, panel) {
//
//            if (isTouch) {
//                panel.children('.ShareLink').click(function (event) {
//                    event.preventDefault();
//                    if ($(this).hasClass('current')) {
//                        closePanel(panel);
//                    } else {
//                        openPanel(panel);
//                    }
//                })
//            }
//
//        });
//    }
//
//    function panelMediaQueries() {
//		if (Modernizr.mq('only screen and (min-width: 992px)')) {
//			panelActions();
//			mobileAccordSetup = false;
//		}
//		if (Modernizr.mq('only screen and (max-width: 991px)')) {
//			if ($('.homepage').length > 0) {
//				panelAccordions();
//				panelActionsSetup = false;
//				infoPanelActions();
//			} else {
//				panelActions();
//				mobileAccordSetup = false;
//				infoPanelActions();
//			}
//		}
//    }
//
//
//
//    panelMediaQueries();
//    sharePanelActions();
//
//
//    // resets quicklinks on orientaiton change for tablets
//    $(window).on("orientationchange", function () {
//        closeAllPanels();
//        panelMediaQueries();
//    });
//
//    $(window).on("resize", function () {
//        closeAllPanels();
//        panelMediaQueries();
//    });
//
//
//    // function controls the jump from dropdown button, to dropdown content
//    $.each(dropdowns, function (index, dropdown) {
//
//        dropdown.mouseenter(function () {
//            $.keepDropdownOpen = true;
//            clearTimeout($.closeTimer);
//        });
//
//        dropdown.mouseleave(function () {
//            $.keepDropdownOpen = false;
//            $.closeTimer = setTimeout(function () { closePanel(dropdown) }, 250);
//        });
//
//        //tabbing
//
//        dropdown.focusin(function () {
//            $.keepDropdownOpen = true;
//            clearTimeout($.closeTimer);
//        }).focusout(function () {
//            $.keepDropdownOpen = false;
//            $.closeTimer = setTimeout(function () { closePanel(dropdown) }, 250);
//        });
//
//
//    });

});