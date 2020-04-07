sap.ui.define([
	'sap/ui/model/json/JSONModel',
	'sap/ui/core/mvc/Controller',
	'sap/m/MessageToast',
    '../libs/custom/Utilities',
    'sap/ui/core/Fragment',
    '../libs/custom/ViewsController',
    '../libs/api/SoSQLAPI'
], function (JSONModel, Controller, MessageToast, Utils, Fragment, VControl, SoSQL) {
	"use strict";

	return Controller.extend(Utils.nameSpaceHandler("controller.RegisterRS"), {
		
        onInit: function () {
            
            this.oModel= {};
            
            // Setup of inital fragment on views for Icon Tab filters            
            this.form1_onInit();
		},
      
		form1_onInit: function () {
            
			//Setup for Form1 view
            var oViewForm1 = VControl.viewCreate("form1",this.getView().getController()),
                formContainer = this.getView().byId("form1");
                            
            //Pull Geo Data from Socrata API
            var oStates = SoSQL.getStates();
            
            //Once all promises are solved, do this
            Promise.all([oStates,oViewForm1])
                .then(
                    function(values) {
                        
                        var oModel = values[0],
                            oView = values[1];
                        
                        //Set Json Model for the view
                        var json = new JSONModel();
                        json.setJSON(JSON.stringify(oModel))
                        
                        oView.setModel(json);
                        
                        //Add to current page content
                        formContainer.addContent(oView);
            })
        },            

		handleLink2Press: function () {
			MessageToast.show("Page 2 long link clicked");
		}
	});
}, true);
