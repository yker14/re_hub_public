sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    '../libs/custom/Utilities'
], function (Controller, JSONModel, MessageBox, Utils) {
	"use strict";
    
	var CController = Controller.extend(Utils.nameSpaceHandler("controller.Shell"), {
                
        onInit : function () {
            
            //Global variables for Controller
            this.addedPages = {};
            
            this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("rshub/ui/model/") + "/pages.json", null, false);
            
            this.oPanel = this.oModel.getData().panel;
            this.oAction = this.oModel.getData().action;
            
            this.getView().setModel(this.oModel);
            
		},
        
        onAfterRendering: function () {
            
            //Navigate to initialView in pages.json
            var itemKey = this.getView().byId("sideNav").getSelectedKey(),
                itemAction = this.oAction[itemKey],
                pageContainer = this.byId("pageContainer");
            
            this.itemActionHandler(itemAction, itemKey, pageContainer);
        },

		onItemSelect : function (oEvent) {
            
            //GET PROPS OF THE ITEM SELECTED
            var item = oEvent.getParameter('item'),
                itemKey = item.getKey(),
                itemAction = this.oAction[itemKey],
                pageContainer = this.byId("pageContainer");
            
            Utils.emptyCheck(itemAction) ? itemAction = {action: "error"} : null;
            
            //TAKE ACTION ON THE ITEM SELECTED
            this.itemActionHandler(itemAction, itemKey, pageContainer, item);
                
		},
        
        itemActionHandler: function (itemAction, itemKey, pageContainer, sourceItem) {

            var output = {};

            //Actions for "nav" items
            if (itemAction.action == "nav") {

                //Verify if page has been created already
                if (Utils.emptyCheck(this.addedPages[itemKey])) {

                    //View setup
                    var controllerName = Utils.nameSpaceHandler(itemAction.controllerName),
                        viewName =  Utils.nameSpaceHandler(itemAction.viewName),
                        oController = sap.ui.controller(controllerName),
                        oView = new sap.ui.core.mvc.XMLView.create({
                                                                id : itemKey,
                                                                viewName: viewName, 
                                                                controller: oController
                                                                });
                    
                    oView.then( function (value) {                

                        //Register created view
                        pageContainer.addPage(value);
                        this.addedPages[itemKey] = itemKey;
                        
                        //Navigate to page
                        pageContainer.to(itemKey);
                        
                    }.bind(this))
                    
                    output.Action = "add";
                } 
                
                else {
                    
                    //Navigate to the page
                    pageContainer.to(itemKey);
                    
                    output.Action = "nav";
                }
            }

            //Actions for "expand" items
            else if (itemAction.action == "expand") {

                //Expand the list
                sourceItem.setExpanded(!sourceItem.getExpanded());

                output.Action = "expand";
            } 
            
            //Handler for no action available
            else if (itemAction.action == "error") {
                
                MessageBox.show("This action is unavailable.", {
                    icon: MessageBox.Icon.ERROR,                    
                    title: "Unavailable",                                           
                    actions: [MessageBox.Action.OK]
                });
                
                output.Action = "error";
            }
            
            return output;
        },
		
		onSideNavButtonPress: function () {
			var oToolPage = this.byId("toolPage");
			var bSideExpanded = oToolPage.getSideExpanded();
            var oToggleButton = this.byId('sideNavigationToggleButton');
            
            (bSideExpanded) ?   oToggleButton.setTooltip('Expandir') :
                                oToggleButton.setTooltip('Colapsar');

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		}
	});


	return CController;

});