sap.ui.define([
	'sap/ui/model/json/JSONModel',
	'sap/ui/core/mvc/Controller',
	'sap/m/MessageToast',
  '../libs/custom/Utilities',
  'sap/ui/core/Fragment',
  '../libs/api/SoSQLAPI'
], function (JSONModel, Controller, MessageToast, Utils, Fragment, SoSQL) {
	"use strict";

	var CController = Controller.extend(Utils.nameSpaceHandler("controller.RegisterRS"), {

    onInit: function () {

			//Setup data for controls
			//years
			var yearSince, yearsModel,yearsList;
			yearSince = Utils.miscCount(parseInt(new Date().getFullYear()+1),"yearsince",1900, '', '', true);
			yearsModel = new JSONModel(yearSince);
			yearsList = this.getView().byId("propage");
			yearsModel.setSizeLimit(yearSince.yearsince.length);
			yearsList.setModel(yearsModel);
			yearsList.addItem(new sap.ui.core.Item({text:"",key:"0"}));
			yearsList.setSelectedKey("0");



/*
			Promise.all([yearsModel]).then( function (results){
				for (var i=0; i< results.length; i++){
					console.log(yearSince	);
					console.log(results[i]);
					results[i].setJSON(JSON.stringify(yearSince));

				}

			}.bind(this));
*/
			//Get and set global model
			this.oFormModel = new JSONModel();
			this.oFormModel.loadData(sap.ui.require.toUrl("rshub/ui/model/") + "/RegisterForm.json", null, false);
			this.getView().setModel(this.oFormModel);

			//Get Geo Information
			var states = SoSQL.getStates();
			states.then(function(data){

					var nData = {"states":data};

					//Set Json Model for the states list
					var json = new JSONModel();
					json.setJSON(JSON.stringify(nData))

					var stateList = this.getView().byId("state");
					stateList.setModel(json);
					stateList.setSelectedKey("11"); //SELECT BOGOTA AUTOMATICALLY
					stateList.fireChange(stateList.getSelectedItem());
			}.bind(this));
		},

		onStateChange: function (ev) {
			//WIPE CITY LIST ITEMS
			var citiesList = this.getView().byId("cities");
			citiesList.destroyItems();

			//GET NEW CITIES
			var key = ev.getSource().getSelectedKey(),
			cities = SoSQL.getCities(key);

				cities.then(function(data){

					var nData = {"cities":data};

					//Set Json Model for the view
					var json = new JSONModel();
					json.setJSON(JSON.stringify(nData))

					citiesList.setModel(json);
				}.bind(this));
			},

		onSaveData: function(ev) {
			var formElements = this.getView().getModel().getProperty("/idinventory");

			for (var i=0; i<formElements.length; i++) {
				console.log(formElements[i]);

				oElement = this.getView().byId(formElements[i].id);





			},

			getFormElementValue: function(element, type) {

				switch (type) {
					case "checkbox":
						break;

					case "select":
						break;

					case "input":
						break;

					case "textbox":
						break;

					default:
						return null
				}
			}

		}
	});

	return CController;

});
