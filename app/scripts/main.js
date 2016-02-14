jQuery(function() {
    /* Init var */
    var header = 'header',
        main_nav_id = 'main-nav',
        nav_icon_id = 'nav-icon',
        nav_links_class = 'js-nav-link',
        nav_expanded_class = 'js-expanded',
        progress_points = 'js-points',
        ripple_elements = '.button, .portfolio-overlay, .nav-link, .footer-link';
        lazy_display = new LazyDisplay('js-lazy-display', 'js-displayed', true);

    /* Listeners */
    jQuery(document).on('scroll', { elem: jQuery('#'+header) }, headerFixed);

    jQuery(window).on('resize', function() {
        var nav = jQuery("#"+header).next();
        if(nav.hasClass(nav_expanded_class)) {
            var scroll = jQuery(document).scrollTop();
            var top = jQuery('body').css('top');
            toggleNav(nav, scroll, top, header, main_nav_id, nav_expanded_class);
        }
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

    setInterval( function() {
        progressPoints(progress_points);
    }, 500);
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
    jQuery('#header').toggleClass(nav_expanded_class);
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

function progressPoints(elements_class) {
    jQuery.each(jQuery('.' + elements_class), function(index, elem) {
        var points = jQuery(elem).text();

        if(points.length > 2 ) {
            jQuery(elem).text('');
        } else {
            jQuery(elem).text(points + '.');
        }
    });
}