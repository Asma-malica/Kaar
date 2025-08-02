import https from 'https';
import http from 'http';
import { parseStringPromise } from 'xml2js';

const username = 'SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ='; // Base64 encoded user:pass
const clientSap = '100';

const SOAP_HEADERS = {
  'Content-Type': 'text/xml',
  'Authorization': `Basic ${username}`,
  'SOAPAction': 'urn:sap-com:document:sap:rfc:functions',
  'Cookie': `sap-usercontext=sap-client=${clientSap}`
};

const SOAP_ENVELOPE = (functionName, employeeId) => `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:${functionName}>
         <EMPLOYEE_ID>${employeeId}</EMPLOYEE_ID>
      </urn:${functionName}>
   </soapenv:Body>
</soapenv:Envelope>`;

function doSOAPRequest(url, xmlBody) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const lib = isHttps ? https : http;
    const urlObj = new URL(url);

    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        ...SOAP_HEADERS,
        'Content-Length': Buffer.byteLength(xmlBody),
      }
    };

    const req = lib.request(options, (res) => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(xmlBody);
    req.end();
  });
}

export async function getPayslipData(employeeId) {
  const url = `http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zemp_paydataservice63?sap-client=${clientSap}`;
  const xmlRequest = SOAP_ENVELOPE('ZEMP_PAYDATA63_FM', employeeId);

  const responseXml = await doSOAPRequest(url, xmlRequest);
  const result = await parseStringPromise(responseXml, { explicitArray: false });

  try {
    const body = result['soap-env:Envelope']['soap-env:Body'];
    const response = body['n0:ZEMP_PAYDATA63_FMResponse'];
    const payslipDetails = response['PAYSLIP_DETAILS']['item'];
    return payslipDetails;
  } catch (e) {
    throw new Error('Invalid response structure for payslip data.');
  }
}

export async function getPayslipPdf(employeeId) {
  const url = `http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zemp_paypdfservice63?sap-client=${clientSap}`;
  const xmlRequest = SOAP_ENVELOPE('ZEMP_PAYPDF63_FM', employeeId);

  const responseXml = await doSOAPRequest(url, xmlRequest);
  const result = await parseStringPromise(responseXml, { explicitArray: false });

  try {
    const body = result['soap-env:Envelope']['soap-env:Body'];
    const response = body['n0:ZEMP_PAYPDF63_FMResponse'];
    const base64Pdf = response['PAYSLIP_PDF'];
    return base64Pdf;
  } catch (e) {
    throw new Error('Invalid response structure for payslip pdf.');
  }
}
