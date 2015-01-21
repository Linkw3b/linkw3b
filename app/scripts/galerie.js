jQuery(function() {
    var overlay = 'overlay';
    var popin = 'popin-galery';
    var descrClass = 'js-portfolio-descr';
    var blockClass = 'js-portfolio-block';
    var popinActive = false;
    var popinInfoContainer = "popin-container"
    var leftElem = 'left-galery';
    var rightElem = 'right-galery';
    var clickableElement = jQuery('.js-magnify-icon, #close-galery ,'+leftElem+', '+rightElem);
    var currentPicture = "";

    jQuery('body').on('click', clickableElement, function(event) {
        if(jQuery(event.target).is('#close-galery') || jQuery(event.target).is('#overlay')) {
            jQuery('#'+overlay).remove();
            jQuery('#'+popin).remove();
            jQuery('body').removeAttr('style');
            popinActive = false;
            currentPicture = "";
        } else if(jQuery(event.target).is('.js-magnify-icon')) {
            galeryHtml = '<div id="'+overlay+'" class="overlay"></div><div id="'+popin+'" class="galery-popin"><span class="close-icon" id="close-galery"></span><div class="'+popinInfoContainer+'" id="'+popinInfoContainer+'">';
            galeryHtml += getPictureInfo(jQuery(event.target).parent().parent(), descrClass);
            galeryHtml += '</div><div class="left-arrow-icon" data-direction="left" id="left-galery"></div><div class="right-arrow-icon" data-direction="right" id="right-galery"></div></div>';

            jQuery('body').css({'overflow': 'hidden'});
            jQuery('body').append(galeryHtml);

            popinActive = true;
            currentPicture = jQuery(event.target).parent().parent();
        } else if(jQuery(event.target).attr('data-direction')) {
            currentPicture = changePicture(currentPicture, blockClass, descrClass, jQuery(event.target).attr('data-direction'), popinInfoContainer);
        }
    });

    jQuery(document).keydown(function(event) {
        if(popinActive && event.keyCode == 37) {
            currentPicture = changePicture(currentPicture, blockClass, descrClass, "left", popinInfoContainer);
        } else if (popinActive && event.keyCode == 39) {
            currentPicture = changePicture(currentPicture, blockClass, descrClass, "right", popinInfoContainer);
        }
    });
});

function changePicture(currentPicture, blockClass, descrClass, direction, popinInfoContainer) {

    var nextElem = getNextElem(currentPicture, direction);

    var nextElemInfo = getPictureInfo(nextElem, descrClass);

    jQuery('#'+popinInfoContainer).fadeOut(250, function() {
        jQuery(this).html(nextElemInfo).fadeIn(250);
    });

    return nextElem;

}

function getNextElem(currentPicture, direction) {
    if(direction == "right") {
        if(currentPicture.is(':last-child')) {
            nextElem = currentPicture.parent().children(':first-child');
        } else {
            nextElem = currentPicture.next();
        }
    } else if(direction == "left") {
        if(currentPicture.is(':first-child')) {
            nextElem = currentPicture.parent().children(':last-child');
        } else {
            nextElem = currentPicture.prev();
        }
    }

    if(nextElem.css('display') == "none") {
        nextElem = getNextElem(nextElem, direction);
    }

    return nextElem;
}

function getPictureInfo(elem, descrClass) {
    var title = elem.attr('data-title');
    var thumbSrc = elem.attr('data-src');
    var imgSrc = thumbSrc.replace("thumb/", "");

    var galeryInfoHtml = '<h2>'+title+'</h2>';

    if(elem.children(':first').hasClass(descrClass)) {
        console.log(elem.children(':first'));
        galeryInfoHtml += '<p>'+elem.children(':first').html()+'</p>';
    }

    galeryInfoHtml += '<div class="imgContainer"><img alt="" src="'+imgSrc+'"></div>';

    return galeryInfoHtml;

}
