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


app.post("/",(req,res)=>{
  console.log(req.body)
  var Username = req.body.Username;
  var Password = req.body.Password;
  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_EMP_LOGIN&receiverParty=&receiverService=&interface=SI_PB_EMP&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Content-Type': 'application/xml',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDMwODEzMzkFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMzA4MTMzOTI4WjAjBgkqhkiG9w0BCQQxFgQURtV0rccTHJbIvKYeZGTzAoH94RowCQYHKoZIzjgEAwQwMC4CFQCqZIJ6eH%2FYq9WozAieEKmpBrWpZQIVAPFzKhBjk2lW2qijygfjb5VRbfMQ; JSESSIONID=XLT3pqvWlhdgHJYBDVRGLeUlwXLBhgF-Y2kA_SAPY7SKQ2uxoi9HhkgW0SuhY4nf; JSESSIONMARKID=131KGApmFriOf8soG-5R0lnQPWbXiiufbFMH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pb="http://pb_emp_portal.com">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <pb:MT_PB_EMP_REQ>\r\n         <EMPID1>3</EMPID1>\r\n         <PASSWORD1>NITHYA</PASSWORD1>\r\n      </pb:MT_PB_EMP_REQ>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);



var result1 = convert.xml2json(response.body, {compact: true,spaces: 4});
  const result2 = JSON.parse(result1);
  console.log(JSON.parse(result1));
  console.log(
    result2['SOAP:Envelope']['SOAP:Body']['ns1:MT_PB_EMP_RES']['E_NAME1']['_text']);
  res.json({
    status1:
    result2['SOAP:Envelope']['SOAP:Body']['ns1:MT_PB_EMP_RES']['E_NAME1']['_text']
       });
       });
      });
       
  
  app.post("/profile",(req,res)=>{
    var user = req.body.user;
    console.log(req.body)
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_ZFM_MONEES_EP_EMPDETAIL1&receiverParty=&receiverService=&interface=SI_MONEE_EP_EMPDETAILS&interfaceNamespace=http://employee_portal_monee.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic UE9VU0VSQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDIyODE0MzEFAAQAAAAICgAIUE9VU0VSQDL%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMjI4MTQzMTI1WjAjBgkqhkiG9w0BCQQxFgQUBmtVWxqou5Aw3J47SOvoU104r5wwCQYHKoZIzjgEAwQuMCwCFELdk!OYnnvu!UEFSQaSmPD1hBlmAhRv3XrpepRgtpJ82oILzJusuMASHQ%3D%3D; JSESSIONID=z-58K2wzOB3AGyOvMvIbFKegcG-YhgF-Y2kA_SAPe6njLkjuAr2hmHwHPZtuNq_Q; JSESSIONMARKID=vOXQSw9pkiN2kp0-qmivWVNyrNhDHcwhfnvn5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_MONEE_EP_EMPDETAILS>\r\n         <EMPID>3</EMPID>\r\n      </urn:ZFM_MONEE_EP_EMPDETAILS>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);


    
    var result1 = convert.xml2json(response.body, {
      compact: true,
      spaces: 4 
     }); 
     const result2 = JSON.parse(result1);//result1 
  console.log(JSON.parse(result1)); 
  console.log(
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_MONEE_EP_EMPDETAILS.Response']['RESULT']
    ); 
  res.json({
    a1:
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_MONEE_EP_EMPDETAILS.Response']['RESULT']
    
     });
     });
    });
    
  
  app.post("/leavedata",(req,res)=>{
    var user = req.body.user;
    console.log(req.body)
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_EMP_LDATA&receiverParty=&receiverService=&interface=SI_PB_EMP_LD&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDMwODEzMzkFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMzA4MTMzOTI4WjAjBgkqhkiG9w0BCQQxFgQURtV0rccTHJbIvKYeZGTzAoH94RowCQYHKoZIzjgEAwQwMC4CFQCqZIJ6eH%2FYq9WozAieEKmpBrWpZQIVAPFzKhBjk2lW2qijygfjb5VRbfMQ; JSESSIONID=XLT3pqvWlhdgHJYBDVRGLeUlwXLBhgF-Y2kA_SAPY7SKQ2uxoi9HhkgW0SuhY4nf; JSESSIONMARKID=Kq9Y6ATc8p_AqnMEBlRd9WfO5K-y-NH-u1MH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_EMP_LD>\r\n         <!--You may enter the following 4 items in any order-->\r\n         <EMPID>3</EMPID>\r\n         <IT_LEAVE_BALANCE>\r\n            <!--Zero or more repetitions:-->\r\n            </IT_LEAVE_BALANCE>\r\n         <IT_LEAVE_DETAIL>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </IT_LEAVE_DETAIL>\r\n         <IT_LEAVE_TYPE>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </IT_LEAVE_TYPE>\r\n      </urn:ZPB_EMP_LD>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);








    var result1 = convert.xml2json(response.body, {
      compact: true,
      spaces: 4 
     }); 
     const result2 = JSON.parse(result1);
     console.log(JSON.parse(result1));

     console.log(
       result2["SOAP:Envelope"]["SOAP:Body"]['ns0:ZPB_EMP_LD.Response']['IT_LEAVE_BALANCE']['item']
     );
     res.json({
   a1:
   result2["SOAP:Envelope"]["SOAP:Body"]['ns0:ZPB_EMP_LD.Response']['IT_LEAVE_BALANCE']['item']
 });
 });
});

 
  
  


app.post("/payslip",(req,res)=>{
  var user = req.body.user;
  console.log(req.body)
  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_EMP_PAYSLIP&receiverParty=&receiverService=&interface=SI_PB_EMP_PAYSLIP&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDIyODE0MzIFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMjI4MTQzMjU4WjAjBgkqhkiG9w0BCQQxFgQUM!SBNWDJ4TF7tHSTLaNE2xODGrYwCQYHKoZIzjgEAwQvMC0CFQCRHVcrw5IziYE3lu7VgtMnjzRPMAIUbviszMUK6sH24E5mA!lQOL3TuX4%3D; JSESSIONID=mMYEhpE41DKl8EoZtlQqemgr3XCYhgF-Y2kA_SAPIlGHDcFpO2SY_mj4D83cM6W5; JSESSIONMARKID=9FZJ_weFDOjoOQYxRlBYWxO_N2KKG0OdL8vn5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_EMP_PAYSLIP>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <EMPID>3</EMPID>\r\n         <PAYSLIP_DET>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n               \r\n         </PAYSLIP_DET>\r\n      </urn:ZPB_EMP_PAYSLIP>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);



  var result1 = convert.xml2json(response.body, {
    compact: true,
    spaces: 4 
   }); 
   const result2 = JSON.parse(result1);
   console.log(JSON.parse(result1));

   console.log(
     result2["SOAP:Envelope"]["SOAP:Body"]['ns0:ZPB_EMP_PAYSLIP.Response']['PAYSLIP_DET']['item']
   );
   res.json({
 a1:
 result2["SOAP:Envelope"]["SOAP:Body"]['ns0:ZPB_EMP_PAYSLIP.Response']['PAYSLIP_DET']['item']
});
});
});

 

     app.listen(3030,()=>{

       console.log("Server running at port 3030");
    
     })