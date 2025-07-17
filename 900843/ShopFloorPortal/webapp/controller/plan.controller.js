sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("NITHYASHOPFLOOR1NITHYASHOPFLOOR1.controller.plan", {
		onLogins : function(){
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
            oR.navTo("pur");
             
         },
         onLogin   : function(){
			var oR = sap.ui.core.UIComponent.getRouterFor(this);
            oR.navTo("plan");
             
        },
   //      onLoginss   : function(){
			// var oR = sap.ui.core.UIComponent.getRouterFor(this);
   //         oR.navTo("usg");
             
   //      },
         onInit: function(){
				var url= "/sap/opu/odata/sap/ZPB_ODATA_SHOPFLOOR_SRV/";
			var d;
		    var oe = new sap.ui.model.odata.ODataModel(url, true);
		     //var uri = "PoNum='" + plant + "'";
		     //window.console.log(uri);
			oe.read("/ZPB_SHOPFLOOR_PLANNEDORDER6Set?$filter=IPlant eq '0002'&$format=json",{
				context:null,
				urlParameter:null,
				async:false,
				success: function(oData, oResponse)
				{
					d = oData.results;
				}
			});
		var oen = new sap.ui.model.json.JSONModel();
						// created a JSON model
						oen.setData({
					 "results"	: d
						});
						// oTable.setModel(tableModel);
			// set explored app's demo model on this sample
				this.getView().byId("producttable").setModel(oen);
		}

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf NITHYASHOPFLOOR1NITHYASHOPFLOOR1.view.plan
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf NITHYASHOPFLOOR1NITHYASHOPFLOOR1.view.plan
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf NITHYASHOPFLOOR1NITHYASHOPFLOOR1.view.plan
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf NITHYASHOPFLOOR1NITHYASHOPFLOOR1.view.plan
		 */
		//	onExit: function() {
		//
		//	}

	});

});