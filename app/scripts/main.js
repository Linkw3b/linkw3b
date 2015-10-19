jQuery(function() {
    /* Init var */
    var header = 'header',
        main_nav_id = 'main-nav',
        nav_icon_id = 'nav-icon',
        nav_links_class = 'js-nav-link';

    /* Listeners */
    jQuery(document).on('scroll', { elem: jQuery('#'+header) }, headerFixed);

    jQuery('#'+nav_icon_id+', .'+nav_links_class).on('click', function(event) {
        var nav = jQuery(event.currentTarget).parent().next();
        var scroll = jQuery(document).scrollTop();
        var top = jQuery('body').css('top');
        if(nav.hasClass('expanded')) {
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
        nav.toggleClass('expanded');
    });
});

function headerFixed(event) {
    if(jQuery(document).scrollTop() > 100) {
        event.data.elem.addClass('fixed');
    } else {
        event.data.elem.removeClass('fixed');
    }
}