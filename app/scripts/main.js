jQuery(function() {
    /* Init var */
    var header = jQuery('header'),
        filterContainerClass = "filters",
        filterClass = "filter-button",
        hash = window.location.hash;


    /* Init function */
    if(hash.length > 0) {
        hash = hash.substring(1);
        hashtag = hash.split('-');
        if(hashtag.length > 1) {
            updateFilters(jQuery('.'+filterContainerClass+' .'+filterClass+'[data-src="'+hashtag[1]+'"]'), filterContainerClass, filterClass);
        } else {
            updateFilters(jQuery('.'+filterContainerClass+' .'+filterClass+'[data-src="'+hashtag[1]+'"]'), filterContainerClass, filterClass);
        }
    }

    /* Listeners */
    jQuery(document).on('scroll', { elem: header }, headerFixed);

    jQuery('#nav-icon').on('click', function(event) {
        var nav = jQuery(event.currentTarget).parent().next();
        var scroll = jQuery(document).scrollTop();
        var top = jQuery('body').css('top');
        if(nav.hasClass('expanded')) {
            jQuery('#main-nav').animate({left: '-80%'});
            jQuery('body, #header').animate({left: '0'}, function() {
                var scrollBody = -parseInt(top.split('px')[0]);
                jQuery('body').css({position: '', top: '', left: ''})
                jQuery(document).scrollTop(scrollBody);
            });
        } else {
            jQuery('body').css({position: 'fixed', top: -scroll});
            jQuery('body, #header').animate({left: '80%'});
            jQuery('#main-nav').animate({left: '0'});
        }
        nav.toggleClass('expanded');
    });

    jQuery('.filters').on('click', '.filter-button, .filter-title', function(event) {
        updateFilters(jQuery(event.currentTarget), filterContainerClass, filterClass);
    });
});

function headerFixed(event) {
    if(jQuery(document).scrollTop() > 100) {
        event.data.elem.addClass('fixed');
    } else {
        event.data.elem.removeClass('fixed');
    }
}

function updateFilters(elem, filterContainerClass, filterClass) {
    if(elem.hasClass('filter-title')) {
        elem = elem.prev();
    }
    jQuery(elem).toggleClass('active');
    jQuery('.'+filterContainerClass).next().find('.'+elem.attr('data-src')).animate({width: 'toggle'});

    updateHash(filterContainerClass, filterClass);
}

function updateHash(filterContainerClass, filterClass) {
    var nbFilterActive = jQuery('.'+filterContainerClass+' .'+filterClass+'.active').length;

    if(nbFilterActive > 0 && jQuery('#no-results').length) {
        jQuery('#no-results').remove();
    }

    switch (nbFilterActive) {
        case 3:
            var scr = jQuery(document).scrollTop();
            window.location.hash = "";
            jQuery(document).scrollTop(scr);

            break;
        case 2:
            window.location.hash = "#no-"+jQuery('.'+filterContainerClass+' .'+filterClass+':not(.active)').attr('data-src');
            break;
        case 1:
            window.location.hash = "#"+jQuery('.'+filterContainerClass+' .'+filterClass+'.active').attr('data-src');
            break;
        case 0:
            window.location.hash = "";
            jQuery('.filters').next().after('<p id="no-results" class="no-results">Merci d\'activer au moins un filtre pour avoir des résultats :)</p>');
            break;
        default:
            window.location.hash = "";
            jQuery('.filters').next().after('<p id="no-results" class="no-results">Oups ! Serait-ce un bug ? Pouvez-vous m\'en avertir via le <a href="contact.html">formulaire de contact</a> ?</p>');
            break;
    }
}
