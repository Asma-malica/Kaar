sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend("crudappCrudApp.controller.View1", {
			
		onInit: function(){
			var dataModel = this.getOwnerComponent().getModel("DataSource");
			this.getView().byId("EmployeeTable").setModel(dataModel);
			// console.log(dataModel);
		},
		
		onAddEmployee : function(){
		  this.receiveRowDialog = sap.ui.xmlfragment("crudappCrudApp.view.Fragment.add",this);
		  this.getView().addDependent(this.receiveRowDialog);
		  this.receiveRowDialog.open();	
		},
		
		onAddCreate : function(){
		
			var fModel = this.getOwnerComponent().getModel("DataSource");
			
			var fname = sap.ui.getCore().byId("fempname").getValue();
			var fage = sap.ui.getCore().byId("fempage").getValue();
			var frole = sap.ui.getCore().byId("femprole").getValue();
			var fsalary = sap.ui.getCore().byId("fempsalary").getValue();
			
			var fdata = {
				name: fname,
				age : fage,
				role : frole,
				salary : fsalary
			};
			
		    var oEmployee = fModel.getProperty('/EmployeeData');
			oEmployee.push(fdata);
			fModel.setProperty("/EmployeeData",oEmployee);
			fModel.refresh(true);
			
			this.receiveRowDialog.destroy();
			
		},
		
		onSelectionChange : function(){
	
			this.editDialog = sap.ui.xmlfragment("crudappCrudApp.view.Fragment.edit",this);
			this.editDialog.open();
			
		    var index = this.getView().byId("EmployeeTable")._aSelectedPaths[0].split("/")[2];
			window.console.log(index,"index");
			var oModel1 = this.getView().byId("EmployeeTable").getModel("DataSource").getProperty("/EmployeeData");
			var ename = oModel1[index].name;
			var eage = oModel1[index].age;
			var erole = oModel1[index].role;
			var esalary = oModel1[index].salary;
			
			sap.ui.getCore().byId("eempname").setValue(ename);
			sap.ui.getCore().byId("eempage").setValue(eage);
			sap.ui.getCore().byId("eemprole").setValue(erole);
			sap.ui.getCore().byId("eempsalary").setValue(esalary);
			
		}
		
		
		

	});
});