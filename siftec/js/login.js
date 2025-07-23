var LOGIN_REQUIRED = false;


var userHandler = {
    username : '',
    status : ''
}
 
$(document).on('pagecontainershow', function (e, ui) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    if(activePage.attr('id') === 'login') {
            if (LOGIN_REQUIRED){
                $(document).on('click', '#submit', function() { // catch the form's submit event
                if($('#username').val().length > 0 && $('#password').val().length > 0){

                    userHandler.username = $('#username').val();

                    // Send data to server through the Ajax call
                    // action is functionality we want to call and outputJSON is our data
                    $.ajax({url: 'php/auth.php',
                        data: {action : 'authorization', formData : $('#check-user').serialize()},
                        type: 'post',                  
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.loading('show'); // This will show Ajax spinner
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete   
                            $.mobile.loading('hide'); // This will hide Ajax spinner
                        },
                        success: function (result) {
                            // Check if authorization process was successful
                            if(result.status == 'success') {
                                userHandler.status = result.status;
                                //L_MAP_USER_EXTENT = new Array(result.xmin,result.ymin,result.xmax,result.ymax);
                                if (result.ext_limit>0){
                                    L_MAXBOUNDS = [[result.ymin, result.xmin],[result.ymax, result.xmax]];
                                    L_MINZOOM= result.zoom_min;
                                    L_MAXZOOM= result.zoom_max;
                                }

                                //initLeafLet();
                                $.mobile.changePage("#home");                   
                            } else {
                                alert('Login fallito!');
                            }
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action               
                            alert('Network error has occurred please try again!');
                        }
                    });                  
                } else {
                    alert('Inserisca tutti i campi richiesti, grazie.');
                }          
                    return false; // cancel original event to prevent form submitting
            });
        }else{
            //initLeafLet();
            $.mobile.changePage("#home"); 
        }
    } else if(activePage.attr('id') === 'second') {
        alert('Benvenuto ' + userHandler.username);
    }
});
 
$(document).on('pagecontainerbeforechange', function (e, ui) {
    var activePage = $(':mobile-pagecontainer').pagecontainer('getActivePage');
    if(activePage.attr('id') === 'second') {
        var to = ui.toPage;
         
        if (typeof to  === 'string') {
            var u = $.mobile.path.parseUrl(to);
            to = u.hash || '#' + u.pathname.substring(1);
              
            if (to === '#login' && userHandler.status === 'success') {
                alert('Non si può tornare alla pagina di login mentre si è connessi!');
                e.preventDefault();
                e.stopPropagation();
                  
                // remove active status on a button if a transition was triggered with a button
                $('#back-btn').removeClass('ui-btn-active ui-shadow').css({'box-shadow':'0 0 0 #3388CC'});
            } 
        }
    }
});