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
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_VEN_LOGIN&receiverParty=&receiverService=&interface=SI_PB_VEN_LOGIN&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDIyODE0MDUFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMjI4MTQwNTAzWjAjBgkqhkiG9w0BCQQxFgQUpphiNQutXQ7tuED4clYOOsZ0wsowCQYHKoZIzjgEAwQvMC0CFQDIEtm3LueUNa5fTc5rLhyStAZ37AIUcZIrZprPre%2FOQYg6!r2j0ARECzQ%3D; JSESSIONID=vlBN3h83Ud4gFF_PqYfkW0nQUFeYhgF-Y2kA_SAP3dpCCjgGH64jZKLV7G_4lbc6; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_VEN_LOGIN>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <ZPSWORD>NITHYA</ZPSWORD>\r\n         <ZUSERID>5</ZUSERID>\r\n      </urn:ZPB_VEN_LOGIN>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);





  var result1= convert.xml2json(response.body, {compact: true,spaces: 4});
    const result2 = JSON.parse(result1);
    console.log(result1);
    console.log(JSON.parse(result1));

    console.log(
      result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_LOGIN.Response']['RESULT']['_text']
    );
    res.json({
    status1:
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_LOGIN.Response']['RESULT']['_text']

});


 });
});

    // VENDOR QUOTATION

    app.post("/quotation",(req,res)=>{
      var user = req.body.user;
      console.log(req.body)
      var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_VEN_RFQ&receiverParty=&receiverService=&interface=SI_PB_VEN_RFQ&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDMwODEzMzkFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMzA4MTMzOTI4WjAjBgkqhkiG9w0BCQQxFgQURtV0rccTHJbIvKYeZGTzAoH94RowCQYHKoZIzjgEAwQwMC4CFQCqZIJ6eH%2FYq9WozAieEKmpBrWpZQIVAPFzKhBjk2lW2qijygfjb5VRbfMQ; JSESSIONID=XLT3pqvWlhdgHJYBDVRGLeUlwXLBhgF-Y2kA_SAPY7SKQ2uxoi9HhkgW0SuhY4nf; JSESSIONMARKID=131KGApmFriOf8soG-5R0lnQPWbXiiufbFMH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_VEN_RFQ>\r\n         <!--You may enter the following 4 items in any order-->\r\n         <VENDORID>5</VENDORID>\r\n         <EKPODATA>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               <!--Optional:-->\r\n               <MANDT>?</MANDT>\r\n               <!--Optional:-->\r\n               <EBELN>?</EBELN>\r\n               <!--Optional:-->\r\n               <EBELP>?</EBELP>\r\n               <!--Optional:-->\r\n               <LOEKZ>?</LOEKZ>\r\n               <!--Optional:-->\r\n               <STATU>?</STATU>\r\n               <!--Optional:-->\r\n               <AEDAT>?</AEDAT>\r\n               <!--Optional:-->\r\n               <TXZ01>?</TXZ01>\r\n               <!--Optional:-->\r\n               <MATNR>?</MATNR>\r\n               <!--Optional:-->\r\n               <EMATN>?</EMATN>\r\n               <!--Optional:-->\r\n               <BUKRS>?</BUKRS>\r\n               <!--Optional:-->\r\n               <WERKS>?</WERKS>\r\n               <!--Optional:-->\r\n               <LGORT>?</LGORT>\r\n               <!--Optional:-->\r\n               <BEDNR>?</BEDNR>\r\n               <!--Optional:-->\r\n               <MATKL>?</MATKL>\r\n               <!--Optional:-->\r\n               <INFNR>?</INFNR>\r\n               <!--Optional:-->\r\n               <IDNLF>?</IDNLF>\r\n               <!--Optional:-->\r\n               <KTMNG>?</KTMNG>\r\n               <!--Optional:-->\r\n               <MENGE>?</MENGE>\r\n               <!--Optional:-->\r\n               <MEINS>?</MEINS>\r\n               <!--Optional:-->\r\n               <BPRME>?</BPRME>\r\n               <!--Optional:-->\r\n               <BPUMZ>?</BPUMZ>\r\n               <!--Optional:-->\r\n               <BPUMN>?</BPUMN>\r\n               <!--Optional:-->\r\n               <UMREZ>?</UMREZ>\r\n               <!--Optional:-->\r\n               <UMREN>?</UMREN>\r\n               <!--Optional:-->\r\n               <NETPR>?</NETPR>\r\n               <!--Optional:-->\r\n               <PEINH>?</PEINH>\r\n               <!--Optional:-->\r\n               <NETWR>?</NETWR>\r\n               <!--Optional:-->\r\n               <BRTWR>?</BRTWR>\r\n               <!--Optional:-->\r\n               <AGDAT>?</AGDAT>\r\n               <!--Optional:-->\r\n               <WEBAZ>?</WEBAZ>\r\n               <!--Optional:-->\r\n               <MWSKZ>?</MWSKZ>\r\n               <!--Optional:-->\r\n               <BONUS>?</BONUS>\r\n               <!--Optional:-->\r\n               <INSMK>?</INSMK>\r\n               <!--Optional:-->\r\n               <SPINF>?</SPINF>\r\n               <!--Optional:-->\r\n               <PRSDR>?</PRSDR>\r\n               <!--Optional:-->\r\n               <SCHPR>?</SCHPR>\r\n               <!--Optional:-->\r\n               <MAHNZ>?</MAHNZ>\r\n               <!--Optional:-->\r\n               <MAHN1>?</MAHN1>\r\n               <!--Optional:-->\r\n               <MAHN2>?</MAHN2>\r\n               <!--Optional:-->\r\n               <MAHN3>?</MAHN3>\r\n               <!--Optional:-->\r\n               <UEBTO>?</UEBTO>\r\n               <!--Optional:-->\r\n               <UEBTK>?</UEBTK>\r\n               <!--Optional:-->\r\n               <UNTTO>?</UNTTO>\r\n               <!--Optional:-->\r\n               <BWTAR>?</BWTAR>\r\n               <!--Optional:-->\r\n               <BWTTY>?</BWTTY>\r\n               <!--Optional:-->\r\n               <ABSKZ>?</ABSKZ>\r\n               <!--Optional:-->\r\n               <AGMEM>?</AGMEM>\r\n               <!--Optional:-->\r\n               <ELIKZ>?</ELIKZ>\r\n               <!--Optional:-->\r\n               <EREKZ>?</EREKZ>\r\n               <!--Optional:-->\r\n               <PSTYP>?</PSTYP>\r\n               <!--Optional:-->\r\n               <KNTTP>?</KNTTP>\r\n               <!--Optional:-->\r\n               <KZVBR>?</KZVBR>\r\n               <!--Optional:-->\r\n               <VRTKZ>?</VRTKZ>\r\n               <!--Optional:-->\r\n               <TWRKZ>?</TWRKZ>\r\n               <!--Optional:-->\r\n               <WEPOS>?</WEPOS>\r\n               <!--Optional:-->\r\n               <WEUNB>?</WEUNB>\r\n               <!--Optional:-->\r\n               <REPOS>?</REPOS>\r\n               <!--Optional:-->\r\n               <WEBRE>?</WEBRE>\r\n               <!--Optional:-->\r\n               <KZABS>?</KZABS>\r\n               <!--Optional:-->\r\n               <LABNR>?</LABNR>\r\n               <!--Optional:-->\r\n               <KONNR>?</KONNR>\r\n               <!--Optional:-->\r\n               <KTPNR>?</KTPNR>\r\n               <!--Optional:-->\r\n               <ABDAT>?</ABDAT>\r\n               <!--Optional:-->\r\n               <ABFTZ>?</ABFTZ>\r\n               <!--Optional:-->\r\n               <ETFZ1>?</ETFZ1>\r\n               <!--Optional:-->\r\n               <ETFZ2>?</ETFZ2>\r\n               <!--Optional:-->\r\n               <KZSTU>?</KZSTU>\r\n               <!--Optional:-->\r\n               <NOTKZ>?</NOTKZ>\r\n               <!--Optional:-->\r\n               <LMEIN>?</LMEIN>\r\n               <!--Optional:-->\r\n               <EVERS>?</EVERS>\r\n               <!--Optional:-->\r\n               <ZWERT>?</ZWERT>\r\n               <!--Optional:-->\r\n               <NAVNW>?</NAVNW>\r\n               <!--Optional:-->\r\n               <ABMNG>?</ABMNG>\r\n               <!--Optional:-->\r\n               <PRDAT>?</PRDAT>\r\n               <!--Optional:-->\r\n               <BSTYP>?</BSTYP>\r\n               <!--Optional:-->\r\n               <EFFWR>?</EFFWR>\r\n               <!--Optional:-->\r\n               <XOBLR>?</XOBLR>\r\n               <!--Optional:-->\r\n               <KUNNR>?</KUNNR>\r\n               <!--Optional:-->\r\n               <ADRNR>?</ADRNR>\r\n               <!--Optional:-->\r\n               <EKKOL>?</EKKOL>\r\n               <!--Optional:-->\r\n               <SKTOF>?</SKTOF>\r\n               <!--Optional:-->\r\n               <STAFO>?</STAFO>\r\n               <!--Optional:-->\r\n               <PLIFZ>?</PLIFZ>\r\n               <!--Optional:-->\r\n               <NTGEW>?</NTGEW>\r\n               <!--Optional:-->\r\n               <GEWEI>?</GEWEI>\r\n               <!--Optional:-->\r\n               <TXJCD>?</TXJCD>\r\n               <!--Optional:-->\r\n               <ETDRK>?</ETDRK>\r\n               <!--Optional:-->\r\n               <SOBKZ>?</SOBKZ>\r\n               <!--Optional:-->\r\n               <ARSNR>?</ARSNR>\r\n               <!--Optional:-->\r\n               <ARSPS>?</ARSPS>\r\n               <!--Optional:-->\r\n               <INSNC>?</INSNC>\r\n               <!--Optional:-->\r\n               <SSQSS>?</SSQSS>\r\n               <!--Optional:-->\r\n               <ZGTYP>?</ZGTYP>\r\n               <!--Optional:-->\r\n               <EAN11>?</EAN11>\r\n               <!--Optional:-->\r\n               <BSTAE>?</BSTAE>\r\n               <!--Optional:-->\r\n               <REVLV>?</REVLV>\r\n               <!--Optional:-->\r\n               <GEBER>?</GEBER>\r\n               <!--Optional:-->\r\n               <FISTL>?</FISTL>\r\n               <!--Optional:-->\r\n               <FIPOS>?</FIPOS>\r\n               <!--Optional:-->\r\n               <KO_GSBER>?</KO_GSBER>\r\n               <!--Optional:-->\r\n               <KO_PARGB>?</KO_PARGB>\r\n               <!--Optional:-->\r\n               <KO_PRCTR>?</KO_PRCTR>\r\n               <!--Optional:-->\r\n               <KO_PPRCTR>?</KO_PPRCTR>\r\n               <!--Optional:-->\r\n               <MEPRF>?</MEPRF>\r\n               <!--Optional:-->\r\n               <BRGEW>?</BRGEW>\r\n               <!--Optional:-->\r\n               <VOLUM>?</VOLUM>\r\n               <!--Optional:-->\r\n               <VOLEH>?</VOLEH>\r\n               <!--Optional:-->\r\n               <INCO1>?</INCO1>\r\n               <!--Optional:-->\r\n               <INCO2>?</INCO2>\r\n               <!--Optional:-->\r\n               <VORAB>?</VORAB>\r\n               <!--Optional:-->\r\n               <KOLIF>?</KOLIF>\r\n               <!--Optional:-->\r\n               <LTSNR>?</LTSNR>\r\n               <!--Optional:-->\r\n               <PACKNO>?</PACKNO>\r\n               <!--Optional:-->\r\n               <FPLNR>?</FPLNR>\r\n               <!--Optional:-->\r\n               <GNETWR>?</GNETWR>\r\n               <!--Optional:-->\r\n               <STAPO>?</STAPO>\r\n               <!--Optional:-->\r\n               <UEBPO>?</UEBPO>\r\n               <!--Optional:-->\r\n               <LEWED>?</LEWED>\r\n               <!--Optional:-->\r\n               <EMLIF>?</EMLIF>\r\n               <!--Optional:-->\r\n               <LBLKZ>?</LBLKZ>\r\n               <!--Optional:-->\r\n               <SATNR>?</SATNR>\r\n               <!--Optional:-->\r\n               <ATTYP>?</ATTYP>\r\n               <!--Optional:-->\r\n               <VSART>?</VSART>\r\n               <!--Optional:-->\r\n               <HANDOVERLOC>?</HANDOVERLOC>\r\n               <!--Optional:-->\r\n               <KANBA>?</KANBA>\r\n               <!--Optional:-->\r\n               <ADRN2>?</ADRN2>\r\n               <!--Optional:-->\r\n               <CUOBJ>?</CUOBJ>\r\n               <!--Optional:-->\r\n               <XERSY>?</XERSY>\r\n               <!--Optional:-->\r\n               <EILDT>?</EILDT>\r\n               <!--Optional:-->\r\n               <DRDAT>?</DRDAT>\r\n               <!--Optional:-->\r\n               <DRUHR>?</DRUHR>\r\n               <!--Optional:-->\r\n               <DRUNR>?</DRUNR>\r\n               <!--Optional:-->\r\n               <AKTNR>?</AKTNR>\r\n               <!--Optional:-->\r\n               <ABELN>?</ABELN>\r\n               <!--Optional:-->\r\n               <ABELP>?</ABELP>\r\n               <!--Optional:-->\r\n               <ANZPU>?</ANZPU>\r\n               <!--Optional:-->\r\n               <PUNEI>?</PUNEI>\r\n               <!--Optional:-->\r\n               <SAISO>?</SAISO>\r\n               <!--Optional:-->\r\n               <SAISJ>?</SAISJ>\r\n               <!--Optional:-->\r\n               <EBON2>?</EBON2>\r\n               <!--Optional:-->\r\n               <EBON3>?</EBON3>\r\n               <!--Optional:-->\r\n               <EBONF>?</EBONF>\r\n               <!--Optional:-->\r\n               <MLMAA>?</MLMAA>\r\n               <!--Optional:-->\r\n               <MHDRZ>?</MHDRZ>\r\n               <!--Optional:-->\r\n               <ANFNR>?</ANFNR>\r\n               <!--Optional:-->\r\n               <ANFPS>?</ANFPS>\r\n               <!--Optional:-->\r\n               <KZKFG>?</KZKFG>\r\n               <!--Optional:-->\r\n               <USEQU>?</USEQU>\r\n               <!--Optional:-->\r\n               <UMSOK>?</UMSOK>\r\n               <!--Optional:-->\r\n               <BANFN>?</BANFN>\r\n               <!--Optional:-->\r\n               <BNFPO>?</BNFPO>\r\n               <!--Optional:-->\r\n               <MTART>?</MTART>\r\n               <!--Optional:-->\r\n               <UPTYP>?</UPTYP>\r\n               <!--Optional:-->\r\n               <UPVOR>?</UPVOR>\r\n               <!--Optional:-->\r\n               <KZWI1>?</KZWI1>\r\n               <!--Optional:-->\r\n               <KZWI2>?</KZWI2>\r\n               <!--Optional:-->\r\n               <KZWI3>?</KZWI3>\r\n               <!--Optional:-->\r\n               <KZWI4>?</KZWI4>\r\n               <!--Optional:-->\r\n               <KZWI5>?</KZWI5>\r\n               <!--Optional:-->\r\n               <KZWI6>?</KZWI6>\r\n               <!--Optional:-->\r\n               <SIKGR>?</SIKGR>\r\n               <!--Optional:-->\r\n               <MFZHI>?</MFZHI>\r\n               <!--Optional:-->\r\n               <FFZHI>?</FFZHI>\r\n               <!--Optional:-->\r\n               <RETPO>?</RETPO>\r\n               <!--Optional:-->\r\n               <AUREL>?</AUREL>\r\n               <!--Optional:-->\r\n               <BSGRU>?</BSGRU>\r\n               <!--Optional:-->\r\n               <LFRET>?</LFRET>\r\n               <!--Optional:-->\r\n               <MFRGR>?</MFRGR>\r\n               <!--Optional:-->\r\n               <NRFHG>?</NRFHG>\r\n               <!--Optional:-->\r\n               <J_1BNBM>?</J_1BNBM>\r\n               <!--Optional:-->\r\n               <J_1BMATUSE>?</J_1BMATUSE>\r\n               <!--Optional:-->\r\n               <J_1BMATORG>?</J_1BMATORG>\r\n               <!--Optional:-->\r\n               <J_1BOWNPRO>?</J_1BOWNPRO>\r\n               <!--Optional:-->\r\n               <J_1BINDUST>?</J_1BINDUST>\r\n               <!--Optional:-->\r\n               <ABUEB>?</ABUEB>\r\n               <!--Optional:-->\r\n               <NLABD>?</NLABD>\r\n               <!--Optional:-->\r\n               <NFABD>?</NFABD>\r\n               <!--Optional:-->\r\n               <KZBWS>?</KZBWS>\r\n               <!--Optional:-->\r\n               <BONBA>?</BONBA>\r\n               <!--Optional:-->\r\n               <FABKZ>?</FABKZ>\r\n               <!--Optional:-->\r\n               <J_1AINDXP>?</J_1AINDXP>\r\n               <!--Optional:-->\r\n               <J_1AIDATEP>?</J_1AIDATEP>\r\n               <!--Optional:-->\r\n               <MPROF>?</MPROF>\r\n               <!--Optional:-->\r\n               <EGLKZ>?</EGLKZ>\r\n               <!--Optional:-->\r\n               <KZTLF>?</KZTLF>\r\n               <!--Optional:-->\r\n               <KZFME>?</KZFME>\r\n               <!--Optional:-->\r\n               <RDPRF>?</RDPRF>\r\n               <!--Optional:-->\r\n               <TECHS>?</TECHS>\r\n               <!--Optional:-->\r\n               <CHG_SRV>?</CHG_SRV>\r\n               <!--Optional:-->\r\n               <CHG_FPLNR>?</CHG_FPLNR>\r\n               <!--Optional:-->\r\n               <MFRPN>?</MFRPN>\r\n               <!--Optional:-->\r\n               <MFRNR>?</MFRNR>\r\n               <!--Optional:-->\r\n               <EMNFR>?</EMNFR>\r\n               <!--Optional:-->\r\n               <NOVET>?</NOVET>\r\n               <!--Optional:-->\r\n               <AFNAM>?</AFNAM>\r\n               <!--Optional:-->\r\n               <TZONRC>?</TZONRC>\r\n               <!--Optional:-->\r\n               <IPRKZ>?</IPRKZ>\r\n               <!--Optional:-->\r\n               <LEBRE>?</LEBRE>\r\n               <!--Optional:-->\r\n               <BERID>?</BERID>\r\n               <!--Optional:-->\r\n               <XCONDITIONS>?</XCONDITIONS>\r\n               <!--Optional:-->\r\n               <APOMS>?</APOMS>\r\n               <!--Optional:-->\r\n               <CCOMP>?</CCOMP>\r\n               <!--Optional:-->\r\n               <GRANT_NBR>?</GRANT_NBR>\r\n               <!--Optional:-->\r\n               <FKBER>?</FKBER>\r\n               <!--Optional:-->\r\n               <STATUS>?</STATUS>\r\n               <!--Optional:-->\r\n               <RESLO>?</RESLO>\r\n               <!--Optional:-->\r\n               <KBLNR>?</KBLNR>\r\n               <!--Optional:-->\r\n               <KBLPOS>?</KBLPOS>\r\n               <!--Optional:-->\r\n               <WEORA>?</WEORA>\r\n               <!--Optional:-->\r\n               <SRV_BAS_COM>?</SRV_BAS_COM>\r\n               <!--Optional:-->\r\n               <PRIO_URG>?</PRIO_URG>\r\n               <!--Optional:-->\r\n               <PRIO_REQ>?</PRIO_REQ>\r\n               <!--Optional:-->\r\n               <EMPST>?</EMPST>\r\n               <!--Optional:-->\r\n               <DIFF_INVOICE>?</DIFF_INVOICE>\r\n               <!--Optional:-->\r\n               <TRMRISK_RELEVANT>?</TRMRISK_RELEVANT>\r\n               <!--Optional:-->\r\n               <SPE_ABGRU>?</SPE_ABGRU>\r\n               <!--Optional:-->\r\n               <SPE_CRM_SO>?</SPE_CRM_SO>\r\n               <!--Optional:-->\r\n               <SPE_CRM_SO_ITEM>?</SPE_CRM_SO_ITEM>\r\n               <!--Optional:-->\r\n               <SPE_CRM_REF_SO>?</SPE_CRM_REF_SO>\r\n               <!--Optional:-->\r\n               <SPE_CRM_REF_ITEM>?</SPE_CRM_REF_ITEM>\r\n               <!--Optional:-->\r\n               <SPE_CRM_FKREL>?</SPE_CRM_FKREL>\r\n               <!--Optional:-->\r\n               <SPE_CHNG_SYS>?</SPE_CHNG_SYS>\r\n               <!--Optional:-->\r\n               <SPE_INSMK_SRC>?</SPE_INSMK_SRC>\r\n               <!--Optional:-->\r\n               <SPE_CQ_CTRLTYPE>?</SPE_CQ_CTRLTYPE>\r\n               <!--Optional:-->\r\n               <SPE_CQ_NOCQ>?</SPE_CQ_NOCQ>\r\n               <!--Optional:-->\r\n               <REASON_CODE>?</REASON_CODE>\r\n               <!--Optional:-->\r\n               <CQU_SAR>?</CQU_SAR>\r\n               <!--Optional:-->\r\n               <ANZSN>?</ANZSN>\r\n               <!--Optional:-->\r\n               <SPE_EWM_DTC>?</SPE_EWM_DTC>\r\n               <!--Optional:-->\r\n               <EXLIN>?</EXLIN>\r\n               <!--Optional:-->\r\n               <EXSNR>?</EXSNR>\r\n               <!--Optional:-->\r\n               <EHTYP>?</EHTYP>\r\n               <!--Optional:-->\r\n               <RETPC>?</RETPC>\r\n               <!--Optional:-->\r\n               <DPTYP>?</DPTYP>\r\n               <!--Optional:-->\r\n               <DPPCT>?</DPPCT>\r\n               <!--Optional:-->\r\n               <DPAMT>?</DPAMT>\r\n               <!--Optional:-->\r\n               <DPDAT>?</DPDAT>\r\n               <!--Optional:-->\r\n               <FLS_RSTO>?</FLS_RSTO>\r\n               <!--Optional:-->\r\n               <EXT_RFX_NUMBER>?</EXT_RFX_NUMBER>\r\n               <!--Optional:-->\r\n               <EXT_RFX_ITEM>?</EXT_RFX_ITEM>\r\n               <!--Optional:-->\r\n               <EXT_RFX_SYSTEM>?</EXT_RFX_SYSTEM>\r\n               <!--Optional:-->\r\n               <SRM_CONTRACT_ID>?</SRM_CONTRACT_ID>\r\n               <!--Optional:-->\r\n               <SRM_CONTRACT_ITM>?</SRM_CONTRACT_ITM>\r\n               <!--Optional:-->\r\n               <BLK_REASON_ID>?</BLK_REASON_ID>\r\n               <!--Optional:-->\r\n               <BLK_REASON_TXT>?</BLK_REASON_TXT>\r\n               <!--Optional:-->\r\n               <ITCONS>?</ITCONS>\r\n               <!--Optional:-->\r\n               <FIXMG>?</FIXMG>\r\n               <!--Optional:-->\r\n               <WABWE>?</WABWE>\r\n               <!--Optional:-->\r\n               <CMPL_DLV_ITM>?</CMPL_DLV_ITM>\r\n               <!--Optional:-->\r\n               <INCO2_L>?</INCO2_L>\r\n               <!--Optional:-->\r\n               <INCO3_L>?</INCO3_L>\r\n               <!--Optional:-->\r\n               <TC_AUT_DET>?</TC_AUT_DET>\r\n               <!--Optional:-->\r\n               <MANUAL_TC_REASON>?</MANUAL_TC_REASON>\r\n               <!--Optional:-->\r\n               <FISCAL_INCENTIVE>?</FISCAL_INCENTIVE>\r\n               <!--Optional:-->\r\n               <TAX_SUBJECT_ST>?</TAX_SUBJECT_ST>\r\n               <!--Optional:-->\r\n               <FISCAL_INCENTIVE_ID>?</FISCAL_INCENTIVE_ID>\r\n               <!--Optional:-->\r\n               <SF_TXJCD>?</SF_TXJCD>\r\n               <!--Optional:-->\r\n               <_-BEV1_-NEGEN_ITEM>?</_-BEV1_-NEGEN_ITEM>\r\n               <!--Optional:-->\r\n               <_-BEV1_-NEDEPFREE>?</_-BEV1_-NEDEPFREE>\r\n               <!--Optional:-->\r\n               <_-BEV1_-NESTRUCCAT>?</_-BEV1_-NESTRUCCAT>\r\n               <!--Optional:-->\r\n               <ADVCODE>?</ADVCODE>\r\n               <!--Optional:-->\r\n               <BUDGET_PD>?</BUDGET_PD>\r\n               <!--Optional:-->\r\n               <EXCPE>?</EXCPE>\r\n               <!--Optional:-->\r\n               <FMFGUS_KEY>?</FMFGUS_KEY>\r\n               <!--Optional:-->\r\n               <IUID_RELEVANT>?</IUID_RELEVANT>\r\n               <!--Optional:-->\r\n               <MRPIND>?</MRPIND>\r\n               <!--Optional:-->\r\n               <SGT_SCAT>?</SGT_SCAT>\r\n               <!--Optional:-->\r\n               <SGT_RCAT>?</SGT_RCAT>\r\n               <!--Optional:-->\r\n               <WRF_CHARSTC1>?</WRF_CHARSTC1>\r\n               <!--Optional:-->\r\n               <WRF_CHARSTC2>?</WRF_CHARSTC2>\r\n               <!--Optional:-->\r\n               <WRF_CHARSTC3>?</WRF_CHARSTC3>\r\n               <!--Optional:-->\r\n               <REFSITE>?</REFSITE>\r\n               <!--Optional:-->\r\n               <SERRU>?</SERRU>\r\n               <!--Optional:-->\r\n               <SERNP>?</SERNP>\r\n               <!--Optional:-->\r\n               <DISUB_SOBKZ>?</DISUB_SOBKZ>\r\n               <!--Optional:-->\r\n               <DISUB_PSPNR>?</DISUB_PSPNR>\r\n               <!--Optional:-->\r\n               <DISUB_KUNNR>?</DISUB_KUNNR>\r\n               <!--Optional:-->\r\n               <DISUB_VBELN>?</DISUB_VBELN>\r\n               <!--Optional:-->\r\n               <DISUB_POSNR>?</DISUB_POSNR>\r\n               <!--Optional:-->\r\n               <DISUB_OWNER>?</DISUB_OWNER>\r\n               <!--Optional:-->\r\n               <FSH_SEASON_YEAR>?</FSH_SEASON_YEAR>\r\n               <!--Optional:-->\r\n               <FSH_SEASON>?</FSH_SEASON>\r\n               <!--Optional:-->\r\n               <FSH_COLLECTION>?</FSH_COLLECTION>\r\n               <!--Optional:-->\r\n               <FSH_THEME>?</FSH_THEME>\r\n               <!--Optional:-->\r\n               <FSH_ATP_DATE>?</FSH_ATP_DATE>\r\n               <!--Optional:-->\r\n               <FSH_VAS_REL>?</FSH_VAS_REL>\r\n               <!--Optional:-->\r\n               <FSH_VAS_PRNT_ID>?</FSH_VAS_PRNT_ID>\r\n               <!--Optional:-->\r\n               <FSH_TRANSACTION>?</FSH_TRANSACTION>\r\n               <!--Optional:-->\r\n               <FSH_ITEM_GROUP>?</FSH_ITEM_GROUP>\r\n               <!--Optional:-->\r\n               <FSH_ITEM>?</FSH_ITEM>\r\n               <!--Optional:-->\r\n               <FSH_SS>?</FSH_SS>\r\n               <!--Optional:-->\r\n               <FSH_GRID_COND_REC>?</FSH_GRID_COND_REC>\r\n               <!--Optional:-->\r\n               <FSH_PSM_PFM_SPLIT>?</FSH_PSM_PFM_SPLIT>\r\n               <!--Optional:-->\r\n               <CNFM_QTY>?</CNFM_QTY>\r\n               <!--Optional:-->\r\n               <REF_ITEM>?</REF_ITEM>\r\n               <!--Optional:-->\r\n               <SOURCE_ID>?</SOURCE_ID>\r\n               <!--Optional:-->\r\n               <SOURCE_KEY>?</SOURCE_KEY>\r\n               <!--Optional:-->\r\n               <PUT_BACK>?</PUT_BACK>\r\n               <!--Optional:-->\r\n               <POL_ID>?</POL_ID>\r\n               <!--Optional:-->\r\n               <CONS_ORDER>?</CONS_ORDER>\r\n            </item>\r\n         </EKPODATA>\r\n         <QUOTHEAD>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               <!--Optional:-->\r\n               <DOC_NUMBER>?</DOC_NUMBER>\r\n               <!--Optional:-->\r\n               <CO_CODE>?</CO_CODE>\r\n               <!--Optional:-->\r\n               <DOC_CAT>?</DOC_CAT>\r\n               <!--Optional:-->\r\n               <DOC_TYPE>?</DOC_TYPE>\r\n               <!--Optional:-->\r\n               <CNTRL_IND>?</CNTRL_IND>\r\n               <!--Optional:-->\r\n               <DELETE_IND>?</DELETE_IND>\r\n               <!--Optional:-->\r\n               <STATUS>?</STATUS>\r\n               <!--Optional:-->\r\n               <CREATED_ON>?</CREATED_ON>\r\n               <!--Optional:-->\r\n               <CREATED_BY>?</CREATED_BY>\r\n               <!--Optional:-->\r\n               <ITEM_INTVL>?</ITEM_INTVL>\r\n               <!--Optional:-->\r\n               <LAST_ITEM>?</LAST_ITEM>\r\n               <!--Optional:-->\r\n               <VENDOR>?</VENDOR>\r\n               <!--Optional:-->\r\n               <LANGUAGE>?</LANGUAGE>\r\n               <!--Optional:-->\r\n               <PMNTTRMS>?</PMNTTRMS>\r\n               <!--Optional:-->\r\n               <DSCNT1_TO>?</DSCNT1_TO>\r\n               <!--Optional:-->\r\n               <DSCNT2_TO>?</DSCNT2_TO>\r\n               <!--Optional:-->\r\n               <DSCNT3_TO>?</DSCNT3_TO>\r\n               <!--Optional:-->\r\n               <CASH_DISC1>?</CASH_DISC1>\r\n               <!--Optional:-->\r\n               <CASH_DISC2>?</CASH_DISC2>\r\n               <!--Optional:-->\r\n               <PURCH_ORG>?</PURCH_ORG>\r\n               <!--Optional:-->\r\n               <PUR_GROUP>?</PUR_GROUP>\r\n               <!--Optional:-->\r\n               <CURRENCY>?</CURRENCY>\r\n               <!--Optional:-->\r\n               <EXCH_RATE>?</EXCH_RATE>\r\n               <!--Optional:-->\r\n               <EX_RATE_FX>?</EX_RATE_FX>\r\n               <!--Optional:-->\r\n               <DOC_DATE>?</DOC_DATE>\r\n               <!--Optional:-->\r\n               <VPER_START>?</VPER_START>\r\n               <!--Optional:-->\r\n               <VPER_END>?</VPER_END>\r\n               <!--Optional:-->\r\n               <APPLIC_BY>?</APPLIC_BY>\r\n               <!--Optional:-->\r\n               <QUOT_DEAD>?</QUOT_DEAD>\r\n               <!--Optional:-->\r\n               <BINDG_PER>?</BINDG_PER>\r\n               <!--Optional:-->\r\n               <WARRANTY>?</WARRANTY>\r\n               <!--Optional:-->\r\n               <BIDINV_NO>?</BIDINV_NO>\r\n               <!--Optional:-->\r\n               <QUOTATION>?</QUOTATION>\r\n               <!--Optional:-->\r\n               <QUOT_DATE>?</QUOT_DATE>\r\n               <!--Optional:-->\r\n               <REF_1>?</REF_1>\r\n               <!--Optional:-->\r\n               <SALES_PERS>?</SALES_PERS>\r\n               <!--Optional:-->\r\n               <TELEPHONE>?</TELEPHONE>\r\n               <!--Optional:-->\r\n               <SUPPL_VEND>?</SUPPL_VEND>\r\n               <!--Optional:-->\r\n               <CUSTOMER>?</CUSTOMER>\r\n               <!--Optional:-->\r\n               <AGREEMENT>?</AGREEMENT>\r\n               <!--Optional:-->\r\n               <REJ_REASON>?</REJ_REASON>\r\n               <!--Optional:-->\r\n               <COMPL_DLV>?</COMPL_DLV>\r\n               <!--Optional:-->\r\n               <GR_MESSAGE>?</GR_MESSAGE>\r\n               <!--Optional:-->\r\n               <SUPPL_PLNT>?</SUPPL_PLNT>\r\n               <!--Optional:-->\r\n               <RCVG_VEND>?</RCVG_VEND>\r\n               <!--Optional:-->\r\n               <INCOTERMS1>?</INCOTERMS1>\r\n               <!--Optional:-->\r\n               <INCOTERMS2>?</INCOTERMS2>\r\n               <!--Optional:-->\r\n               <TARGET_VAL>?</TARGET_VAL>\r\n               <!--Optional:-->\r\n               <COLL_NO>?</COLL_NO>\r\n               <!--Optional:-->\r\n               <DOC_COND>?</DOC_COND>\r\n               <!--Optional:-->\r\n               <PROCEDURE>?</PROCEDURE>\r\n               <!--Optional:-->\r\n               <UPDATE_GRP>?</UPDATE_GRP>\r\n               <!--Optional:-->\r\n               <DIFF_INV>?</DIFF_INV>\r\n               <!--Optional:-->\r\n               <EXPORT_NO>?</EXPORT_NO>\r\n               <!--Optional:-->\r\n               <OUR_REF>?</OUR_REF>\r\n               <!--Optional:-->\r\n               <LOGSYSTEM>?</LOGSYSTEM>\r\n               <!--Optional:-->\r\n               <SUBITEMINT>?</SUBITEMINT>\r\n               <!--Optional:-->\r\n               <MAST_COND>?</MAST_COND>\r\n               <!--Optional:-->\r\n               <REL_GROUP>?</REL_GROUP>\r\n               <!--Optional:-->\r\n               <REL_STRAT>?</REL_STRAT>\r\n               <!--Optional:-->\r\n               <REL_IND>?</REL_IND>\r\n               <!--Optional:-->\r\n               <REL_STATUS>?</REL_STATUS>\r\n               <!--Optional:-->\r\n               <SUBJ_TO_R>?</SUBJ_TO_R>\r\n               <!--Optional:-->\r\n               <TAXR_CNTRY>?</TAXR_CNTRY>\r\n               <!--Optional:-->\r\n               <SCHED_IND>?</SCHED_IND>\r\n               <!--Optional:-->\r\n               <VEND_NAME>?</VEND_NAME>\r\n               <!--Optional:-->\r\n               <CURRENCY_ISO>?</CURRENCY_ISO>\r\n               <!--Optional:-->\r\n               <EXCH_RATE_CM>?</EXCH_RATE_CM>\r\n               <!--Optional:-->\r\n               <TRNSP_MODE>?</TRNSP_MODE>\r\n               <!--Optional:-->\r\n               <CUSTOMS>?</CUSTOMS>\r\n            </item>\r\n         </QUOTHEAD>\r\n         <QUOTVALUES>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               <!--Optional:-->\r\n               <DOC_NUMBER>?</DOC_NUMBER>\r\n               <!--Optional:-->\r\n               <DOC_ITEM>?</DOC_ITEM>\r\n               <!--Optional:-->\r\n               <DELETE_IND>?</DELETE_IND>\r\n               <!--Optional:-->\r\n               <STATUS>?</STATUS>\r\n               <!--Optional:-->\r\n               <CHANGED_ON>?</CHANGED_ON>\r\n               <!--Optional:-->\r\n               <SHORT_TEXT>?</SHORT_TEXT>\r\n               <!--Optional:-->\r\n               <MATERIAL>?</MATERIAL>\r\n               <!--Optional:-->\r\n               <PUR_MAT>?</PUR_MAT>\r\n               <!--Optional:-->\r\n               <CO_CODE>?</CO_CODE>\r\n               <!--Optional:-->\r\n               <PLANT>?</PLANT>\r\n               <!--Optional:-->\r\n               <STORE_LOC>?</STORE_LOC>\r\n               <!--Optional:-->\r\n               <TRACKINGNO>?</TRACKINGNO>\r\n               <!--Optional:-->\r\n               <MAT_GRP>?</MAT_GRP>\r\n               <!--Optional:-->\r\n               <INFO_REC>?</INFO_REC>\r\n               <!--Optional:-->\r\n               <VEND_MAT>?</VEND_MAT>\r\n               <!--Optional:-->\r\n               <TARGET_QTY>?</TARGET_QTY>\r\n               <!--Optional:-->\r\n               <QUANTITY>?</QUANTITY>\r\n               <!--Optional:-->\r\n               <UNIT>?</UNIT>\r\n               <!--Optional:-->\r\n               <ORDERPR_UN>?</ORDERPR_UN>\r\n               <!--Optional:-->\r\n               <CONV_NUM1>?</CONV_NUM1>\r\n               <!--Optional:-->\r\n               <CONV_DEN1>?</CONV_DEN1>\r\n               <!--Optional:-->\r\n               <CONV_NUM2>?</CONV_NUM2>\r\n               <!--Optional:-->\r\n               <CONV_DEN2>?</CONV_DEN2>\r\n               <!--Optional:-->\r\n               <NET_PRICE>?</NET_PRICE>\r\n               <!--Optional:-->\r\n               <PRICE_UNIT>?</PRICE_UNIT>\r\n               <!--Optional:-->\r\n               <NET_VALUE>?</NET_VALUE>\r\n               <!--Optional:-->\r\n               <GROS_VALUE>?</GROS_VALUE>\r\n               <!--Optional:-->\r\n               <QUOT_DEAD>?</QUOT_DEAD>\r\n               <!--Optional:-->\r\n               <GR_PR_TIME>?</GR_PR_TIME>\r\n               <!--Optional:-->\r\n               <TAX_CODE>?</TAX_CODE>\r\n               <!--Optional:-->\r\n               <SETT_GRP1>?</SETT_GRP1>\r\n               <!--Optional:-->\r\n               <QUAL_INSP>?</QUAL_INSP>\r\n               <!--Optional:-->\r\n               <INFO_UPD>?</INFO_UPD>\r\n               <!--Optional:-->\r\n               <PRNT_PRICE>?</PRNT_PRICE>\r\n               <!--Optional:-->\r\n               <EST_PRICE>?</EST_PRICE>\r\n               <!--Optional:-->\r\n               <NUM_REMIND>?</NUM_REMIND>\r\n               <!--Optional:-->\r\n               <REMINDER1>?</REMINDER1>\r\n               <!--Optional:-->\r\n               <REMINDER2>?</REMINDER2>\r\n               <!--Optional:-->\r\n               <REMINDER3>?</REMINDER3>\r\n               <!--Optional:-->\r\n               <OVERDELTOL>?</OVERDELTOL>\r\n               <!--Optional:-->\r\n               <UNLIMITED>?</UNLIMITED>\r\n               <!--Optional:-->\r\n               <UNDER_TOL>?</UNDER_TOL>\r\n               <!--Optional:-->\r\n               <VAL_TYPE>?</VAL_TYPE>\r\n               <!--Optional:-->\r\n               <VAL_CAT>?</VAL_CAT>\r\n               <!--Optional:-->\r\n               <REJ_IND>?</REJ_IND>\r\n               <!--Optional:-->\r\n               <COMMENT>?</COMMENT>\r\n               <!--Optional:-->\r\n               <DEL_COMPL>?</DEL_COMPL>\r\n               <!--Optional:-->\r\n               <FINAL_INV>?</FINAL_INV>\r\n               <!--Optional:-->\r\n               <ITEM_CAT>?</ITEM_CAT>\r\n               <!--Optional:-->\r\n               <ACCTASSCAT>?</ACCTASSCAT>\r\n               <!--Optional:-->\r\n               <CONSUMPT>?</CONSUMPT>\r\n               <!--Optional:-->\r\n               <DISTRIB>?</DISTRIB>\r\n               <!--Optional:-->\r\n               <PART_INV>?</PART_INV>\r\n               <!--Optional:-->\r\n               <GR_IND>?</GR_IND>\r\n               <!--Optional:-->\r\n               <GR_NON_VAL>?</GR_NON_VAL>\r\n               <!--Optional:-->\r\n               <IR_IND>?</IR_IND>\r\n               <!--Optional:-->\r\n               <GR_BASEDIV>?</GR_BASEDIV>\r\n               <!--Optional:-->\r\n               <ACKN_REQD>?</ACKN_REQD>\r\n               <!--Optional:-->\r\n               <ACKNOWL_NO>?</ACKNOWL_NO>\r\n               <!--Optional:-->\r\n               <AGREEMENT>?</AGREEMENT>\r\n               <!--Optional:-->\r\n               <AGMT_ITEM>?</AGMT_ITEM>\r\n               <!--Optional:-->\r\n               <RECON_DATE>?</RECON_DATE>\r\n               <!--Optional:-->\r\n               <AGRCUMQTY>?</AGRCUMQTY>\r\n               <!--Optional:-->\r\n               <FIRM_ZONE>?</FIRM_ZONE>\r\n               <!--Optional:-->\r\n               <TRADE_OFF>?</TRADE_OFF>\r\n               <!--Optional:-->\r\n               <BOM_EXPL>?</BOM_EXPL>\r\n               <!--Optional:-->\r\n               <EXCLUSION>?</EXCLUSION>\r\n               <!--Optional:-->\r\n               <BASE_UNIT>?</BASE_UNIT>\r\n               <!--Optional:-->\r\n               <SHIPPING>?</SHIPPING>\r\n               <!--Optional:-->\r\n               <OUTL_TARGV>?</OUTL_TARGV>\r\n               <!--Optional:-->\r\n               <NOND_ITAX>?</NOND_ITAX>\r\n               <!--Optional:-->\r\n               <RELORD_QTY>?</RELORD_QTY>\r\n               <!--Optional:-->\r\n               <PRICE_DATE>?</PRICE_DATE>\r\n               <!--Optional:-->\r\n               <DOC_CAT>?</DOC_CAT>\r\n               <!--Optional:-->\r\n               <EFF_VALUE>?</EFF_VALUE>\r\n               <!--Optional:-->\r\n               <COMMITMENT>?</COMMITMENT>\r\n               <!--Optional:-->\r\n               <CUSTOMER>?</CUSTOMER>\r\n               <!--Optional:-->\r\n               <ADDRESS>?</ADDRESS>\r\n               <!--Optional:-->\r\n               <COND_GROUP>?</COND_GROUP>\r\n               <!--Optional:-->\r\n               <NO_C_DISC>?</NO_C_DISC>\r\n               <!--Optional:-->\r\n               <UPDATE_GRP>?</UPDATE_GRP>\r\n               <!--Optional:-->\r\n               <PLAN_DEL>?</PLAN_DEL>\r\n               <!--Optional:-->\r\n               <NET_WEIGHT>?</NET_WEIGHT>\r\n               <!--Optional:-->\r\n               <WEIGHTUNIT>?</WEIGHTUNIT>\r\n               <!--Optional:-->\r\n               <TAX_JUR_CD>?</TAX_JUR_CD>\r\n               <!--Optional:-->\r\n               <PRINT_REL>?</PRINT_REL>\r\n               <!--Optional:-->\r\n               <SPEC_STOCK>?</SPEC_STOCK>\r\n               <!--Optional:-->\r\n               <SETRESERNO>?</SETRESERNO>\r\n               <!--Optional:-->\r\n               <SETTLITMNO>?</SETTLITMNO>\r\n               <!--Optional:-->\r\n               <NOT_CHGBL>?</NOT_CHGBL>\r\n               <!--Optional:-->\r\n               <CTR_KEY_QM>?</CTR_KEY_QM>\r\n               <!--Optional:-->\r\n               <CERT_TYPE>?</CERT_TYPE>\r\n               <!--Optional:-->\r\n               <EAN_UPC>?</EAN_UPC>\r\n               <!--Optional:-->\r\n               <CONF_CTRL>?</CONF_CTRL>\r\n               <!--Optional:-->\r\n               <REV_LEV>?</REV_LEV>\r\n               <!--Optional:-->\r\n               <FUND>?</FUND>\r\n               <!--Optional:-->\r\n               <FUNDS_CTR>?</FUNDS_CTR>\r\n               <!--Optional:-->\r\n               <CMMT_ITEM>?</CMMT_ITEM>\r\n               <!--Optional:-->\r\n               <BA_PARTNER>?</BA_PARTNER>\r\n               <!--Optional:-->\r\n               <PTR_ASS_BA>?</PTR_ASS_BA>\r\n               <!--Optional:-->\r\n               <PROFIT_CTR>?</PROFIT_CTR>\r\n               <!--Optional:-->\r\n               <PARTNER_PC>?</PARTNER_PC>\r\n               <!--Optional:-->\r\n               <PRICE_CTR>?</PRICE_CTR>\r\n               <!--Optional:-->\r\n               <GROSS_WGHT>?</GROSS_WGHT>\r\n               <!--Optional:-->\r\n               <VOLUME>?</VOLUME>\r\n               <!--Optional:-->\r\n               <VOLUMEUNIT>?</VOLUMEUNIT>\r\n               <!--Optional:-->\r\n               <INCOTERMS1>?</INCOTERMS1>\r\n               <!--Optional:-->\r\n               <INCOTERMS2>?</INCOTERMS2>\r\n               <!--Optional:-->\r\n               <ADVANCE>?</ADVANCE>\r\n               <!--Optional:-->\r\n               <PRIOR_VEND>?</PRIOR_VEND>\r\n               <!--Optional:-->\r\n               <SUB_RANGE>?</SUB_RANGE>\r\n               <!--Optional:-->\r\n               <PCKG_NO>?</PCKG_NO>\r\n               <!--Optional:-->\r\n               <STATISTIC>?</STATISTIC>\r\n               <!--Optional:-->\r\n               <HL_ITEM>?</HL_ITEM>\r\n               <!--Optional:-->\r\n               <GR_TO_DATE>?</GR_TO_DATE>\r\n               <!--Optional:-->\r\n               <SUPPL_VEND>?</SUPPL_VEND>\r\n               <!--Optional:-->\r\n               <SC_VENDOR>?</SC_VENDOR>\r\n               <!--Optional:-->\r\n               <CONF_MATL>?</CONF_MATL>\r\n               <!--Optional:-->\r\n               <MAT_CAT>?</MAT_CAT>\r\n               <!--Optional:-->\r\n               <KANBAN_IND>?</KANBAN_IND>\r\n               <!--Optional:-->\r\n               <ADDRESS2>?</ADDRESS2>\r\n               <!--Optional:-->\r\n               <INT_OBJ_NO>?</INT_OBJ_NO>\r\n               <!--Optional:-->\r\n               <ERS>?</ERS>\r\n               <!--Optional:-->\r\n               <GRSETTFROM>?</GRSETTFROM>\r\n               <!--Optional:-->\r\n               <LAST_TRANS>?</LAST_TRANS>\r\n               <!--Optional:-->\r\n               <TRANS_TIME>?</TRANS_TIME>\r\n               <!--Optional:-->\r\n               <SER_NO>?</SER_NO>\r\n               <!--Optional:-->\r\n               <PROMOTION>?</PROMOTION>\r\n               <!--Optional:-->\r\n               <ALLOC_TBL>?</ALLOC_TBL>\r\n               <!--Optional:-->\r\n               <AT_ITEM>?</AT_ITEM>\r\n               <!--Optional:-->\r\n               <POINTS>?</POINTS>\r\n               <!--Optional:-->\r\n               <POINTS_UN>?</POINTS_UN>\r\n               <!--Optional:-->\r\n               <SEASON_TY>?</SEASON_TY>\r\n               <!--Optional:-->\r\n               <SEASON_YR>?</SEASON_YR>\r\n               <!--Optional:-->\r\n               <SETT_GRP_2>?</SETT_GRP_2>\r\n               <!--Optional:-->\r\n               <SETT_GRP_3>?</SETT_GRP_3>\r\n               <!--Optional:-->\r\n               <SETT_ITEM>?</SETT_ITEM>\r\n               <!--Optional:-->\r\n               <ML_AKT>?</ML_AKT>\r\n               <!--Optional:-->\r\n               <REMSHLIFE>?</REMSHLIFE>\r\n               <!--Optional:-->\r\n               <RFQ>?</RFQ>\r\n               <!--Optional:-->\r\n               <RFQ_ITEM>?</RFQ_ITEM>\r\n               <!--Optional:-->\r\n               <CONFIG_ORG>?</CONFIG_ORG>\r\n               <!--Optional:-->\r\n               <QUOTAUSAGE>?</QUOTAUSAGE>\r\n               <!--Optional:-->\r\n               <SPSTCK_PHY>?</SPSTCK_PHY>\r\n               <!--Optional:-->\r\n               <PREQ_NO>?</PREQ_NO>\r\n               <!--Optional:-->\r\n               <PREQ_ITEM>?</PREQ_ITEM>\r\n               <!--Optional:-->\r\n               <MAT_TYPE>?</MAT_TYPE>\r\n               <!--Optional:-->\r\n               <SI_CAT>?</SI_CAT>\r\n               <!--Optional:-->\r\n               <SUB_ITEMS>?</SUB_ITEMS>\r\n               <!--Optional:-->\r\n               <SUBTOTAL_1>?</SUBTOTAL_1>\r\n               <!--Optional:-->\r\n               <SUBTOTAL_2>?</SUBTOTAL_2>\r\n               <!--Optional:-->\r\n               <SUBTOTAL_3>?</SUBTOTAL_3>\r\n               <!--Optional:-->\r\n               <SUBTOTAL_4>?</SUBTOTAL_4>\r\n               <!--Optional:-->\r\n               <SUBTOTAL_5>?</SUBTOTAL_5>\r\n               <!--Optional:-->\r\n               <SUBTOTAL_6>?</SUBTOTAL_6>\r\n               <!--Optional:-->\r\n               <SUBITM_KEY>?</SUBITM_KEY>\r\n               <!--Optional:-->\r\n               <MAX_CMG>?</MAX_CMG>\r\n               <!--Optional:-->\r\n               <MAX_CPGO>?</MAX_CPGO>\r\n               <!--Optional:-->\r\n               <RET_ITEM>?</RET_ITEM>\r\n               <!--Optional:-->\r\n               <AT_RELEV>?</AT_RELEV>\r\n               <!--Optional:-->\r\n               <ORD_REAS>?</ORD_REAS>\r\n               <!--Optional:-->\r\n               <DEL_TYP_RT>?</DEL_TYP_RT>\r\n               <!--Optional:-->\r\n               <PRDTE_CTRL>?</PRDTE_CTRL>\r\n               <!--Optional:-->\r\n               <MANUF_PROF>?</MANUF_PROF>\r\n               <!--Optional:-->\r\n               <MANU_MAT>?</MANU_MAT>\r\n               <!--Optional:-->\r\n               <MFR_NO>?</MFR_NO>\r\n               <!--Optional:-->\r\n               <MFR_NO_EXT>?</MFR_NO_EXT>\r\n               <!--Optional:-->\r\n               <ITEM_CAT_EXT>?</ITEM_CAT_EXT>\r\n               <!--Optional:-->\r\n               <PO_UNIT_ISO>?</PO_UNIT_ISO>\r\n               <!--Optional:-->\r\n               <ORDERPR_UN_ISO>?</ORDERPR_UN_ISO>\r\n               <!--Optional:-->\r\n               <BASE_UOM_ISO>?</BASE_UOM_ISO>\r\n               <!--Optional:-->\r\n               <WEIGHTUNIT_ISO>?</WEIGHTUNIT_ISO>\r\n               <!--Optional:-->\r\n               <VOLUMEUNIT_ISO>?</VOLUMEUNIT_ISO>\r\n               <!--Optional:-->\r\n               <POINTS_UN_ISO>?</POINTS_UN_ISO>\r\n               <!--Optional:-->\r\n               <PREQ_NAME>?</PREQ_NAME>\r\n               <!--Optional:-->\r\n               <BUS_TRANST>?</BUS_TRANST>\r\n               <!--Optional:-->\r\n               <EXPIMPPROC>?</EXPIMPPROC>\r\n               <!--Optional:-->\r\n               <COMM_CODE>?</COMM_CODE>\r\n               <!--Optional:-->\r\n               <REG_ORIGIN>?</REG_ORIGIN>\r\n               <!--Optional:-->\r\n               <COUNT_ORIG>?</COUNT_ORIG>\r\n               <!--Optional:-->\r\n               <PO_PRICE>?</PO_PRICE>\r\n               <!--Optional:-->\r\n               <NO_ROUNDING>?</NO_ROUNDING>\r\n            </item>\r\n         </QUOTVALUES>\r\n      </urn:ZPB_VEN_RFQ>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

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
      result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_RFQ.Response']['EKPODATA']['item']
      );
    
    res.json({
      a1:
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_RFQ.Response']['EKPODATA']['item']
   
    });
    });
  });
    


    // PURCHASE ORDER

    app.post("/purord",(req,res)=>{
      var user = req.body.user;
      console.log(req.body)
      var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_VEN_PURORD&receiverParty=&receiverService=&interface=SI_PB_VEN_PURORD&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDMwODEzMzkFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMzA4MTMzOTI4WjAjBgkqhkiG9w0BCQQxFgQURtV0rccTHJbIvKYeZGTzAoH94RowCQYHKoZIzjgEAwQwMC4CFQCqZIJ6eH%2FYq9WozAieEKmpBrWpZQIVAPFzKhBjk2lW2qijygfjb5VRbfMQ; JSESSIONID=XLT3pqvWlhdgHJYBDVRGLeUlwXLBhgF-Y2kA_SAPY7SKQ2uxoi9HhkgW0SuhY4nf; JSESSIONMARKID=131KGApmFriOf8soG-5R0lnQPWbXiiufbFMH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_VEN_PO>\r\n         <!--You may enter the following 4 items in any order-->\r\n         <VENDORID>5</VENDORID>\r\n         <!--Optional:-->\r\n         <IT_FLOW>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n         </IT_FLOW>\r\n         <!--Optional:-->\r\n         <IT_HEADER>\r\n            <!--Zero or more repetitions:-->\r\n                 \r\n         </IT_HEADER>\r\n         <!--Optional:-->\r\n         <IT_ITEM>\r\n            <!--Zero or more repetitions:-->\r\n            \r\n        \r\n         </IT_ITEM>\r\n      </urn:ZPB_VEN_PO>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

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
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_PO.Response']['IT_FLOW']['item']

    );
  
  res.json({
    a1:
  result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_PO.Response']['IT_FLOW']['item']
});
 
 
  });
});
  

//   // GOODSRECEIPT

  app.post("/goodsrecpt",(req,res)=>{
    var user = req.body.user;
    console.log(req.body)
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_VEN_GR&receiverParty=&receiverService=&interface=SI_PB_VEN_GR&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDIyODE0MDUFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMjI4MTQwNTAzWjAjBgkqhkiG9w0BCQQxFgQUpphiNQutXQ7tuED4clYOOsZ0wsowCQYHKoZIzjgEAwQvMC0CFQDIEtm3LueUNa5fTc5rLhyStAZ37AIUcZIrZprPre%2FOQYg6!r2j0ARECzQ%3D; JSESSIONID=vlBN3h83Ud4gFF_PqYfkW0nQUFeYhgF-Y2kA_SAP3dpCCjgGH64jZKLV7G_4lbc6; JSESSIONMARKID=6QBYDQoXP0uB6-51Mw8hB2kb6qrZPeWhHavX5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_VEN_GR>\r\n         <!--You may enter the following 4 items in any order-->\r\n         <VENDORID>5</VENDORID>\r\n         <T_GOODS_HEAD>\r\n            <!--Zero or more repetitions:-->\r\n     \r\n         </T_GOODS_HEAD>\r\n         <T_GOODS_VALUES>\r\n            <!--Zero or more repetitions:-->\r\n     \r\n         </T_GOODS_VALUES>\r\n         <T_OUT>\r\n            <!--Zero or more repetitions:-->\r\n     \r\n         </T_OUT>\r\n      </urn:ZPB_VEN_GR>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

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
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_GR.Response']['T_GOODS_HEAD']['item']
    );
  
  res.json({
  a1:
  result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_GR.Response']['T_GOODS_HEAD']['item']
 
  });
  });
});


// // INVOICEDETAILS

// // app.post("/invoice",(req,res)=>{
// //   var user = req.body.user;
// //    console.log(req.body)
// //     var request = require('request');
// //     var options = {
// //       'method': 'POST',
// //       'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_BHERMALADARSHJAIN_INV_AD&receiverParty=&receiverService=&interface=SI_BHERMALADARSHJAIN_INV&interfaceNamespace=http://BHERMAL_ADARSH_JAIN.com',
// //       'headers': {
// //         'Content-Type': 'text/xml;charset=UTF-8',
// //         'SOAPAction': 'http://sap.com/xi/WebService/soap1.1',
// //         'Authorization': 'Basic UE9VU0VSQDI6VGVjaEAyMDIy',
// //         'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDExMTEyNTgFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMTExMTI1ODMzWjAjBgkqhkiG9w0BCQQxFgQUcAPayAfZhSpmudQLnw!eTnDFPM8wCQYHKoZIzjgEAwQvMC0CFQC2F7baul5e5SiZRbVWpw6B5UBiRwIUEW6UZAJbcExSf3JGW!Ei9JGprD4%3D; JSESSIONID=IVTCdUhYMTwAVLNB5N8KSERVKemghQF-Y2kA_SAP-hHbD1Ucan6nJX7BEYiGVgJ9; JSESSIONMARKID=mF-UCg-GEaT2yQkmbydrtjS_aUMbMJg9cD_n5jaQA; saplb_*=(J2EE6906720)6906750'
// //       },
// //       body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZFM_INV_ADARSH>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <VENDORNUMBER>5</VENDORNUMBER>\r\n         <INVOICEDET_IT>\r\n            <!--Zero or more repetitions:-->\r\n         </INVOICEDET_IT>\r\n      </urn:ZFM_INV_ADARSH>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'
     
// //     };
    
// // request(options, function (error, response) {
// // if (error) throw new Error(error);
// // console.log(response.body);

// // var result1 = convert.xml2json(response.body, {
// //   compact: true,
// //   spaces: 4
// //   });
// //   const result2 = JSON.parse(result1);
// //   console.log(JSON.parse(result1));
// //   console.log(
// //     result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_INV_ADARSH.Response']['INVOICEDET_IT']['item']
// //     );
  
// //   res.json({
// //     a1:
// //   result2['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_INV_ADARSH.Response']['INVOICEDET_IT']['item']
 
// //   });
// //   });  

// // });

// // VENDORPROFILE

app.post("/profile",(req,res)=>{
  console.log(req.body)
    var Username = req.body.Username;
    var Password = req.body.Password;
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_VEN_PROFILE&receiverParty=&receiverService=&interface=SI_PB_VEN_PROFILE&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDMwODEzMzkFAAQAAAAICgAIUE9VU0VSQDL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMzA4MTMzOTI4WjAjBgkqhkiG9w0BCQQxFgQURtV0rccTHJbIvKYeZGTzAoH94RowCQYHKoZIzjgEAwQwMC4CFQCqZIJ6eH%2FYq9WozAieEKmpBrWpZQIVAPFzKhBjk2lW2qijygfjb5VRbfMQ; JSESSIONID=XLT3pqvWlhdgHJYBDVRGLeUlwXLBhgF-Y2kA_SAPY7SKQ2uxoi9HhkgW0SuhY4nf; JSESSIONMARKID=131KGApmFriOf8soG-5R0lnQPWbXiiufbFMH5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_VEN_PL>\r\n         <VENDORID>5</VENDORID>\r\n      </urn:ZPB_VEN_PL>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

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
  console.log(result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_PL.Response']['VENDPROFILE']);
  
  res.json({
    a1:
  result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_PL.Response']['VENDPROFILE']
 
  });
  });
});  




// // VENDOR CREDITDEBITMEMO

app.post("/cad",(req,res)=>{
  var user = req.body.user;
    console.log(req.body)
    var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_VEN_CAD1&receiverParty=&receiverService=&interface=SI_PB_VEN_CAD1&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-Type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDIyODE0MDUFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMjI4MTQwNTAzWjAjBgkqhkiG9w0BCQQxFgQUpphiNQutXQ7tuED4clYOOsZ0wsowCQYHKoZIzjgEAwQvMC0CFQDIEtm3LueUNa5fTc5rLhyStAZ37AIUcZIrZprPre%2FOQYg6!r2j0ARECzQ%3D; JSESSIONID=vlBN3h83Ud4gFF_PqYfkW0nQUFeYhgF-Y2kA_SAP3dpCCjgGH64jZKLV7G_4lbc6; JSESSIONMARKID=GnGptQfQMAQuO9zcbKQqxhep0qvyuS7NakvX5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_VEN_CAD1>\r\n         <!--You may enter the following 3 items in any order-->\r\n         <VENDORID>5</VENDORID>\r\n         <CREDIT_LIST>\r\n            <!--Zero or more repetitions:-->\r\n    \r\n         </CREDIT_LIST>\r\n         <DEBIT_LIST>\r\n            <!--Zero or more repetitions:-->\r\n         </DEBIT_LIST>\r\n      </urn:ZPB_VEN_CAD1>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

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
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_CAD1.Response']['CREDIT_LIST']['item']
    );
  
  res.json({
    a1:
  result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_CAD1.Response']['CREDIT_LIST']['item'],
 
  });
  });  
});



//VENDOR PAYMENTS AND AGING

app.post("/payment",(req,res)=>{
  var user = req.body.user;
  console.log(req.body)
  var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_PB_VEN_PAYMENT&receiverParty=&receiverService=&interface=SI_PB_VEN_PAYMENT&interfaceNamespace=http://pb_emp_portal.com',
  'headers': {
    'Content-type': 'text/xml;charset=UTF-8',
    'Action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDIyODE0MDUFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMjI4MTQwNTAzWjAjBgkqhkiG9w0BCQQxFgQUpphiNQutXQ7tuED4clYOOsZ0wsowCQYHKoZIzjgEAwQvMC0CFQDIEtm3LueUNa5fTc5rLhyStAZ37AIUcZIrZprPre%2FOQYg6!r2j0ARECzQ%3D; JSESSIONID=vlBN3h83Ud4gFF_PqYfkW0nQUFeYhgF-Y2kA_SAP3dpCCjgGH64jZKLV7G_4lbc6; JSESSIONMARKID=6QBYDQoXP0uB6-51Mw8hB2kb6qrZPeWhHavX5jaQA; saplb_*=(J2EE6906720)6906750'
  },
  body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZPB_VEN_PAA>\r\n         <VENDORNUMBER>5</VENDORNUMBER>\r\n      </urn:ZPB_VEN_PAA>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

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
    result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_PAA.Response']['PAYAGDET']['item']
    );
  
  res.json({
    a1:
  result2['SOAP:Envelope']['SOAP:Body']['ns0:ZPB_VEN_PAA.Response']['PAYAGDET']['item']
 
  });
  }); 
});
 app.listen(3030,()=>{

   console.log("Server running at port 3030");
  
  })