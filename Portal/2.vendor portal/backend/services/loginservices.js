import request from 'request';

export const getVendorData = (VendorId, Password) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: `http://AZKTLDS5CP.kcloud.com:8000/sap/opu/odata/SAP/ZMM_VEND63_ODATA_SRV/ZVEND_LOGIN63Set(VendorId='${VendorId}',Password='${Password}')?$format=json`,
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

      console.log('✅ Raw Response Body:', body);

      try {
        const data = JSON.parse(body);

        if (data.d) {
          console.log('✅ Valid Vendor Found:', data.d);
          resolve(data.d);
        } else {
          console.log('❌ No Vendor Data Returned');
          resolve(null);
        }
      } catch (err) {
        console.error('❗ JSON Parse Error:', err.message);
        reject(err);
      }
    });
  });
};
