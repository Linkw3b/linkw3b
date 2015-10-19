jQuery(function() {
    /* Init var */
    var header = 'header',
        main_nav_id = 'main-nav',
        nav_icon_id = 'nav-icon',
        nav_links_class = 'js-nav-link';

    /* Listeners */
    jQuery(document).on('scroll', { elem: jQuery('#'+header) }, headerFixed);

    jQuery(window).on('resize', function() {
        var nav = jQuery("#"+header).next();
        if(nav.hasClass('js-expanded')) {
            var scroll = jQuery(document).scrollTop();
            var top = jQuery('body').css('top');
            toggleNav(nav, scroll, top, header, main_nav_id);
        }
    });

    jQuery('#'+nav_icon_id+', .'+nav_links_class).on('click', function(event) {
        var nav = jQuery(event.currentTarget).parents('#'+header).next();
        var scroll = jQuery(document).scrollTop();
        var top = jQuery('body').css('top');
        toggleNav(nav, scroll, top, header, main_nav_id);
    });
});

function headerFixed(event) {
    if(jQuery(document).scrollTop() > 100) {
        event.data.elem.addClass('fixed');
    } else {
        event.data.elem.removeClass('fixed');
    }
}

function toggleNav(nav, scroll, top, header, main_nav_id) {
    if(nav.hasClass('js-expanded')) {
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
    nav.toggleClass('js-expanded');
}