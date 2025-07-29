import request from 'request';
import { parseString, processors } from 'xml2js';

// SAP service URLs
const INVOICE_DATA_URL = 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zcust_invoicedataservice63?sap-client=100';
const INVOICE_PDF_URL  = 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zcust_invoicedatapdfservice63?sap-client=100';

// Authorization header value (from your Postman)
const AUTHORIZATION_HEADER = 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=';  // base64 username:password

// Common headers for invoice data request
const headersInvoiceData = {
  'Content-Type': 'text/xml;charset=UTF-8',
  'SOAPAction': 'urn:sap-com:document:sap:rfc:functions',
  'Authorization': AUTHORIZATION_HEADER,
  'Cookie': 'sap-usercontext=sap-client=100',
};

// Common headers for invoice PDF request (same as above)
const headersInvoicePDF = {
  ...headersInvoiceData
};

// Create SOAP envelope with exact parameter names from your Postman examples

const createInvoiceDataEnvelope = (customerId) => `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
      <urn:Z63_INVOICE_FM>
        <I_CUSTOMER_ID>${customerId}</I_CUSTOMER_ID>
      </urn:Z63_INVOICE_FM>
    </soapenv:Body>
  </soapenv:Envelope>
`;

const createInvoicePDFEnvelope = (invoiceNumber) => `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
      <urn:Z63_INVOICEDATA_FM>
        <P_VBELN>${invoiceNumber}</P_VBELN>
      </urn:Z63_INVOICEDATA_FM>
    </soapenv:Body>
  </soapenv:Envelope>
`;

// xml2js parse options to strip namespace prefixes
const parseOptions = {
  explicitArray: false,
  tagNameProcessors: [processors.stripPrefix],
};

export const fetchInvoiceData = (customerId) => {
  return new Promise((resolve, reject) => {
    request.post({
      url: INVOICE_DATA_URL,
      headers: headersInvoiceData,
      body: createInvoiceDataEnvelope(customerId),
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      console.log('Raw SOAP Response (Invoice Data):\n', body);

      parseString(body, parseOptions, (err, result) => {
        if (err) {
          console.error('XML Parse Error:', err);
          return reject(new Error('Invalid SOAP response format for invoice data'));
        }

        console.log('Parsed SOAP Object (Invoice Data):\n', JSON.stringify(result, null, 2));

        try {
          // Access envelope -> body -> Z63_INVOICE_FMResponse -> E_INVOICE -> item
          const envelope = result.Envelope;
          if (!envelope) throw new Error('Envelope element not found');

          const bodyContent = envelope.Body;
          if (!bodyContent) throw new Error('Body element not found');

          const responseTag = bodyContent.Z63_INVOICE_FMResponse;
          if (!responseTag) throw new Error('Z63_INVOICE_FMResponse tag not found');

          const eInvoice = responseTag.E_INVOICE;
          if (!eInvoice) throw new Error('E_INVOICE element not found');

          let items = eInvoice.item;

          if (!items) {
            items = [];
          } else if (!Array.isArray(items)) {
            items = [items];
          }

          resolve(items);

        } catch (parseError) {
          console.error('Error extracting invoice data:', parseError.message);
          reject(new Error('Error extracting invoice data from SOAP response: ' + parseError.message));
        }
      });
    });
  });
};

export const fetchInvoicePDF = (invoiceNumber) => {
  return new Promise((resolve, reject) => {
    request.post({
      url: INVOICE_PDF_URL,
      headers: headersInvoicePDF,
      body: createInvoicePDFEnvelope(invoiceNumber),
      encoding: null, // important for binary data
    }, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      const bodyStr = body.toString();

      console.log('Raw SOAP Response (Invoice PDF):\n', bodyStr);

      parseString(bodyStr, parseOptions, (err, result) => {
        if (err) {
          console.error('XML Parse Error (PDF):', err);
          return reject(new Error('Invalid SOAP response format for PDF'));
        }

        console.log('Parsed SOAP Object (Invoice PDF):\n', JSON.stringify(result, null, 2));

        try {
          const envelope = result.Envelope;
          if (!envelope) throw new Error('Envelope element not found');

          const bodyContent = envelope.Body;
          if (!bodyContent) throw new Error('Body element not found');

          const responseTag = bodyContent.Z63_INVOICEDATA_FMResponse;
          if (!responseTag) throw new Error('Z63_INVOICEDATA_FMResponse tag not found');

          const base64PDF = responseTag.X_PDF;
          if (!base64PDF) throw new Error('X_PDF element not found');

          const buffer = Buffer.from(base64PDF, 'base64');
          resolve(buffer);

        } catch (parseError) {
          console.error('Error extracting PDF:', parseError.message);
          reject(new Error('Error extracting invoice PDF from SOAP response: ' + parseError.message));
        }
      });
    });
  });
};

export default {
  fetchInvoiceData,
  fetchInvoicePDF,
};
