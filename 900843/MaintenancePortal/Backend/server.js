const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const convert = require('xml-js');
const { response } = require("express");
var cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.all("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-?Length, X-Requested-With');
  next();
});


app.post("/login",(req,res)=>{
  console.log(req.body)
  var USERNAME = req.body.USERNAME;
  var PASSWORD = req.body.PASSWORD;
  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_MAIN_LOGIN&receiverParty=&receiverService=&interface=SI_PB_MAIN_LOGIN&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDIyODE0NTQFAAQAAAAICgAIUE9VU0VSQDL%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMjI4MTQ1NDQ4WjAjBgkqhkiG9w0BCQQxFgQUgD9QmCAElR2UlQcV!JiFhg7j8mkwCQYHKoZIzjgEAwQuMCwCFCF5B!CQtUUP3t9z8sUlaa%2FyHvLfAhQn7PBvxIYSP85Y08KYmcB17Va!Pw%3D%3D; JSESSIONID=l1y93voItZpAZkl9dTCJA23N2ISYhgF-Y2kA_SAPXHimkh88DtmfLLwYtnkbhhZy; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_MAIN_LOGIN>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <LV_PASSWORD>NITHYA</LV_PASSWORD>\r\n         <LV_USERID>12</LV_USERID>\r\n      </urn:ZPB_MAIN_LOGIN>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);


    var result1 = convert.xml2json(response.body, {compact: true,spaces: 4});
  const result2 = JSON.parse(result1);
  console.log(JSON.parse(result1));
  console.log(
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_MAIN_LOGIN.Response']['EX_STATUS']['_text']);
  res.json({
    status1:
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_MAIN_LOGIN.Response']['EX_STATUS']['_text']
       });
       });
       });
  
  app.post("/notlist",(req,res)=>{
    var user = req.body.user;
    console.log(req.body)
    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_BHERMALADARSHJAIN_NOTIFICATION_MP&receiverParty=&receiverService=&interface=SI_BHERMALADARSHJAIN_NOTIFICATION&interfaceNamespace=http://BHERMAL_ADARSH_JAIN.com',
      'headers': {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': 'http://sap.com/xi/WebService/soap1.1',
        'Authorization': 'Basic UE9VU0VSQDI6MjAyMkBUZWNo',
        'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDIyODEyMzMFAAQAAAAICgAIUE9VU0VSQDL%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMjI4MTIzMzIzWjAjBgkqhkiG9w0BCQQxFgQUU1qCfoIHc3rbH1xyq24kF572gXswCQYHKoZIzjgEAwQuMCwCFB10!SJm97OpchfsyI1PUr5tgErMAhRbzW61275uWqUtQneuTieFcnX0bg%3D%3D; JSESSIONID=zaaN_SXrH87vPZ8wTtoEuUKwYAOYhgF-Y2kA_SAPb2HsJjQ2AVU4QtkUNYGk3Qk7; JSESSIONMARKID=4O1E4Q_APlyxganIANFiByJldwbyDDPNOnuH5jaQA; saplb_*=(J2EE6906720)6906750'
      },
      body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_NOTIFICATION_MP_ADARSH>\r\n         <!--You may enter the following 7 items in any order-->\r\n         <I_NOTIFICATION_DATE>2022-06-27</I_NOTIFICATION_DATE>\r\n         <I_PLANNER_GROUP>010</I_PLANNER_GROUP>\r\n         <I_PLANNING_PLANT>0001</I_PLANNING_PLANT>\r\n         <!--Optional:-->\r\n         <NOTIFICATION_LIST>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </NOTIFICATION_LIST>\r\n         <!--Optional:-->\r\n         <NOTIFICATION_NODO>\r\n            <!--Zero or more repetitions:-->\r\n           \r\n         </NOTIFICATION_NODO>\r\n         <!--Optional:-->\r\n         <NOTIFICATION_NOPR>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </NOTIFICATION_NOPR>\r\n         <!--Optional:-->\r\n         <NOTIFICATION_OSNO>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </NOTIFICATION_OSNO>\r\n      </urn:ZFM_NOTIFICATION_MP_ADARSH>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'
    
    };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
         var result227 = convert.xml2json(response.body, {
          compact: true,
          spaces: 4 
         }); 
         const result3 = JSON.parse(result227);
         console.log(result3);
         console.log(result3['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_NOTIFICATION_MP_ADARSH.Response']['NOTIFICATION_LIST']['item']);
         res.json({
          data227:result3['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_NOTIFICATION_MP_ADARSH.Response']['NOTIFICATION_LIST']['item']
         });
         });
         });
    
  

     app.post("/workorder",(req,res)=>{
        var user = req.body.user;
        var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_MAIN_WORKAREA&receiverParty=&receiverService=&interface=SI_PB_MAIN_WORKORDER&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDMwODA3MzIFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMzA4MDczMjU1WjAjBgkqhkiG9w0BCQQxFgQU7gl8Qeslm9jOOlNqUi!9DPjGMcYwCQYHKoZIzjgEAwQvMC0CFQDrCPZ0VZFxpHapvF1XnDEZEhlFtAIUENIUVy9Jh7rUdhPFhgysp589ysg%3D; JSESSIONID=eyiS51-rph8_X3_Cw_EcwSPWKyPAhgF-Y2kA_SAP8WlFNCbGygbSLLiv4BdWsd1q; JSESSIONMARKID=rH4nhgR8jYuwx0et0TaauNHdZ34SwkIFO1HH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_MAIN_WORKORDER>\r\n         <!--You may enter the following 4 items in any order-->\r\n         <I_PLANNER_GROUP>010</I_PLANNER_GROUP>\r\n         <I_PLANNING_PLANT>0001</I_PLANNING_PLANT>\r\n         <!--Optional:-->\r\n         <RETURN>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </RETURN>\r\n         <!--Optional:-->\r\n         <WO_LIST>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </WO_LIST>\r\n      </urn:ZPB_MAIN_WORKORDER>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);




  var result227 = convert.xml2json(response.body, {
      compact: true,
      spaces: 4 
     }); 


         const result3 = JSON.parse(result227);
         console.log(result3);
         console.log(result3['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_MAIN_WORKORDER.Response']['WO_LIST']['item']);
         res.json({
          data227:result3['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_MAIN_WORKORDER.Response']['WO_LIST']['item']
         });
         });
         });

         app.listen(3030,()=>{

          console.log("Server running at port 3030");
        
        })