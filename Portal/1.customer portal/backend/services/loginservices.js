import request from 'request';

export const loginCustomer = (customerId, password, callback) => {
  const soapBody = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
     <soapenv:Header/>
     <soapenv:Body>
        <urn:ZCUST63_FM>
           <IV_KUNNR>${customerId}</IV_KUNNR>
           <IV_PASS>${password}</IV_PASS>
        </urn:ZCUST63_FM>
     </soapenv:Body>
  </soapenv:Envelope>`;

  const options = {
    method: 'POST',
    url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zcust_loginservices63?sap-client=100&',
    headers: {
      'SOAPAction': 'urn:sap-com:document:sap:rfc:functions',
      'Content-Type': 'text/xml',
      'Authorization': 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=',
      'Cookie': 'sap-usercontext=sap-client=100'
    },
    body: soapBody
  };

  request(options, (error, response, body) => {
    if (error) return callback(error, null);
    return callback(null, body);
  });
};
