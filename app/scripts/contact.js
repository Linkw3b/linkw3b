jQuery(function() {
    var form = jQuery('#contact-form');
    var submitButton = jQuery('#submit-button');
    var requiredFields = jQuery('.contact-container .required + input, .contact-container .required + textarea');

    updateSubmitButton(submitButton, requiredFields);

    jQuery(requiredFields).on('focusout', function(event) {
        var elem = jQuery(event.currentTarget);
        checkField(elem);
        updateSubmitButton(submitButton, requiredFields);
    });

    form.on('submit', function(event) {
        event.preventDefault();
        updateSubmitButton(submitButton, requiredFields);
        var form = jQuery(event.currentTarget);
        if(!submitButton.hasClass('disabled')) {
            var title = 'Oups... :(',
                message = 'Il y a eu une erreur... Réessayez plus tard !',
                statusName = 'error';
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
                    swal({
                        title: title,
                        text: message,
                        confirmButtonText: 'Okay',
                        type: statusName,
                        confirmButtonColor: '#7bc98e',
                        timer: 3500
                    });
                },
                error: function(data, textStatus) {
                    if(data.hasOwnProperty('title')) {
                        title = data.title;
                    }
                    if(data.hasOwnProperty('message')) {
                        message = data.message;
                    }
                    if(data.hasOwnProperty('statusName')) {
                        statusName = data.statusName;
                    }
                    swal({
                        title: title,
                        text: message,
                        confirmButtonText: 'Okay',
                        type: statusName,
                        confirmButtonColor: '#7bc98e',
                        timer: 3500
                    });
                }
            });
        }
    });
});

function checkField(elem) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

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

function updateSubmitButton(submitButton, requiredFields) {
    var enableButton = true;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    requiredFields.each(function(index, elem) {
        if(jQuery(elem).val() == "" || (jQuery(elem).attr('type') == "email" && !emailReg.test(jQuery(elem).val()))) {
            enableButton = false;
        }
    });

    if(submitButton.hasClass('disabled') && enableButton) {
        submitButton.removeClass('disabled');
    } else if(!submitButton.hasClass('disabled') && !enableButton) {
        submitButton.addClass('disabled');
    }
}
