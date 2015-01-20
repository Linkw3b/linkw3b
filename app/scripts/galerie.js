jQuery(function() {
    var clickableElement = jQuery('.js-magnify-icon, #close-galery');
    var overlay = 'overlay';
    var popin = 'popin-galery';

    jQuery('body').on('click', clickableElement, function(event) {
        if(jQuery(event.target).is('#close-galery') || jQuery(event.target).is('#overlay')) {
            jQuery('#'+overlay).remove();
            jQuery('#'+popin).remove();
            jQuery('body').removeAttr('style');
        } else if(jQuery(event.target).is('.js-magnify-icon')) {
            var title = jQuery(event.target).parent().parent().attr('data-title');
            var thumbSrc = jQuery(event.target).parent().parent().attr('data-src');
            var imgSrc = thumbSrc.replace("thumb/", "");
            jQuery('body').css({'overflow': 'hidden'});
            var galeryHtml = '<div id="'+overlay+'" class="overlay"></div><div id="'+popin+'" class="galery-popin"><span class="close-icon" id="close-galery"></span><h2>'+title+'</h2><div class="imgContainer"><img alt="" src="'+imgSrc+'"></div></div>';
            jQuery('body').append(galeryHtml);
        }
    });
});