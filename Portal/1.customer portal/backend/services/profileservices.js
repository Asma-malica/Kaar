// services/profileServices.js
import request from 'request';
import { parseStringPromise } from 'xml2js';

export const getCustomerProfile = (customerId) => {
  return new Promise((resolve, reject) => {
    const soapBody = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:ZCUST_PROFILE63_FM>
            <IV_CUSTOMER_ID>${customerId}</IV_CUSTOMER_ID>
          </urn:ZCUST_PROFILE63_FM>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    const options = {
      method: 'POST',
      url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zcust_profileservice63?sap-client=100',
      headers: {
        'SOAPAction': 'urn:sap-com:document:sap:rfc:functions',
        'Content-Type': 'text/xml',
        'Authorization': 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=',
        'Cookie': 'sap-usercontext=sap-client=100'
      },
      body: soapBody
    };

    request(options, async (error, response, body) => {
      if (error) return reject(error);

      try {
        const result = await parseStringPromise(body, { explicitArray: false });

        const soapBody = result['soap-env:Envelope']['soap-env:Body'];
        const profileData = soapBody['n0:ZCUST_PROFILE63_FMResponse']['ES_PROFILE'];

        resolve(profileData);
      } catch (err) {
        reject(`Failed to parse profile response: ${err}`);
      }
    });
  });
};
