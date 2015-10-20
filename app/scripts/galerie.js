jQuery(function() {
    var overlay = 'overlay';
    var popin = 'popin-gallery';
    var descrClass = 'js-portfolio-descr';
    var blockClass = 'js-portfolio-block';
    var popinActive = false;
    var popinInfoContainer = "popin-container"
    var leftElem = 'left-gallery';
    var rightElem = 'right-gallery';
    var clickableElement = jQuery('.js-magnify-icon, #close-galery ,'+leftElem+', '+rightElem);
    var currentPicture = "";

    jQuery.each(jQuery('.'+blockClass), function(index, elem) {
        var image = new Image();
            image.src = jQuery(elem).attr('data-src');
    });

    jQuery('body').on('click', clickableElement, function(event) {
        if(jQuery(event.target).is('#close-gallery') || jQuery(event.target).is('#overlay')) {
            jQuery('#'+overlay+', #'+popin).fadeOut(250, function() {
                jQuery('#'+overlay+', #'+popin).remove();
                jQuery('body').removeAttr('style');
                popinActive = false;
                currentPicture = "";
            });
        } else if(jQuery(event.target).is('.js-magnify-icon')) {
            var galleryHtml = getPopinHTML(overlay, popin, popinInfoContainer, descrClass, jQuery(event.target).parents('.js-portfolio-block'));

            jQuery('body').css({'overflow': 'hidden'});
            jQuery('body').append(galleryHtml);
            jQuery('#'+overlay+', #'+popin).fadeIn(250);

            popinActive = true;
            currentPicture = jQuery(event.target).parents('.js-portfolio-block');
            prepareElements(currentPicture, blockClass, descrClass, popinInfoContainer);
        } else if(jQuery(event.target).attr('data-direction')) {
            currentPicture = changePicture(currentPicture, blockClass, descrClass, jQuery(event.target).attr('data-direction'), popinInfoContainer);
        }
    });

    jQuery('body').swipe({
        swipe:function(event, direction, distance, duration, fingerCount) {
            if(popinActive) {
                if(direction == 'left') {
                    direction = 'right';
                } else if(direction == 'right') {
                    direction = 'left';
                }
                currentPicture = changePicture(currentPicture, blockClass, descrClass, direction, popinInfoContainer);
            }
        }
    });

    jQuery(document).keydown(function(event) {
        if(popinActive && event.keyCode == 37) {
            currentPicture = changePicture(currentPicture, blockClass, descrClass, "left", popinInfoContainer);
        } else if (popinActive && event.keyCode == 39) {
            currentPicture = changePicture(currentPicture, blockClass, descrClass, "right", popinInfoContainer);
        } else if (popinActive && event.keyCode == 27) {
            currentPicture = "";
            jQuery('#close-gallery').trigger('click');
        }
    });
});

function getPopinHTML(overlay, popin, popinInfoContainer, descrClass, block) {
    var galleryHtml = '<div id="'+overlay+'" class="overlay"></div><div id="'+popin+'" class="'+popin+'"><span class="close-icon" id="close-gallery"></span><div class="'+popinInfoContainer+'" id="'+popinInfoContainer+'">';
    galleryHtml += getPictureInfo(block, descrClass);
    galleryHtml += '</div><div class="left-arrow-icon" data-direction="left" id="left-gallery"></div><div class="right-arrow-icon" data-direction="right" id="right-gallery"></div></div>';

    return galleryHtml;
}

function getPictureInfo(elem, descrClass, additionnalClass) {
    var additionnalClass = additionnalClass || '',
        title = elem.attr('data-title'),
        imgSrc = elem.attr('data-src');

    var galleryInfoHtml = '<div class="slide js-slide'+additionnalClass+'"><h2>'+title+'</h2>';

    if(elem.children(':first').hasClass(descrClass)) {
        galleryInfoHtml += '<p>'+elem.children(':first').html()+'</p>';
    }

    galleryInfoHtml += '<div class="imgContainer"><img alt="" src="'+imgSrc+'"></div></div>';

    return galleryInfoHtml;

}

function prepareElements(currentPicture, blockClass, descrClass, popinInfoContainer) {
    prepareNextElement(currentPicture, blockClass, descrClass, popinInfoContainer);
    preparePrevElement(currentPicture, blockClass, descrClass, popinInfoContainer);
}

function prepareNextElement(currentPicture, blockClass, descrClass, popinInfoContainer) {
    var rightElemContent = getPictureInfo(getNextElem(currentPicture, 'right'), descrClass, ' next-slide');

    jQuery('#'+popinInfoContainer).append(rightElemContent);
}

function preparePrevElement(currentPicture, blockClass, descrClass, popinInfoContainer) {
    var leftElemContent = getPictureInfo(getNextElem(currentPicture, 'left'), descrClass, ' prev-slide');

    jQuery('#'+popinInfoContainer).prepend(leftElemContent);
}

function changePicture(currentPicture, blockClass, descrClass, direction, popinInfoContainer) {

    var nextElem = getNextElem(currentPicture, direction);
    var slides = jQuery('#'+popinInfoContainer+' .js-slide');

    if(direction == 'right') {
        prepareNextElement(nextElem, blockClass, descrClass, popinInfoContainer);
        jQuery(slides[0]).remove();
        jQuery(slides[1]).addClass('prev-slide');
        jQuery(slides[2]).removeClass('next-slide');
    }
    if(direction == 'left') {
        preparePrevElement(nextElem, blockClass, descrClass, popinInfoContainer);
        jQuery(slides[2]).remove();
        jQuery(slides[1]).addClass('next-slide');
        jQuery(slides[0]).removeClass('prev-slide');
    }

    return nextElem;
}

function getNextElem(currentPicture, direction) {
    if(direction == 'right') {
        if(currentPicture.is(':last-child')) {
            nextElem = currentPicture.parent().children(':first-child');
        } else {
            nextElem = currentPicture.next();
        }
    } else if(direction == 'left') {
        if(currentPicture.is(':first-child')) {
            nextElem = currentPicture.parent().children(':last-child');
        } else {
            nextElem = currentPicture.prev();
        }
    }

    if(nextElem.css('display') == 'none') {
        nextElem = getNextElem(nextElem, direction);
    }

    return nextElem;
}