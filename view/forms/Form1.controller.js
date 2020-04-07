sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
    '../../libs/api/SoSQLAPI',
    '../libs/custom/Utilities'
], function (JSONModel, Controller, SoSQL, Utils) {
	"use strict";

	return Controller.extend(Utils.nameSpaceHandler("view.forms.Form1"), {

        
        onAfterRendering: function () {
            
            console.log(SoSQL.getStates());
            console.log('Form1 view initiated');
        },
        
        onSelect: function (ev) {
            console.log(ev);
        }
	});
}, true);
