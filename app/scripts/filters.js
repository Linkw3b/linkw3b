jQuery(function() {
    /* Init var */
    var filterContainerClass = "filters",
        filterClass = "filter-button",
        hash = window.location.hash;

    /* Init function */
    if(hash.length > 0) {
        hash = hash.substring(1);
        hashtag = hash.split('-');
        if(hashtag.length > 1) {
            updateList(jQuery('.'+filterContainerClass+' .'+filterClass+'[data-src="'+hashtag[1]+'"]'), filterContainerClass, filterClass);
        } else {
            updateList(jQuery('.'+filterContainerClass+' .'+filterClass+'[data-src="'+hashtag[1]+'"]'), filterContainerClass, filterClass);
        }
    }

    /* Listeners */
    jQuery('.filters').on('click', '.filter-button, .filter-title', function(event) {
        updateList(jQuery(event.currentTarget), filterContainerClass, filterClass);
    });
});

/* Update Elements List relative to filters */
function updateList(elem, filterContainerClass, filterClass) {
    if(elem.hasClass('filter-title')) {
        elem = elem.prev();
    }
    jQuery(elem).toggleClass('active');
    jQuery('.'+filterContainerClass).next().find('.'+elem.attr('data-src')).animate({width: 'toggle'}, function() {
        jQuery(document).trigger('scroll');
    });

    updateHash(filterContainerClass, filterClass);
}

/* Update Url hash relative to filters */
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
            jQuery('.filters').next().after('<p id="no-results" class="no-results js-lazy-display">Merci d\'activer au moins un filtre pour avoir des résultats :)</p>');
            break;
        default:
            window.location.hash = "";
            jQuery('.filters').next().after('<p id="no-results" class="no-results js-lazy-display">Oups ! Serait-ce un bug ? Pouvez-vous m\'en avertir via le <a href="contact.html">formulaire de contact</a> ?</p>');
            break;
    }
}