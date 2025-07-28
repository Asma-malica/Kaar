import request from 'request';
import { parseString } from 'xml2js';

const sapUrl = 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zcust_paymentservice63?sap-client=100';
const soapAction = 'urn:sap-com:document:sap:rfc:functions';
const authHeader = 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ='; // Move to environment var in production

const buildSoapEnvelope = (customerId) => `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCUST_PAYMENT63_FM>
        <IV_CUSTOMER_ID>${customerId}</IV_CUSTOMER_ID>
     </urn:ZCUST_PAYMENT63_FM>
  </soapenv:Body>
</soapenv:Envelope>`;

export const fetchPayments = (customerId) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: sapUrl,
      headers: {
        'SOAPAction': soapAction,
        'Content-Type': 'text/xml',
        'Authorization': authHeader,
        'Cookie': 'sap-usercontext=sap-client=100',
      },
      body: buildSoapEnvelope(customerId),
    };

    request(options, (error, response) => {
      if (error) {
        console.error('Request error:', error);
        return reject(error);
      }

      if (response.statusCode !== 200) {
        return reject(new Error(`SAP returned status code: ${response.statusCode}`));
      }

      // Uncomment below line to debug raw XML response if needed
      // console.log('Raw XML response:', response.body);

      parseString(response.body, { explicitArray: false, ignoreAttrs: true }, (err, result) => {
        if (err) {
          console.error('XML parsing error:', err);
          return reject(err);
        }

        try {
          // Find Envelope key (may have namespace prefix like soap-env)
          const envelopeKey = Object.keys(result).find(key => key.includes('Envelope'));
          if (!envelopeKey) return resolve([]);

          const envelope = result[envelopeKey];

          // Find Body key (may have namespace prefix like soap-env)
          const bodyKey = Object.keys(envelope).find(key => key.includes('Body'));
          if (!bodyKey) return resolve([]);

          const body = envelope[bodyKey];

          // Find the response wrapper key (likely prefixed, find dynamically)
          const responseKey = Object.keys(body).find(key => key.includes('ZCUST_PAYMENT63_FMResponse'));
          if (!responseKey) return resolve([]);

          const responseContent = body[responseKey];

          // Extract payment list items
          const paymentList = responseContent?.ET_PAYMENT_LIST?.item;

          if (!paymentList) return resolve([]);

          // Always return an array for consistency
          const payments = Array.isArray(paymentList) ? paymentList : [paymentList];

          resolve(payments);
        } catch (ex) {
          console.error('Error processing parsed XML:', ex);
          reject(new Error('Unexpected XML response format'));
        }
      });
    });
  });
};
