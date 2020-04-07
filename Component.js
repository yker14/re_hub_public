sap.ui.define(['sap/ui/core/UIComponent',
               './libs/custom/Utilities'],
function (UIComponent, Utils) {
	"use strict";

	return UIComponent.extend(Utils.nameSpaceHandler("Component"), {
		metadata: {
			manifest: "json"
		},
        
        init: function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            // create the views based on the url/hash
            this.getRouter().initialize();
        }                     
	});
});
