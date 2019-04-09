(function ($) {

    $.fn.rotating_EmergencyAlertBanners = function (p) {
        var p = p || {};

        var _timerLength = p && (p.timerLength != null) ? p.timerLength : 4000,
		    _enableTimer = p && (p.enableTimer != null) ? p.enableTimer : true,
		    _transitionLength = p && (p.transitionLength != null) ? p.transitionLength : 100,
		    _transitionType = p && (p.transitionType != null) ? p.transitionType : "fade",
		    _bannerClass = p && (p.bannerClass != null) ? p.bannerClass : "alertbanner",
		    _navButtonClass = p && (p.navButtonClass != null) ? p.navButtonClass : "navButton",
		    _navButtonsOnly = p && (p.navButtonsOnly != null) ? p.navButtonsOnly : false,
            _navArrowsOnly = p && (p.navArrowsOnly != null) ? p.navArrowsOnly : false,
			_alternativeNav = p && (p.alternativeNav != null) ? p.alternativeNav : {},
		    _maxBanners = p && (p.maxBanners != null) ? p.maxBanners : 5,
            _enablePause = p && (p.enablePause != null) ? p.enablePause : true;

        var enableEdit = false;
        if (!enableEdit) {
            var bannerContainer = $(this),
				editContainer = bannerContainer.children(".alertbannerEdit:first"),
				icreateContainer = "",
				blankContainer = editContainer.clone().removeClass(_bannerClass + "Edit");

            // DOM elements
            var banners = bannerContainer.children("." + _bannerClass),
				anchorTag = $(document.createElement("a")).attr("href", "#"),
				navLeft = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "NavLeft").append(anchorTag.clone().attr("title", "Previous Alert").append("Previous")).addClass("alertNavLeft"),
				navPause = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "NavPause").append(anchorTag.clone().attr("title", "Pause Alert").append("Pause")).addClass("alertNavPause"),
                navButtonsContainer = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "NavButtons").addClass("bannerNavButtons"),
				navRight = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "NavRight").append(anchorTag.clone().attr("title", "Next Alert").append("Next")).addClass("alertNavRight"),
				navContainer = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "Nav").addClass("alertNav"),
				ctrContainer = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "Controls").addClass("bannerControls");

            // instance variables
            var timerIndex = false,
		    previousIndex = 0,
		    currentIndex = 0,
		    maxIndex,
		    navText = "Go to ",
		    isEditMode = false,
            imageDimensions = [],
            images = [];

            var _animations = null;
            if (banners.length > 0) {

                _initialize();

            }
        }
       
        function _initialize() {

            maxIndex = banners.length - 1;

            if (banners.length > 1) {
                // default to first if no default image is set
                if (bannerContainer.children(".default").length <= 0) {
                    bannerContainer.children("." + _bannerClass + ":first").addClass("default");
                }

                // build navigation buttons
                banners.each(function (index) {
                    $(this).css({ "position": "relative"/*, "top": "0"*/ });

                });

                if (_navArrowsOnly) {
                    // bind onclick events
                    navLeft.click(function (event) {
                        event.preventDefault();
                        _navLeftClick(this);
                    });
                    navRight.click(function (event) {
                        event.preventDefault();
                        _navRightClick(this);
                    });
                    navPause.click(function (event) {
                        event.preventDefault();
                        if ($(".alertNavPause a").hasClass("paused")) {
                            $(".alertNavPause a").removeClass("paused");
                            $(".alertNavPause a").attr("title", "Pause Alert");
                            startControls();
                        }
                        else {
                            if (_animations != null) {
                                _cancelAnimations();
                            }
                            $(".alertNavPause a").addClass("paused");
                            $(".alertNavPause a").attr("title", "Play Banner");
                            stopControls();
                        }
                    });


                    if (_alternativeNav.previous && $("#" + _alternativeNav.previous).length > 0) {
                        $("#" + _alternativeNav.previous).html(navLeft).show();
                    } else {
                        navContainer.prepend(navLeft);
                    }
                    if (_enablePause) {
                        if (_alternativeNav.pause && $("#" + _alternativeNav.pause).length > 0) {
                            $("#" + _alternativeNav.pause).html(navPause).show();
                        }
                        else {
                            navContainer.append(navPause);
                        }
                    }
                    if (_alternativeNav.next && $("#" + _alternativeNav.next).length > 0) {
                        $("#" + _alternativeNav.next).html(navRight).show();
                    } else {
                        navContainer.append(navRight);
                    }

                    bannerContainer.prepend(navContainer);

                    // set navContainer width
                    navContainer.width(navButtonsContainer.parent().children(":first").outerWidth() + navButtonsContainer.parent().children(":last").outerWidth());
                }
                else {
                    // bind onclick events
                    navLeft.click(function (event) {
                        event.preventDefault();
                        _navLeftClick(this);
                    });
                    navRight.click(function (event) {
                        event.preventDefault();
                        _navRightClick(this);
                    });
                    navPause.click(function (event) {
                        event.preventDefault();
                        if ($(".alertNavPause a").hasClass("paused")) {
                            $(".alertNavPause a").removeClass("paused");
                            $(".alertNavPause a").attr("title", "Pause Alert");
                            startControls();
                        }
                        else {
                            if (_animations != null) {
                                _cancelAnimations();
                            }
                            $(".alertNavPause a").addClass("paused");
                            $(".alertNavPause a").attr("title", "Play Alert");
                            stopControls();
                        }
                    });

                    navContainer.append(navButtonsContainer);
                    if (_alternativeNav.previous && $("#" + _alternativeNav.previous).length > 0) {
                        $("#" + _alternativeNav.previous).html(navLeft).show();
                    } else {
                        navContainer.prepend(navLeft);
                    }
                    if (_enablePause) {
                        if (_alternativeNav.pause && $("#" + _alternativeNav.pause).length > 0) {
                            $("#" + _alternativeNav.pause).html(navPause).show();
                        }
                        else {
                            navContainer.append(navPause);
                        }
                    }
                    if (_alternativeNav.next && $("#" + _alternativeNav.next).length > 0) {
                        $("#" + _alternativeNav.next).html(navRight).show();
                    } else {
                        navContainer.append(navRight);
                    }

                    bannerContainer.prepend(navContainer);

                    // set navContainer width
                    navContainer.width(navButtonsContainer.parent().children(":first").outerWidth() + (navButtonsContainer.children(":first").outerWidth() * banners.length) + navButtonsContainer.parent().children(":last").outerWidth());
                }



                // start timer
                startTimer();
            }
        }



        function pausecomp(ms) {
            ms += new Date().getTime();
            while (new Date() < ms) { }
        }

        function resetElements() {
            $(navContainer).remove();
            $(ctrContainer).remove();
            bannerContainer.children("." + _bannerClass).each(function () { $(this).remove() });
            bannerContainer.append(icreateContainer.children("." + _bannerClass).clone());

            banners = bannerContainer.children("." + _bannerClass),
		        anchorTag = $(document.createElement("a")).attr("href", "#"),
		        navLeft = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "NavLeft").append(anchorTag.clone().attr("title", "Previous Alert").append("Previous")).addClass("alertNavLeft"),
		        navButtonsContainer = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "NavButtons").addClass("bannerNavButtons"),
		        navRight = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "NavRight").append(anchorTag.clone().attr("title", "Next Alert").append("Next")).addClass("alertNavRight"),
		        navContainer = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "Nav").addClass("alertNav"),
		        ctrContainer = $(document.createElement("div")).attr("id", bannerContainer.attr("id") + "Controls").addClass("bannerControls");
        }

        function toggleAlternativeNav(isHide) {
            if (_alternativeNav.previous && $("#" + _alternativeNav.previous).length > 0) {
                isHide ? $("#" + _alternativeNav.previous).hide() : $("#" + _alternativeNav.previous).show();
            }
            if (_alternativeNav.next && $("#" + _alternativeNav.next).length > 0) {
                isHide ? $("#" + _alternativeNav.next).hide() : $("#" + _alternativeNav.next).show();
            }
            if (_alternativeNav.pause && $("#" + _alternativeNav.pause).length > 0) {
                isHide ? $("#" + _alternativeNav.pause).hide() : $("#" + _alternativeNav.pause).show();
            }
        }


        function _removeAnimation(animation) {
            var pos = $.inArray(animation, _animations);

            if (pos >= 0) {
                _animations.splice(pos, 1);
            }
        }

        function _cancelAnimations() {
            $.each(_animations, function (index, animation) {
                animation.stop(true, true);
            });

            _animations = null;
        }

        function _navLeftClick(button) {
            if (_animations != null) {
                _cancelAnimations();
            }
            previousIndex = currentIndex;
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = maxIndex < 0 ? 0 : maxIndex;
            }
            toggleBanner(true);
        }

        function _navButtonClick(button) {
            if (_animations != null) {
                _cancelAnimations();
            }
            previousIndex = currentIndex;
            currentIndex = button.index;
            toggleBanner();
        }

        function _navRightClick(button) {
            if (_animations != null) {
                _cancelAnimations();
            }
            previousIndex = currentIndex;
            currentIndex++;
            if (currentIndex > maxIndex) {
                currentIndex = 0;
            }
            toggleBanner(false);
        }

        function _timerHandler() {
            if (_animations != null) {
                _cancelAnimations();
            }
            previousIndex = currentIndex;
            currentIndex++;
            if (currentIndex > maxIndex) {
                currentIndex = 0;
            }
            toggleBanner(false);
        }

        function toggleBanner(reverse) {
            if (previousIndex != currentIndex) {
                // stop any reqired controls
                stopControls();

                // set selected nav button
                var navButtons = $(navButtonsContainer.children("." + _navButtonClass));
                $(navButtons[previousIndex]).children("a").removeClass("selected");
                $(navButtons[currentIndex]).children("a").addClass("selected");

                // animate rotating banner
                if (_transitionType == "slide") {
                    reverse = reverse != null ? reverse : previousIndex > currentIndex;
                    var previousBanner = $(banners[previousIndex]),
						currentBanner = $(banners[currentIndex]);

                    _animations = [previousBanner, currentBanner];

                    previousBanner.stop(true, true).hide("slide", { direction: reverse ? "right" : "left" }, _transitionLength, function () {
                        _removeAnimation(previousBanner);
                    });
                    currentBanner.stop(true, true).show("slide", { direction: reverse ? "left" : "right" }, _transitionLength, function () {
                        _removeAnimation(currentBanner);

                        startControls();
                    });
                }
                else {

                    var previousBanner = $(banners[previousIndex]),
						currentBanner = $(banners[currentIndex]);

                    _animations = [previousBanner, currentBanner];

                    previousBanner.stop(true, true).fadeOut(_transitionLength / 4, function () {
                        _removeAnimation(previousBanner);
                    });
                    currentBanner.stop(true, true).fadeIn(_transitionLength * 2, function () {
                        // if previously paused then don't auto start
                        if (!$(".alertNavPause a").hasClass("paused")) {
                            _removeAnimation(currentBanner);

                            startControls();
                        }
                    });

                }
            }
        }

        function stopControls() {
            stopTimer();
        }

        function startControls() {
            startTimer();
            $(banners[previousIndex]).removeClass("default");
            $(banners[currentIndex]).addClass("default");
            _animations = null;
        }

        function stopTimer() {
            if ((_enableTimer) && (!enableEdit)) {
                clearTimeout(timerIndex); // stop timer
            }
        }

        function startTimer() {
            if ((_enableTimer) && (!enableEdit) && (banners.length > 0)) {
                timerIndex = setTimeout(_timerHandler, _timerLength); // reset timer
            }
        }
    };

})(jQuery);
