jQuery(function() {
    var experienceClass = 'js-experience';
    var experienceBubbleClass = 'js-experience-details';
    var experienceDisplayedClass = 'js-displayed';

    updateExperienceDisplayed(experienceClass, experienceBubbleClass, experienceDisplayedClass);

    jQuery(document).on('scroll', function(event) {
        updateExperienceDisplayed(experienceClass, experienceBubbleClass, experienceDisplayedClass)
    });
});

function updateExperienceDisplayed(experienceClass, experienceBubbleClass, experienceDisplayedClass) {
    jQuery.each(jQuery('.'+experienceClass), function(index, elem) {
        if(!jQuery(elem).hasClass(experienceDisplayedClass)) {
            if(isElementToDisplay(elem, jQuery(elem).find('.'+experienceBubbleClass))) {
                displayExperience(jQuery(elem).find('.'+experienceBubbleClass), experienceDisplayedClass);
                jQuery(elem).addClass(experienceDisplayedClass);
            }
        }
    });
}

function isElementToDisplay(elem, elemToShow) {
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

function displayExperience(elem, displayedClass) {
    elem.css({
        'top': '0',
        'opacity': '1'
    });
}