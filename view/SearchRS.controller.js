sap.ui.define([
    '../libs/custom/Utilities',
	'sap/ui/Device',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Popover',
	'sap/m/Button',
	'sap/m/library'
], function (Utils, Device, Controller, JSONModel, Popover, Button, mobileLibrary) {
	"use strict";

	var CController = Controller.extend(Utils.nameSpaceHandler("controller.SearchRS"), {
		onInit : function() {
            console.log('Search view initiated');
		}
	});


	return CController;

});
