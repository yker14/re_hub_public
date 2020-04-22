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

            //Setup of Upload Collection
            this.setUploadCollection();
        
/*
			Promise.all([yearsModel]).then( function (results){
				for (var i=0; i< results.length; i++){
					console.log(yearSince	);
					console.log(results[i]);
					results[i].setJSON(JSON.stringify(yearSince));

				}

			}.bind(this));
*/

    },
        
    setUploadCollection: function() {
        var uploadCollection = this.getView().byId("uploadcollection");
        uploadCollection.setFileType(["jpg", "png"]);
        //uploadCollection.setUploadUrl("./media/images");
                                       
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
        var oElement,
                valuesArray = [],
                formElements = this.getView().getModel().getProperty("/idinventory");


        for (var i=0; i<formElements.length; i++) {
            var value;
            console.log(formElements[i]);

            oElement = this.getView().byId(formElements[i].id);
            value = this.getFormElementValue(oElement,formElements[i].type);
            valuesArray.push({"element":formElements[i].id,"value": value});
        }
        console.log(valuesArray);
        
        var oUploadCollection = this.byId("uploadcollection");
        var cFiles = oUploadCollection.getItems().length;
        
         oUploadCollection.upload();
        
    },

		getFormElementValue: function(element, type) {
			var value;

			switch (type) {
				case "checkbox":
					value = element.getSelected();
					(value) ? value = 1 : value = 0;
					return value;

					break;

				case "select":
					value = element.getSelectedItem().getProperty("text");
					return value;

					break;

				case "input":
					value = element.getValue();
					return value;

					break;

				default:
					return null
			}
		},

		onCleanData: function() {
			console.log("data cleaned");
		}
	});

	return CController;

});
