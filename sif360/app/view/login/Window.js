Ext.define('SIF360.view.login.Window', { // #1
    extend: 'Ext.window.Window', // #2
    alias: 'widget.loginwindow',       // #3
    autoShow: true,
    constrain: true,              // #4
    height: 170,                 // #5
    width: 360,                  // #6
    layout: {
        type: 'fit'              // #7
    },
    iconCls: 'key',              // #8
    title: "SIFTeC Pianificazione",              // #9
    closeAction: 'hide',         // #10
    closable: false,            // #11

    items: [{
        xtype: 'form',        // #12
        frame: false,         // #13
        bodyPadding: 15,      // #14
        defaults: {             // #15
            xtype: 'textfield', // #16
            anchor: '100%',     // #17
            labelWidth: 60,     // #18
        },
        items: [
            {
                name: 'login',
                fieldLabel: "Utente",
                allowBlank: false, // #20
                vtype: 'alphanum', // #21
                minLength: 3,      // #22
                maxLength: 25,
                msgTarget: 'under' // #23
            },
            {
                name: 'pwd',
                fieldLabel: "Password",
                inputType: 'password', // #19
                allowBlank: false, // #20
                vtype: 'alphanum', // #21
                minLength: 3,      // #22,
                maxLength: 15,
                msgTarget: 'under' // #23
            }
        ],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'tbfill' //#24
                },
                {
                    xtype: 'button', // #25
                    itemId: 'cancel',
                    //iconCls: 'cancel',
                    text: 'Cancel'
                },
                {
                    xtype: 'button', // #26
                    itemId: 'submit',
                    //iconCls: 'key-go',
                    text: "Submit",

                    //execute only if Form is correct
                    formBind: true  // #27

                }
            ]
        }]
    }]
});
