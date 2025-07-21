import request from 'request';

export const fetchPurchaseOrders = (VendorId) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      url: `http://AZKTLDS5CP.kcloud.com:8000/sap/opu/odata/SAP/ZMM_VEND63_ODATA_SRV/ZVEND_PO63Set?$filter=VendorId eq '${VendorId}'&$format=json`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic SzkwMTU2MzpBc21hbWFsaWNhQDIwMDQ=',
        'Cookie': 'sap-usercontext=sap-client=100'
      }
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error('❗ Error Fetching Purchase Orders:', error);
        return reject(error);
      }

      console.log('✅ Raw PO Response:', body);

      try {
        const data = JSON.parse(body);
        if (data.d?.results) {
          console.log('✅ Purchase Orders Found:', data.d.results);
          resolve(data.d.results);
        } else {
          console.log('❌ No Purchase Order Data Returned');
          resolve([]);
        }
      } catch (err) {
        console.error('❗ JSON Parse Error:', err.message);
        reject(err);
      }
    });
  });
};
