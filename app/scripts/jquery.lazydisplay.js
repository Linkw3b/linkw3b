var LazyDisplay = function(lazy_display_elements, lazy_displayed_class, hide_elements_showed) {
    hide_elements_showed = typeof hide_elements_showed !== 'undefined' ? hide_elements_showed : false;

    jQuery(window).on('resize, scroll', function() {
        updateElementsDisplayed(lazy_display_elements, lazy_displayed_class)
    });

    updateElementsDisplayed(lazy_display_elements, lazy_displayed_class);

    function updateElementsDisplayed(lazy_display_elements, lazy_displayed_class) {
        var elements_to_display = new Array();
        var elements_to_hide = new Array();
        jQuery.each(jQuery('.'+lazy_display_elements), function(index, elem) {
            if(jQuery(elem).hasClass(lazy_displayed_class)) {
                if(!isElementToDisplay(elem)) {
                    elements_to_hide.push(elem);
                }
            } else {
                if(isElementToDisplay(elem)) {
                    elements_to_display.push(elem);
                }
            }
        });
        jQuery.each(elements_to_display, function(index, elem) {
            var duration = index*100;
            jQuery(elem).delay(duration).queue(function() {
                displayElement(jQuery(elem), lazy_displayed_class);
                jQuery(elem).addClass(lazy_displayed_class).dequeue();
            });
        });
        if(hide_elements_showed) {
            jQuery.each(elements_to_hide, function(index, elem) {
                var duration = index*100;
                jQuery(elem).delay(duration).queue(function() {
                    hideElement(jQuery(elem), lazy_displayed_class);
                    jQuery(elem).removeClass(lazy_displayed_class).dequeue();
                });
            });
        }
    }

    function isElementToDisplay(elem) {
        var screenHeight = jQuery(window).height();
        var screenWidth = jQuery(window).width();
        var scrollPosition = jQuery(window).scrollTop();
        var windowCoords = getCoords(window);
        var elemCoords = getCornersCoords(elem);
        var elemInScreen = false;


        jQuery.each(elemCoords, function(index, corner) {
            if( corner.x >= windowCoords.left &&
                corner.x <= windowCoords.width &&
                corner.y >= windowCoords.top &&
                corner.y <= windowCoords.height)
            {
                elemInScreen = true;
            }
        });

        return elemInScreen
    }

    function getCoords(element) {
        var elem = jQuery(element);
        var elemHeight = elem.height();
        var elemWidth = elem.width();
        var scrollPosition = jQuery(window).scrollTop();
        var elemPosition = {
            'top': 0,
            'left': 0
        }
        if(!jQuery.isWindow(element)) {
            elemPosition = elem.offset();
        } else {
            scrollPosition = 0;
        }
        var elemCoords = {
            'top': elemPosition.top - scrollPosition,
            'width': elemPosition.left + elemWidth,
            'height': elemPosition.top + elemHeight - scrollPosition,
            'left': elemPosition.left
        };
        return elemCoords;
    }

    function getCornersCoords(element) {
        var elem = jQuery(element);
        var elemHeight = elem.height();
        var elemWidth = elem.width();
        var scrollPosition = jQuery(window).scrollTop();
        var elemPosition = {
            'top': 0,
            'left': 0
        }
        if(!jQuery.isWindow(element)) {
            elemPosition = elem.offset();
        } else {
            scrollPosition = 0;
        }
        var elemCoords = {
            'cornerTopLeft': {
                'x': elemPosition.left,
                'y': elemPosition.top-scrollPosition
            },
            'cornerTopRight': {
                'x': elemPosition.left + elemWidth,
                'y': elemPosition.top - scrollPosition
            },
            'cornerBottomLeft': {
                'x': elemPosition.left,
                'y': elemPosition.top + elemHeight - scrollPosition
            },
            'cornerBottomRight': {
                'x': elemPosition.left + elemWidth,
                'y': elemPosition.top + elemHeight - scrollPosition
            }
        };
        return elemCoords;
    }

    function displayElement(elem, displayedClass) {
        elem.css({
            'top': '0',
            'opacity': '1'
        });
    }

    function hideElement(elem, displayedClass) {
        elem.css({
            'top': '30px',
            'opacity': '0'
        });
    }
}