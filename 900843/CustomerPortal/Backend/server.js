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
  var options ={
    'method': 'POST',
    'url': 'http://172.26.0.121:8000/sap/bc/srt/rfc/sap/zpb_cus_login2/100/zpb_cus_login2/zpb_cus_login2',
  'headers': {
    'Content-Type': 'application/soap+xml;charset=UTF-8',
    'Action': 'urn:sap-com:document:sap:rfc:functions:ZPB_CUS_LOGIN2:ZPB_CUS_LOGIN2Request',
    'Authorization': 'Basic QUJBUEVSMjphYmFwQDEyMw==',
    'Cookie': 'sap-usercontext=sap-client=100'
  },
  body: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZPB_CUS_LOGIN2>\r\n         <CUSTOMERID>12</CUSTOMERID>\r\n         <PASSWORD>NITHYA</PASSWORD>\r\n      </urn:ZPB_CUS_LOGIN2>\r\n   </soap:Body>\r\n</soap:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);

  var result1 = convert.xml2json(response.body, {compact: true,spaces: 2});
  const result2 = JSON.parse(result1);
  console.log(result1);
  console.log(JSON.parse(result1));

  console.log(
    result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_LOGIN2Response']['EX_NAME']['_text']
  );
  res.json({
status1:
result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_LOGIN2Response']['EX_NAME']['_text']



});


});
});

  app.post("/profile",(req,res)=>{
    console.log(req.body)
    var Username = req.body.Username;
    var Password = req.body.Password;
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://172.26.0.121:8000/sap/bc/srt/rfc/sap/zpb_cus_profile/100/zpb_cus_profile1/zpb_cus_profile1',
  'headers': {
    'Content-Type': 'application/soap+xml;charset=UTF-8',
    'Action': 'urn:sap-com:document:sap:rfc:functions:ZPB_CUS_PROFILE:ZPB_CUS_PROFILERequest',
    'Authorization': 'Basic QUJBUEVSMjphYmFwQDEyMw==',
    'Cookie': 'sap-usercontext=sap-client=100'
  },
  body: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZPB_CUS_PROFILE>\r\n         <CUSTOMERID>12</CUSTOMERID>\r\n      </urn:ZPB_CUS_PROFILE>\r\n   </soap:Body>\r\n</soap:Envelope>'

};
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    var result1 = convert.xml2json(response.body, {compact: true,spaces: 4});
    const result2 = JSON.parse(result1);

    console.log(JSON.parse(result1));

    console.log(result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_PROFILEResponse']["CUSTOMERDETAILS"]);
    res.json({
      a1:
      result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_PROFILEResponse']["CUSTOMERDETAILS"]

   });
  });

});

     app.post("/creditmemo",(req,res)=>{
        var user = req.body.user;
      console.log(req.body)
      var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://172.26.0.121:8000/sap/bc/srt/rfc/sap/zpb_cus_creditmemo1/100/zpb_cus_creditmemo1/zpb_cus_creditmemo1',
  'headers': {
    'Content-Type': 'application/soap+xml;charset=UTF-8',
    'Action': 'urn:sap-com:document:sap:rfc:functions:ZPB_CUS_CREDITMEMO1:ZPB_CUS_CREDITMEMORequest',
    'Authorization': 'Basic QUJBUEVSMjphYmFwQDEyMw==',
    'Cookie': 'sap-usercontext=sap-client=100'
  },
  body: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZPB_CUS_CREDITMEMO>\r\n      <CUSTOMERID>12</CUSTOMERID>\r\n\r\n         <CREDIT>\r\n            \r\n         </CREDIT>\r\n         \r\n         <DEBIT>\r\n            \r\n         </DEBIT>\r\n      </urn:ZPB_CUS_CREDITMEMO>\r\n   </soap:Body>\r\n</soap:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

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
         result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_CREDITMEMOResponse']['CREDIT']['item']
       );
       res.json({
     a1:
     result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_CREDITMEMOResponse']['CREDIT']['item']
   });
   });
  });
   

app.post("/cusdel",(req,res)=>{
      var user = req.body.user;
      console.log(req.body)
      var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://172.26.0.121:8000/sap/bc/srt/rfc/sap/zpb_cus_cusdel1/100/zpb_cus_cusdel1/zpb_cus_cusdel1',
  'headers': {
    'Content-Type': 'application/soap+xml;charset=UTF-8',
    'Action': 'urn:sapcom:document:sap:rfc:functions:ZPB_CUS_CUSDEL1:ZPB_CUS_CUSDELRequest',
    'Authorization': 'Basic QUJBUEVSMjphYmFwQDEyMw==',
    'Cookie': 'sap-usercontext=sap-client=100'
  },
  body: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZPB_CUS_CUSDEL>\r\n         <CUSTOMERID>12</CUSTOMERID>\r\n         <DELIVERY>\r\n            <!--Zero or more repetitions:-->\r\n            <!--\r\n            <item>\r\n               <VBELN>?</VBELN>\r\n               <ERZET>?</ERZET>\r\n               <ERDAT>?</ERDAT>\r\n               <VKORG>?</VKORG>\r\n               <LFART>?</LFART>\r\n               <LFDAT_V>?</LFDAT_V>\r\n               <INCO2>?</INCO2>\r\n               <ARKTX>?</ARKTX>\r\n               <LFUHR>?</LFUHR>\r\n            </item>\r\n            -->\r\n         </DELIVERY>\r\n      </urn:ZPB_CUS_CUSDEL>\r\n   </soap:Body>\r\n</soap:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

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
           result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_CUSDELResponse']['DELIVERY']['item']
         );
         res.json({
       a1:
       result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_CUSDELResponse']['DELIVERY']['item']
     });
     });
     });

     
        

//               app.post("/inquiry",(req,res)=>{
//               var user = req.body.user;
//               console.log(req.body)
//               var request = require('request');
// var options = {
//   'method': 'POST',
//   'url': 'http://172.26.0.121:8000/sap/bc/srt/rfc/sap/zpb_cus_inquiry2/100/zpb_cus_inquiry2/zpb_cus_inquiry2',
//   'headers': {
//     'Content-Type': 'application/soap+xml;charset=UTF-8',
//     'Action': 'urn:sap-com:document:sap:rfc:functions:ZPB_CUS_INQUIRY2:ZPB_CUS_INQUIRY2Request',
//     'Authorization': 'Basic YWJhcGVyMjphYmFwQDEyMw==',
//     'Cookie': 'sap-usercontext=sap-client=100'
//   },
//   body: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZPB_CUS_INQUIRY2>\r\n         <CUSID>12</CUSID>\r\n         <INQ_DET>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </INQ_DET>\r\n      </urn:ZPB_CUS_INQUIRY2>\r\n   </soap:Body>\r\n</soap:Envelope>'

// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(response.body);
// });

//               var result1 = convert.xml2json(response.body, {
            
//                 compact: true,
               
//                 spaces: 4
               
//                });
//                const result2 = JSON.parse(result1);

//     console.log(JSON.parse(result1));
  
//     console.log(
//       result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_INQUIRY2Response']['INQ_DET']['item']
//     );
//     res.json({
//   a2:
//   result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_INQUIRY2Response']['INQ_DET']['item']
// });
// });


              app.post("/salesorder",(req,res)=>{
                
                var user = req.body.user;
                console.log(req.body)
                var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://172.26.0.121:8000/sap/bc/srt/rfc/sap/zpb_cus_salesorder1/100/zpb_cus_salesorder1/zpb_cus_salesorder1',
  'headers': {
    'Content-Type': 'application/soap+xml;charset=UTF-8',
    'Action': 'urn:sap-com:document:sap:rfc:functions:ZPB_CUS_SALESORDER1:ZPB_CUS_SALESORDERRequest',
    'Authorization': 'Basic YWJhcGVyMjphYmFwQDEyMw==',
    'Cookie': 'sap-usercontext=sap-client=100'
  },
  body: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZPB_CUS_SALESORDER>\r\n         <CUSTOMERID>12</CUSTOMERID>\r\n          <SALESORG>0001</SALESORG>\r\n\r\n         \r\n        \r\n      </urn:ZPB_CUS_SALESORDER>\r\n   </soap:Body>\r\n</soap:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});


                request(options, function (error, response) {
                  if (error) throw new Error(error);
                  var result1 = convert.xml2json(response.body, {
                    compact: true,
                    spaces: 4 
                   }); 
                    const result2 = JSON.parse(result1);
                    console.log(JSON.parse(result1));
  
                    console.log(
                      result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_SALESORDERResponse']['SALESORDER']['item']
                    );
                    res.json({
                  a1:
                  result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_SALESORDERResponse']['SALESORDER']['item']
                });
                });
                });
app.post("/payment",(req,res)=>{
  var user = req.body.user;
  console.log(req.body)
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://172.26.0.121:8000/sap/bc/srt/rfc/sap/zpb_cus_payment/100/zpb_cus_payment/zpb_cus_payment',
  'headers': {
    'Content-Type': 'application/soap+xml;charset=UTF-8',
    'Action': 'urn:sap-com:document:sap:rfc:functions:ZPB_CUS_PAYMENT:ZPB_CUS_PAYMENTRequest',
    'Authorization': 'Basic YWJhcGVyMjphYmFwQDEyMw==',
    'Cookie': 'sap-usercontext=sap-client=100'
  },
  body: '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soap:Header/>\r\n   <soap:Body>\r\n      <urn:ZPB_CUS_PAYMENT>\r\n         <COMPCODE>0001</COMPCODE>\r\n         <CUSTOMERID>12</CUSTOMERID>\r\n         <!--Optional:\r\n         <DOCUDATE>?</DOCUDATE>\r\n -->\r\n         <OUTPUT>\r\n            <!--Zero or more repetitions:-->\r\n            <!--\r\n            \r\n            -->\r\n         </OUTPUT>\r\n      </urn:ZPB_CUS_PAYMENT>\r\n   </soap:Body>\r\n</soap:Envelope>'

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
                     result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_PAYMENTResponse']['OUTPUT']['item']
                   );
                   res.json({
                 a1:
                 result2["env:Envelope"]["env:Body"]['n0:ZPB_CUS_PAYMENTResponse']['OUTPUT']['item']
               });
               });
});

               

                  app.post("/invoice",(req,res)=>{
                    var user = req.body.user;
                    console.log(req.body)
                    var request = require('request');
                    var options = {
                      'method': 'POST',
                      'url': 'http://KTINDHNA02.kaartech.com:8000/sap/bc/srt/rfc/sap/zfm_invoice_list_adarsh/100/zfm_invoice_list_adarsh/zfm_invoice_list_adarsh',
                      'headers': {
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'Action': 'urn:sap-com:document:sap:rfc:functions:ZFM_INVOICE_LIST_ADARSH:ZFM_INVOICE_LIST_ADARSHRequest',
                        'Authorization': 'Basic QUJBUEVSMjphYmFwQDEyMw==',
                        'Cookie': 'sap-usercontext=sap-client=100'
                      },
                      body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_INVOICE_LIST_ADARSH>\r\n         <CUSTID>12</CUSTID>\r\n         <INVOICELIST>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               \r\n            </item>\r\n         </INVOICELIST>\r\n      </urn:ZFM_INVOICE_LIST_ADARSH>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'
                    
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
      result2["soap-env:Envelope"]["soap-env:Body"]['n0:ZFM_INVOICE_LIST_ADARSHResponse']['INVOICELIST']['ITEM']
    );
    res.json({
  a1:
  result2["soap-env:Envelope"]["soap-env:Body"]['n0:ZFM_INVOICE_LIST_ADARSHResponse']['INVOICELIST']['ITEM']
});
});
});
 app.listen(3030,()=>{

  console.log("Server running at port 3030");

 })

                    