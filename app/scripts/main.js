jQuery(function() {
    /* Init var */
    var header = jQuery('header'),
        filterContainerClass = "filters",
        filterClass = "filter-button",
        hash = window.location.hash,
        kKeys = [];
        kIsActive = false;

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

    jQuery(document).keydown(function(e) {
        if(!kIsActive) {
            kKeys.push(e.keyCode);
            if (kKeys.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0) {
                kIsActive = true;
                swal({
                    title: 'Yeah !',
                    text: 'You found the master sword !',
                    imageUrl: 'http://33.media.tumblr.com/ce4ab7dc0c67ea939bf31474e1194049/tumblr_molwleAEbi1s70w2zo1_400.gif',
                    showCancelButton: true,
                    confirmButtonColor: '#7bc98e',
                    confirmButtonText: 'I\'ll take it !',
                    cancelButtonText: 'Naaaaah !',
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm) {
                    if(isConfirm) {
                        swal({
                            title: 'You are a hero',
                            text: 'Go save Hyrule and the Princess !',
                            //imageUrl: 'http://31.media.tumblr.com/00a520e00747a6d60c8aaee03ec4ef58/tumblr_mqik7oCCiv1qzqwamo1_1280.gif',
                            imageUrl: 'http://cdn.wikimg.net/strategywiki/images/d/d6/Zelda_ALttP_Link.gif',
                            confirmButtonColor: '#7bc98e',
                            confirmButtonText: 'Okay'
                        }, function() {
                            kIsActive = false;
                            kKeys = [];
                        });
                    } else {
                        swal({
                            title: 'Hyrule is on fire :(',
                            text: 'You have failed !',
                            imageUrl: 'http://archer.gamebanana.com/img/ico/sprays/zelda_fire_render.gif',
                            confirmButtonColor: '#7bc98e',
                            confirmButtonText: 'I\'m ashamed'
                        }, function() {
                            kIsActive = false;
                            kKeys = [];
                        });
                    }
                });
            }
        }
    });

    /* Listeners */
    jQuery(document).on('scroll', { elem: jQuery(header) }, headerFixed);

    jQuery('#nav-icon').on('click', function(event) {
        var nav = jQuery(event.currentTarget).parent().next();
        var scroll = jQuery('body').scrollTop();
        var top = jQuery('body').css('top');
        if(nav.hasClass('expanded')) {
            jQuery('#main-nav').animate({left: '-80%'});
            jQuery('body, #header').animate({left: '0'}, function() {
                var scrollBody = -parseInt(top.split('px')[0]);
                jQuery('body').css({position: '', top: '', left: ''}).scrollTop(scrollBody);
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
    if(jQuery('body').scrollTop() > 100) {
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
            window.location.hash = "";
            break;
        case 2:
            window.location.hash = "#no-"+jQuery('.'+filterContainerClass+' .'+filterClass+':not(.active)').attr('data-src');
            break;
        case 1:
            window.location.hash = "#"+jQuery('.'+filterContainerClass+' .'+filterClass+'.active').attr('data-src');
            break;
        case 0:
            window.location.hash = "";
            jQuery('.filters').next().after('<p id="no-results">Plop</p>');
            break;
        default:
            window.location.hash = "";
            jQuery('.filters').next().after('<p id="no-results">Oups</p>');
            break;
    }
}
