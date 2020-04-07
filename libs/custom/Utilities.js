sap.ui.define([
	"./Utilities"
], function () {
	"use strict";

	// class providing static utility methods.

	return {
        
        nameSpaceHandler: function (objname, formAs="method") {
            
            if (formAs == "method") {
                
                return "rshub.ui." + objname;
                
            } else if (formAs == "url") {
                
                return "rshub/ui/" + objname;
            }
        },
        
        emptyCheck: function (input) {
            
            var output = null;
        
            (input == undefined || 
            input == null) ? output = true : output = false;
                            
            return output;
        }
    };
});