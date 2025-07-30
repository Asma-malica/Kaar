import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export const getLeaveData = async (empId) => {
  const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                      xmlns:urn="urn:sap-com:document:sap:rfc:functions">
      <soapenv:Header/>
      <soapenv:Body>
        <urn:ZEMP_LEAVE63_FM>
          <I_EMP_ID>${empId}</I_EMP_ID>
        </urn:ZEMP_LEAVE63_FM>
      </soapenv:Body>
    </soapenv:Envelope>`;

  const config = {
    method: 'post',
    url: 'http://AZKTLDS5CP.kcloud.com:8000/sap/bc/srt/scs/sap/zemp_leaveservice63?sap-client=100',
    headers: {
      'Content-Type': 'text/xml',
      'SOAPAction': 'urn:sap-com:document:sap:rfc:functions',
      'Authorization': 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=',
      'Cookie': 'sap-usercontext=sap-client=100'
    },
    data: soapEnvelope
  };

  try {
    const response = await axios(config);
    const result = await parseStringPromise(response.data, { explicitArray: false });

    const items = result['soap-env:Envelope']?.['soap-env:Body']?.
      ['n0:ZEMP_LEAVE63_FMResponse']?.ET_LEAVE_DATA?.item;

    const formatted = Array.isArray(items) ? items : [items];
    return formatted.filter(Boolean);
  } catch (error) {
    console.error('SOAP request error:', error);
    throw error;
  }
};
