import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const SAP_CLIENT = '100';

const PAYDATA_ENDPOINT = `http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zemp_paydataservice63?sap-client=${SAP_CLIENT}`;
const PAYPDF_ENDPOINT = `http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zemp_paypdfservice63?sap-client=${SAP_CLIENT}`;

const AUTH_HEADER = 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=';
const SOAP_ACTION = 'urn:sap-com:document:sap:rfc:functions';

export async function fetchPayslipData(employeeId) {
  const soapBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZEMP_PAYDATA63_FM>
          <EMPLOYEE_ID>${employeeId}</EMPLOYEE_ID>
        </urn:ZEMP_PAYDATA63_FM>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(PAYDATA_ENDPOINT, soapBody, {
      headers: {
        'Content-Type': 'text/xml',
        'SOAPAction': SOAP_ACTION,
        Authorization: AUTH_HEADER,
        Cookie: `sap-usercontext=sap-client=${SAP_CLIENT}`
      }
    });

    console.log('SAP fetchPayslipData response XML:', response.data);

    const parsedResult = await parseStringPromise(response.data, { explicitArray: false, ignoreAttrs: true });
    const soapBodyResp = parsedResult['soapenv:Envelope']['soapenv:Body'];
    const responseKey = Object.keys(soapBodyResp).find(k => k.toLowerCase().includes('zemp_paydata63_fmresponse'));
    if (!responseKey) throw new Error('Missing ZEMP_PAYDATA63_FMResponse in SOAP response');

    const payDataResp = soapBodyResp[responseKey];
    let paySlipDetails = payDataResp['PAYSLIP_DETAILS'];

    if (!paySlipDetails) throw new Error('PAYSLIP_DETAILS not found in SOAP response');

    if (!Array.isArray(paySlipDetails)) {
      const key = Object.keys(paySlipDetails).find(k => Array.isArray(paySlipDetails[k]));
      if (key) {
        paySlipDetails = paySlipDetails[key];
      } else {
        paySlipDetails = [paySlipDetails];
      }
    }

    return paySlipDetails;
  } catch (error) {
    console.error('Error in fetchPayslipData:', error);
    throw new Error(`Error fetching payslip data from SAP: ${error.message}`);
  }
}

export async function fetchPayslipPdf(employeeId) {
  const soapBody = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZEMP_PAYPDF63_FM>
          <EMPLOYEE_ID>${employeeId}</EMPLOYEE_ID>
        </urn:ZEMP_PAYPDF63_FM>
      </soapenv:Body>
    </soapenv:Envelope>`;

  try {
    const response = await axios.post(PAYPDF_ENDPOINT, soapBody, {
      headers: {
        'Content-Type': 'text/xml',
        'SOAPAction': SOAP_ACTION,
        Authorization: AUTH_HEADER,
        Cookie: `sap-usercontext=sap-client=${SAP_CLIENT}`
      }
    });

    console.log('SAP fetchPayslipPdf response XML:', response.data);

    const parsedResult = await parseStringPromise(response.data, { explicitArray: false, ignoreAttrs: true });
    const soapBodyResp = parsedResult['soapenv:Envelope']['soapenv:Body'];
    const responseKey = Object.keys(soapBodyResp).find(k => k.toLowerCase().includes('zemp_paypdf63_fmresponse'));
    if (!responseKey) throw new Error('Missing ZEMP_PAYPDF63_FMResponse in SOAP response');

    const payPdfResp = soapBodyResp[responseKey];
    const base64Pdf = payPdfResp['PAYSLIP_PDF'];

    if (!base64Pdf) throw new Error('PAYSLIP_PDF element missing in SOAP response');

    return base64Pdf;
  } catch (error) {
    console.error('Error in fetchPayslipPdf:', error);
    throw new Error(`Error fetching payslip PDF from SAP: ${error.message}`);
  }
}
