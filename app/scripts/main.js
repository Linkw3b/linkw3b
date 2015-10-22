jQuery(function() {
    /* Init var */
    var header = 'header',
        main_nav_id = 'main-nav',
        nav_icon_id = 'nav-icon',
        nav_links_class = 'js-nav-link',
        nav_expanded_class = 'js-expanded',
        lazy_display_elements = jQuery('.js-lazy-display'),
        lazy_displayed_class = 'js-displayed',
        ripple_elements = '.button, .portfolio-overlay, .nav-link, .footer-link';

    /* Listeners */
    jQuery(document).on('scroll', { elem: jQuery('#'+header) }, headerFixed);

    jQuery(window).on('resize', function() {
        var nav = jQuery("#"+header).next();
        if(nav.hasClass(nav_expanded_class)) {
            var scroll = jQuery(document).scrollTop();
            var top = jQuery('body').css('top');
            toggleNav(nav, scroll, top, header, main_nav_id, nav_expanded_class);
        }
        updateElementsDisplayed(lazy_display_elements, lazy_displayed_class)
    });

    jQuery('#'+nav_icon_id+', .'+nav_links_class).on('click', function(event) {
        if(jQuery(event.target).is('#'+nav_icon_id) || jQuery("#"+header).next().hasClass(nav_expanded_class)) {
            var nav = jQuery(event.currentTarget).parents('#'+header).next();
            var scroll = jQuery(document).scrollTop();
            var top = jQuery('body').css('top');
            toggleNav(nav, scroll, top, header, main_nav_id, nav_expanded_class);
        }
    });

    jQuery(ripple_elements).on('click', function(event) {
        rippleEffect(this, event);
    });

    updateElementsDisplayed(lazy_display_elements, lazy_displayed_class);

    jQuery(document).on('scroll', function(event) {
        updateElementsDisplayed(lazy_display_elements, lazy_displayed_class)
    });
});

function headerFixed(event) {
    if(jQuery(document).scrollTop() > 100) {
        event.data.elem.addClass('fixed');
    } else {
        event.data.elem.removeClass('fixed');
    }
}

function toggleNav(nav, scroll, top, header, main_nav_id, nav_expanded_class) {
    if(nav.hasClass(nav_expanded_class)) {
        jQuery('#'+main_nav_id).animate({left: '-80%'});
        jQuery('body, #'+header).animate({left: '0'}, function() {
            var scrollBody = -parseInt(top.split('px')[0]);
            jQuery('body').css({position: '', top: '', left: ''})
            jQuery(document).scrollTop(scrollBody);
        });
    } else {
        jQuery('body').css({position: 'fixed', top: -scroll});
        jQuery('body, #'+header).animate({left: '80%'});
        jQuery('#'+main_nav_id).animate({left: '0'});
    }
    nav.toggleClass(nav_expanded_class);
}

function rippleEffect(elem, event) {
    var parent,
        ripple,
        d,
        x,
        y;

    parent = jQuery(elem);

    if(parent.find(".js-ripple").length == 0) {
        parent.prepend("<span class='js-ripple ripple'></span>");
    }

    ripple = parent.find(".js-ripple");
    ripple.removeClass("animate");

    if(!ripple.height() && !ripple.width()) {
        d = Math.max(parent.outerWidth(), parent.outerHeight());
        ripple.css({height: d, width: d});
    }

    x = event.pageX - parent.offset().left - ripple.width()/2;
    y = event.pageY - parent.offset().top - ripple.height()/2;

    ripple.css({top: y+'px', left: x+'px'}).addClass("animate");
}

function updateElementsDisplayed(lazy_display_elements, lazy_displayed_class) {
    var elements = new Array();
    jQuery.each(lazy_display_elements, function(index, elem) {
        if(!jQuery(elem).hasClass(lazy_displayed_class)) {
            if(isElementToDisplay(elem)) {
                elements.push(elem);
            }
        }
    });
    jQuery.each(elements, function(index, elem) {
        var duration = index*100;
        jQuery(elem).delay(duration).queue(function() {
            displayElement(jQuery(elem), lazy_displayed_class);
            jQuery(elem).addClass(lazy_displayed_class).dequeue();
        });
    });
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