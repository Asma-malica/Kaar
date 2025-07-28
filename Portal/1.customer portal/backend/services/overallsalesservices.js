import request from 'request';
import { parseString } from 'xml2js';

const sapUrl = 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zcust_overallsalesservice63?sap-client=100';
const soapAction = 'urn:sap-com:document:sap:rfc:functions';
const authHeader = 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=';  // Keep secure or use environment variables

const buildSoapEnvelope = (customerId) => `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:ZCUST_OVERALLSALES63_FM>
        <IV_CUSTOMER_ID>${customerId}</IV_CUSTOMER_ID>
     </urn:ZCUST_OVERALLSALES63_FM>
  </soapenv:Body>
</soapenv:Envelope>`;

export const fetchOverallSales = (customerId) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: sapUrl,
      headers: {
        'SOAPAction': soapAction,
        'Content-Type': 'text/xml',
        'Authorization': authHeader,
        'Cookie': 'sap-usercontext=sap-client=100'
      },
      body: buildSoapEnvelope(customerId)
    };

    request(options, (error, response) => {
      if (error) {
        console.error('Request error:', error);
        return reject(error);
      }

      if (response.statusCode !== 200) {
        return reject(new Error(`Status code: ${response.statusCode}`));
      }

      // Uncomment for debugging raw response XML
      // console.log('Raw XML response:', response.body);

      parseString(response.body, { explicitArray: false, ignoreAttrs: true }, (err, result) => {
        if (err) {
          console.error('XML parse error:', err);
          return reject(err);
        }

        try {
          // Find Envelope key with any namespace prefix, e.g. soap-env:Envelope
          const envelopeKey = Object.keys(result).find(key => key.includes('Envelope'));
          if (!envelopeKey) return resolve([]);

          const envelope = result[envelopeKey];

          // Find Body key, e.g. soap-env:Body
          const bodyKey = Object.keys(envelope).find(key => key.includes('Body'));
          if (!bodyKey) return resolve([]);

          const body = envelope[bodyKey];

          // Find the response node dynamically, e.g. n0:ZCUST_OVERALLSALES63_FMResponse
          const responseKey = Object.keys(body).find(key => key.includes('ZCUST_OVERALLSALES63_FMResponse'));
          if (!responseKey) return resolve([]);

          const responseContent = body[responseKey];

          // Extract the ET_OVERALL_SALES > item
          const salesList = responseContent?.ET_OVERALL_SALES?.item;
          if (!salesList) return resolve([]);

          const overallSales = Array.isArray(salesList) ? salesList : [salesList];

          resolve(overallSales);
        } catch (ex) {
          console.error('Error processing parsed XML:', ex);
          reject(new Error('Unexpected XML response format'));
        }
      });
    });
  });
};
