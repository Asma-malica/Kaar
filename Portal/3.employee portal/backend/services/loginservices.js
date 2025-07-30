import request from 'request';
import { parseStringPromise } from 'xml2js';

export const getEmployeeData = (empId, password) => {
  return new Promise((resolve, reject) => {
    const soapXML = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:urn="urn:sap-com:document:sap:rfc:functions">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:ZEMP_LOGIN63_FM>
            <I_EMP_ID>${empId}</I_EMP_ID>
            <I_PASSWORD>${password}</I_PASSWORD>
          </urn:ZEMP_LOGIN63_FM>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    const options = {
      method: 'POST',
      url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zemp_loginservice63?sap-client=100',
      headers: {
        'SOAPAction': 'urn:sap-com:document:sap:rfc:functions',
        'Content-Type': 'text/xml',
        'Authorization': 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=',
        'Cookie': 'sap-usercontext=sap-client=100'
      },
      body: soapXML
    };

    request(options, async (error, response) => {
      if (error) return reject(error);

      try {
        const parsed = await parseStringPromise(response.body, { explicitArray: false });
        const result = parsed['soap-env:Envelope']['soap-env:Body']['n0:ZEMP_LOGIN63_FMResponse'];

        const status = result.E_STATUS;
        const message = result.E_MESSAGE;

        resolve({ status, message });
      } catch (err) {
        reject(err);
      }
    });
  });
};
