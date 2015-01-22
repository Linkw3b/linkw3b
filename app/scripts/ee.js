jQuery(function() {
    var kKeys = [],
        kIsActive = false,
        audio = {};

    audio["secret"] = new Audio();
    audio["secret"].src = "../sounds/LTTP_Secret.wav";

    audio["fanfare"] = new Audio();
    audio["fanfare"].src = "../sounds/LTTP_ItemFanfare.wav";

    audio["death"] = new Audio();
    audio["death"].src = "../sounds/LTTP_Link_Dying.wav";

    jQuery(document).keydown(function(event) {
        if(!kIsActive) {
            kKeys.push(event.keyCode);
            if (kKeys.toString().indexOf("38,38,40,40,37,39,37,39,66,65") >= 0) {
                audio["secret"].play();
                kIsActive = true;
                swal({
                    title: 'Yeah !',
                    text: 'You found the master sword !\nDo you wanna try to get it out ?\n(It\'s dangerous to go alone)',
                    imageUrl: '../images/mastersword.gif',
                    showCancelButton: true,
                    confirmButtonColor: '#7bc98e',
                    confirmButtonText: 'I\'ll take my chance !',
                    cancelButtonText: 'Naaaaah !',
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm) {
                    if(isConfirm) {
                        audio["fanfare"].play();
                        swal({
                            title: 'You are the chosen one',
                            text: 'Go save Hyrule and the Princess !',
                            imageUrl: '../images/hero.gif',
                            confirmButtonColor: '#7bc98e',
                            confirmButtonText: 'Here we go !'
                        }, function() {
                            kIsActive = false;
                            kKeys = [];
                        });
                    } else {
                        audio["death"].play();
                        swal({
                            title: 'Hyrule is on fire :(',
                            text: 'You have failed !',
                            imageUrl: '../images/fire.gif',
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
});
