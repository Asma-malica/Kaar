sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller,MessageBox) {
	"use strict";

	return Controller.extend("NITHYASHOPFLOOR1NITHYASHOPFLOOR1.controller.login", {
		onLogin : function(){
			
            var uid = this.getView().byId("uid").getValue();
            var pasw = this.getView().byId("pasw").getValue();
            var surl = "/sap/opu/odata/sap/ZPB_ODATA_SHOPFLOOR_SRV/";
            var oModel = new sap.ui.model.odata.ODataModel(surl, true);
            var uri = "IUserid='" + uid + "',IPassword='" + pasw + "'";
            var status;
            window.console.log(uri);
            oModel.read("/ZPB_SHOPFLOOR_LOGINSet(" + uri + ")", {
               
                context: null,
                urlParameters: null,
                async: false,
                success: function(oData, oResponse) {
                    window.console.log(oData);
                    status = oData["EStatus"];
                    window.console.log(status);
                  
                }
            });
            if(status === "Success"){
            var oR = sap.ui.core.UIComponent.getRouterFor(this);
            oR.navTo("pur");
            }
            else{
                MessageBox.alert("Enter The Valid Credentials");
            }
		}

	});
});