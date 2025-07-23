Ext.define('SIF360.controller.Login', { // #1
    
    extend: 'Ext.app.Controller',      // #2

    views: [
        'login.Window'
    ],

    init: function(application) {
        this.control({
            "loginwindow form toolbar button#submit": {       // #1
                click: this.onButtonClickSubmit // #2
            },
            "loginwindow form toolbar button#cancel": {       // #3
                click: this.onButtonClickCancel // #4
            },
            "loginwindow form textfield": {
                specialkey: this.onTextfieldSpecialKey
            }
        });
    },

    onButtonClickSubmit: function(button, e, options) {
        var formPanel = button.up('form'),
            login = button.up('loginwindow'),
            values = formPanel.getValues();
        //DEBUG
        //console.log(values);
        if (formPanel.getForm().isValid()) {
            console.log('login submit');       
            Ext.get(login.getEl()).mask("Authenticating... Please wait...", 'loading');
            Ext.Ajax.request({
                
                url: 'app/php/login/login.php',
                
                params: values,
                
                failure: function(conn, response, options, eOpts) {
                  Ext.Msg.show({
                        title:'Error!',
                        msg: conn.responseText,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                },
                
                success: function(conn, response, options, eOpts) {

                    var result = Ext.JSON.decode(conn.responseText, true); // #1

                    if (!result){ // #2
                        result = {};
                        result.success = false;
                        result.msg = conn.responseText;
                    }

                    if (result.success) { // #3
                        //DEBUG
                        //console.log(result);
                        
                        // Set User login data
                        SIF360.config.Runtime.setLoggedIn(true);
                        SIF360.config.Runtime.setLoggedUser(result.i_utente);
                        SIF360.config.Runtime.setLoggedUserName(result.nome);
                        SIF360.config.Runtime.setLoggedUserLevel(result.level);

                        login.close(); // #4
                        console.log('login success');
                        
                        //Init Viewport
                        Ext.create('SIF360.view.Viewport');
                            
                        //Init login panel
                        var lp = Ext.ComponentQuery.query('loginloginpanel')[0],
                            wl = lp.down('#welcomelabel');
                        
                        wl.setText('Benvenuto '+ SIF360.config.Runtime.getLoggedUserName());
                        

                    } else {
                        Ext.Msg.show({
                            title:'Fail!',
                            msg: result.msg, // #6
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            });
            Ext.get(login.getEl()).unmask();
        }
    },
    
    onTextfieldSpecialKey: function(field, e, options) {
        if (e.getKey() == e.ENTER){
            var submitBtn = field.up('form').down('button#submit');
            submitBtn.fireEvent('click', submitBtn, e, options);
        }
    },

    onButtonClickCancel: function(button, e, options) {
        button.up('form').getForm().reset();          // #6
    }
});