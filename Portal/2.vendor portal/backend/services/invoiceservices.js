// services/invoiceservices.js
import request from 'request-promise-native';
import xml2js from 'xml2js';

const SAP_BASE_URL = 'http://AZKTLDS5CP.kcloud.com:8000/sap/opu/odata/SAP/ZMM_VEND63_ODATA_SRV';
const AUTH_HEADER = 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=';

export const fetchInvoicesByVendor = async (vendorId) => {
  const url = `${SAP_BASE_URL}/ZVEND_FORMTABLE63_SSet?$filter=VendorId eq '${vendorId}'&$format=json`;

  const options = {
    uri: url,
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json',
      'Cookie': 'sap-usercontext=sap-client=100'
    },
    json: true
  };

  try {
    const response = await request.get(options);
    const results = response?.d?.results || [];
    return results.map((item) => ({
      ...item,
      VendorId: vendorId // inject VendorId if not included
    }));
  } catch (error) {
    console.error('Error fetching invoices from SAP:', error.message);
    throw error;
  }
};

export const fetchInvoicePdfByBelnr = async (belnr) => {
  const url = `${SAP_BASE_URL}/ZVEND_FORMODATA63_SSet(Belnr='${belnr}')`;

  const options = {
    uri: url,
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json',
      'Cookie': 'sap-usercontext=sap-client=100'
    },
    resolveWithFullResponse: true,
    simple: false
  };

  try {
    const response = await request.get(options);

    if (response.statusCode !== 200) {
      throw new Error(`Failed to fetch data for belnr ${belnr}: Status ${response.statusCode}`);
    }

    const parser = new xml2js.Parser({ explicitArray: false });
    const parsed = await parser.parseStringPromise(response.body);
    const props = parsed?.entry?.content?.['m:properties'];
    const pdfBase64 = props?.['d:PdfString']?._ || props?.['d:PdfString'] || '';

    return Buffer.from(pdfBase64, 'base64');
  } catch (error) {
    console.error("SAP OData call failed:", error.message);
    throw error;
  }
};

export default {
  fetchInvoicesByVendor,
  fetchInvoicePdfByBelnr
};
