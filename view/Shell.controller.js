sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'rshub/ui/libs/custom/Utilities',
    'sap/m/Popover',
    'sap/m/Button',
	'sap/m/library',
    'sap/ui/core/Popup',
    'sap/ui/core/Fragment',
	'sap/ui/core/routing/History',
	'sap/ui/core/UIComponent'
], function (Controller, JSONModel, MessageBox, Utils, Popover, Button, Library, Popup, Fragment, History, UIComponent) {
	"use strict";
    
	var CController = Controller.extend(Utils.nameSpaceHandler("controller.Shell"), {
                
        onInit : function () {
            
            //Global variables for Controller
            this.addedPages = {};
            
            this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("rshub/ui/model/") + "/pages.json", null, false);
            this.getView().setModel(this.oModel);
		},
        
        getRouter : function () {
			return UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("Homeview", {}, true /*leave no history for browser*/);
			}
		},
        
        /*
        handleMenuPress: function(oEvent) {
			var oButton = oEvent.getSource();

			// create menu only once
			if (!this._menu) {
				Fragment.load({
					name: Utils.nameSpaceHandler("view.dialogs.NavMenu"),
                    controller: this,
                    id: "navmenu"
				}).then(function(oMenu){
					this._menu = oMenu;
					this.getView().addDependent(this._menu);
                    this._menu.setModel(this.oModel);
					this._menu.openBy(oButton, false);
				}.bind(this));
			} else {
				this._menu.openBy(oButton, false);
			}
		},
        */
        
        onMenuItemSelect : function(ev) {
            
            this.getRouter().navTo(ev.getParameter("item").getProperty("key"))
            
            console.log('NavMenu Dialog Item Selected');
		},
        
        handleNamePress: function (event) {
			var oPopover = new Popover({
				showHeader: false,
				placement: Library.PlacementType.Bottom,
				content: [
					new Button({
						text: 'Feedback',
						type: Library.ButtonType.Transparent
					}),
					new Button({
						text: 'Help',
						type: Library.ButtonType.Transparent
					}),
					new Button({
						text: 'Logout',
						type: Library.ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			oPopover.openBy(event.getSource());
		}
        
	
	});


	return CController;

});