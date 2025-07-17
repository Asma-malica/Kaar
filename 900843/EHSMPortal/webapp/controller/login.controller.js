sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller,MessageBox) {
	"use strict";

	return Controller.extend("NITHYAEHSMNITHYAEHSM.controller.login", {
		onLogin : function(){
			
            var uid = this.getView().byId("uid").getValue();
            var pasw = this.getView().byId("pasw").getValue();
            var surl = "/sap/opu/odata/sap/ZPB_ODATA_EHSM_SRV/";
            var oModel = new sap.ui.model.odata.ODataModel(surl, true);
            var uri = "UserId='" + uid + "',Password='" + pasw + "'";
            var status;
            window.console.log(uri);
            oModel.read("/ZPB_EHSM_LOGINSet(" + uri + ")", {
               
                context: null,
                urlParameters: null,
                async: false,
                success: function(oData, oResponse) {
                    window.console.log(oData);
                    status = oData["LoginResult"];
                    window.console.log(status);
                  
                }
            });
            if(status === "LOGIN SUCCESS"){
            var oR = sap.ui.core.UIComponent.getRouterFor(this);
            oR.navTo("inc");
            }
            else{
                MessageBox.alert("Enter The Valid Credentials");
            }
       
        }

	});
});