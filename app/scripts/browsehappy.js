jQuery(function() {
    swal({
        title: 'Oups...',
        text: 'Vous disposez d\'un vieux navigateur...\nCe site risque de ne pas s\'afficher très bien\nVous voulez une meilleure expérience sur ce site (et beaucoup d\'autres) ?',
        showCancelButton: true,
        confirmButtonColor: '#7bc98e',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
    }, function(isConfirm) {
        if(isConfirm) {
            document.location.href="http://browsehappy.com/";
        }
    });
});