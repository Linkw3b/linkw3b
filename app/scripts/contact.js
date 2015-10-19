jQuery(function() {
    var form = jQuery('#contact-form'),
        submitButton = jQuery('#submit-button'),
        requiredFields = jQuery('.contact-container .required + input, .contact-container .required + textarea'),
        enbaleSubmit = false,
        reCaptchaTextarea = 'g-recaptcha-response';

    enbaleSubmit = updateSubmitButton(submitButton, requiredFields, reCaptchaTextarea);

    requiredFields.on('focusout', function(event) {
        var elem = jQuery(event.currentTarget);
        checkField(elem, reCaptchaTextarea);
        enableSubmit = updateSubmitButton(submitButton, requiredFields, reCaptchaTextarea);
    });

    form.on('submit', function(event) {
        event.preventDefault();
        enbaleSubmit = updateSubmitButton(submitButton, requiredFields, reCaptchaTextarea);
        var form = jQuery(event.currentTarget);
        if(enbaleSubmit) {
            var title = 'Oups... :(',
            message = 'Il y a eu une erreur... Réessayez plus tard !',
            statusName = 'error';

            jQuery.ajax({
                url: '/ajax/reCaptcha.php',
                type: 'post',
                data:  {
                    response: jQuery('#'+reCaptchaTextarea).val()
                },
                success: function(data, textStatus) {
                    if(data.hasOwnProperty('success')) {
                        if(data.success === true) {
                            submitForm(form, title, message, statusName);
                        } else {
                            if(data.hasOwnProperty('title')) {
                                title = data.title;
                            }
                            if(data.hasOwnProperty('message')) {
                                message = data.message;
                            }
                            if(data.hasOwnProperty('statusName')) {
                                statusName = data.statusName;
                            }
                            showAlert(title, message, statusName);
                        }
                    } else {
                        showAlert(title, message, statusName);
                    }
                },
                error: function(data, textStatus) {
                    showAlert(title, message, statusName);
                }
            });
        } else {
            requiredFields.each(function(index, element) {
                checkField(jQuery(element), reCaptchaTextarea);
            });
            checkField(jQuery('#'+reCaptchaTextarea), reCaptchaTextarea);
        }
    });
});

function checkField(elem, reCaptchaTextarea) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

    if(elem.is('#'+reCaptchaTextarea)) {
        if(elem.val() == "") {
            elem.parents('.g-recaptcha-container').addClass('invalid-captcha');
        } else if(elem.parents('.g-recaptcha-container').hasClass('invalid-captcha')) {
            elem.parents('.g-recaptcha-container').removeClass('invalid-captcha');
        }
    } else {
        if(elem.val() == "") {
            if(!elem.prev().hasClass('invalid')) {
                elem.prev().addClass('invalid');
            }
        } else if (elem.attr('type') == "email" && !emailReg.test(elem.val())) {
            if(!elem.prev().hasClass('invalid')) {
                elem.prev().addClass('invalid');
            }
        } else {
            if(elem.prev().hasClass('invalid')) {
                elem.prev().removeClass('invalid');
            }
        }
    }
}

function updateSubmitButton(submitButton, requiredFields, reCaptchaTextarea) {
    var enableButton = true;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    requiredFields.each(function(index, elem) {
        if(jQuery(elem).val() == ""
            || (jQuery(elem).attr('type') == "email"
            && !emailReg.test(jQuery(elem).val()))
            || jQuery('#'+reCaptchaTextarea).val() == ""
        ) {
            enableButton = false;
        }
    });

    return enableButton;
}

function submitForm(form, title, message, statusName) {
    jQuery.ajax({
        url: '/ajax/contact.php',
        type: form.attr('method'),
        data: form.serialize(),
        datatype: 'json',
        success: function(data, textStatus) {
            if(data.hasOwnProperty('title')) {
                title = data.title;
            }
            if(data.hasOwnProperty('message')) {
                message = data.message;
            }
            if(data.hasOwnProperty('statusName')) {
                statusName = data.statusName;
            }
            showAlert(title, message, statusName);
        },
        error: function(data, textStatus) {
            showAlert(title, message, statusName);
        }
    });
}

function showAlert(title, message, statusName) {
    swal({
        title: title,
        text: message,
        confirmButtonText: 'Okay',
        type: statusName,
        confirmButtonColor: '#7bc98e',
        timer: 3500
    });
}