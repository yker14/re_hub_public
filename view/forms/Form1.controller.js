sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
    '../../libs/api/SoSQLAPI'
], function (JSONModel, Controller, SoSQL) {
	"use strict";

	return Controller.extend("rshub.ui.view.forms.Form1", {
		onInit: function () {
            
            console.log(SoSQL.getStates());
            console.log('Form1 view initiated');
        },
        
        onAfterRendering: function () {
            
            console.log(SoSQL.getStates());
            console.log('Form1 view initiated');
        }
	});
}, true);
