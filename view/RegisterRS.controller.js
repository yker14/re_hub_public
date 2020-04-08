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
						//Get Geo Information
						var states = SoSQL.getStates();

						states.then(function(data){

								var nData = {"states":data};

								//Set Json Model for the view
								var json = new JSONModel();
								json.setJSON(JSON.stringify(nData))

								var stateList = this.getView().byId("state");

								stateList.setModel(json);
								stateList.addItem(new sap.ui.core.Item({key:"0",
																												text:""}));
						}.bind(this));

						this.getView().byId("state").setSelectedKey("0");
		},

		onStateChange: function (ev) {

			var key = ev.getSource().getSelectedKey(),
					cities = SoSQL.getCities(key);

					cities.then(function(data){

					var nData = {"cities":data};

					//Set Json Model for the view
					var json = new JSONModel();
					json.setJSON(JSON.stringify(nData))

					this.getView().byId("cities").setModel(json);
			}.bind(this));

		}
	});

	return CController;

});
