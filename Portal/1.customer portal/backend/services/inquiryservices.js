import request from 'request';
import { parseStringPromise } from 'xml2js';

export const getInquiryList = async (customerId) => {
  const soapEnvelope = `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
      <urn:ZCUST_INQUIRY63_FM>
        <IV_CUSTOMER_ID>${customerId}</IV_CUSTOMER_ID>
      </urn:ZCUST_INQUIRY63_FM>
    </soapenv:Body>
  </soapenv:Envelope>`;

  const options = {
    method: 'POST',
    url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zcust_inquiryservice63?sap-client=100',
    headers: {
      'SOAPAction': 'urn:sap-com:document:sap:rfc:functions',
      'Content-Type': 'text/xml',
      'Authorization': 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=',
      'Cookie': 'sap-usercontext=sap-client=100',
    },
    body: soapEnvelope,
  };

  return new Promise((resolve, reject) => {
    request(options, async (error, response) => {
      if (error) return reject(error);

      try {
        const parsed = await parseStringPromise(response.body, { explicitArray: false });
        const items =
          parsed['soap-env:Envelope']['soap-env:Body']?.['n0:ZCUST_INQUIRY63_FMResponse']?.ET_INQUIRY_LIST?.item || [];

        // Normalize single item into array
        const result = Array.isArray(items) ? items : [items];
        resolve(result);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
};
