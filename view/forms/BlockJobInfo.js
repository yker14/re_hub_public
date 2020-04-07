sap.ui.define(["sap/uxap/BlockBase"], function (BlockBase) {
	"use strict";
	return BlockBase.extend("rshub.ui.view.blocks.BlockJobInfo", {
        
		metadata: {
			views: {
				Collapsed: {
					viewName: "rshub.ui.view.blocks.BlockJobInfo",
					type: "XML"
				},
				Expanded: {
					viewName: "rshub.ui.view.blocks.BlockJobInfo",
					type: "XML"
				}
			}
		},
        
        //oContext: this,
        
        onAfterRendering: function () {
            //this.oContext.getView().byId("jobclass").setText('This text has been altered.')
        }                  
	});
}, true);
