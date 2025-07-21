import axios from 'axios';

export const fetchPayments = async (VendorId) => {
  const url = `http://AZKTLDS5CP.kcloud.com:8000/sap/opu/odata/SAP/ZMM_VEND63_ODATA_SRV/ZVEND_PAYMENT63Set?$filter=VendorId eq '${VendorId}'&$format=json`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=',
        'Cookie': 'sap-usercontext=sap-client=100'
      }
    });

    return response.data?.d?.results || [];
  } catch (error) {
    throw new Error(error.message);
  }
};
