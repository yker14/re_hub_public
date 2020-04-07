sap.ui.define([
	'sap/ui/Device',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/library'
], function (Device, Controller, JSONModel, Popover, Button, mobileLibrary) {
	"use strict";

	var CController = Controller.extend("rshub.ui.controller.Home", {
		onInit : function() {
            console.log('Home view initiated');
		}
	});


	return CController;

});
