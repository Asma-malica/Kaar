import request from 'request';

export const fetchVendorRFQ = (VendorId) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: `http://AZKTLDS5CP.kcloud.com:8000/sap/opu/odata/SAP/ZMM_VEND63_ODATA_SRV/ZVEND_RFQ63Set?$filter=VendorId eq '${VendorId}'&$format=json`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=',
        'Cookie': 'sap-usercontext=sap-client=100'
      }
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error('❗ Request Error:', error);
        return reject(error);
      }

      console.log('✅ RFQ Raw Response:', body);

      try {
        const data = JSON.parse(body);
        if (data.d && data.d.results) {
          console.log('✅ RFQ Data Found:', data.d.results);
          resolve(data.d.results);
        } else {
          console.log('❌ No RFQ Data Found');
          resolve([]);
        }
      } catch (err) {
        console.error('❗ JSON Parse Error:', err.message);
        reject(err);
      }
    });
  });
};
