import request from 'request';
import xml2js from 'xml2js';

const SOAP_HEADERS = {
  'SOAPAction': 'urn:sap-com:document:sap:rfc:functions',
  'Content-Type': 'text/xml',
  'Authorization': 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=',
  'Cookie': 'sap-usercontext=sap-client=100'
};

function parseXml(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { explicitArray: false, ignoreAttrs: true }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

function getPayslipData(empId) {
  return new Promise((resolve, reject) => {
    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:urn="urn:sap-com:document:sap:rfc:functions">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:ZEMP_PAYSLIP63_FM>
            <I_EMP_ID>${empId}</I_EMP_ID>
          </urn:ZEMP_PAYSLIP63_FM>
        </soapenv:Body>
      </soapenv:Envelope>`;

    const options = {
      method: 'POST',
      url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zemp_payslipservice63?sap-client=100',
      headers: SOAP_HEADERS,
      body
    };

    request(options, (error, response) => {
      if (error) return reject(error);
      if (response.statusCode !== 200) return reject(new Error(`Status ${response.statusCode}`));
      resolve(response.body);
    });
  });
}

function getPayslipPdf(empId) {
  return new Promise((resolve, reject) => {
    const body = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:urn="urn:sap-com:document:sap:rfc:functions">
        <soapenv:Header/>
        <soapenv:Body>
          <urn:ZEMP_PAYSLIPPDF63_FM>
            <EMPLOYEE_ID>${empId}</EMPLOYEE_ID>
          </urn:ZEMP_PAYSLIPPDF63_FM>
        </soapenv:Body>
      </soapenv:Envelope>`;

    const options = {
      method: 'POST',
      url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zemp_payslippdfservice63?sap-client=100',
      headers: SOAP_HEADERS,
      body
    };

    request(options, (error, response) => {
      if (error) return reject(error);
      if (response.statusCode !== 200) return reject(new Error(`Status ${response.statusCode}`));
      resolve(response.body);
    });
  });
}

export async function fetchPayslip(empId) {
  const xml = await getPayslipData(empId);
  const result = await parseXml(xml);

  try {
    const items = result['soap-env:Envelope']['soap-env:Body']['n0:ZEMP_PAYSLIP63_FMResponse']['ET_PAYSLIP_DATA']['item'];
    return Array.isArray(items) ? items : [items];
  } catch (e) {
    throw new Error('Failed to parse payslip data from response');
  }
}

export async function fetchPayslipPdf(empId) {
  const xml = await getPayslipPdf(empId);
  const result = await parseXml(xml);

  try {
    const base64pdf = result['soap-env:Envelope']['soap-env:Body']['n0:ZEMP_PAYSLIPPDF63_FMResponse']['PAYSLIP_PDF'];
    return base64pdf;
  } catch (e) {
    throw new Error('Failed to parse payslip PDF from response');
  }
}
