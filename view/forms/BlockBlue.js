sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";
	return BlockBase.extend("rshub.ui.view.blocks.BlockBlue", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "rshub.ui.view.blocks.BlockBlue",
					type: "XML"
				},
				Expanded: {
					viewName: "rshub.ui.view.block.BlockBlue",
					type: "XML"
				}
			}
		}
	});
}, true);
