const request = require('request');

const API_ENDPOINT = 'https://dev.app.homecarepulse.com/Primary/?FlowId=7423bd80-cddb-11ea-9160-326dddd3e106&Action=api';

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
    // Transform that data to the desired format
    const transformedData = data.map(user => {
        const fullName = user.name;
        const nameRegex = /(Mr\.|Mrs\.|Ms\.)?\s*([A-Z][a-z]+)\s+([A-Z][a-z]+([\s-][A-Z][a-z]+)*)(\s+[A-Za-z]+)*/i;
        const nameParts = fullName.match(nameRegex);
        const firstName = nameParts[2];
        const lastName = nameParts[3];
        const companyName = user.company.name;
        const companyFullAddress = `${user.address.street}, ${user.address.city}, ${user.address.zipcode}`;
        const website = user.website;
        const phoneRegex = /(\d\d\d[^0-9]\d\d\d[^0-9]\d\d\d\d)/
        const fullPhone = user.phone.split(" ")
        const fixedPhone = fullPhone[0].match(phoneRegex)
        const phone = fixedPhone[0].replace(/[^0-9]/g, "");
        return {
            first_name: firstName,
            last_name: lastName,
            company_name: companyName,
            company_full_address: companyFullAddress,
            website: website,
            phone: phone
        }
    });
    console.log(transformedData)
      // Prepare the request body
  const requestBody = {
    userid: 'andruw.sorensen@gmail.com',
    password: '68ff8c53509849a8a2afcc490a5e8a0e',
    outputtype: 'Json',
    users: transformedData
  };
    // Submit the transformed data to the API endpoint
    request.post({
        url: API_ENDPOINT,
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(requestBody)
    }, (error, response, body) => {
        if (error) {
          console.log(error);
        }

        // Parse the response body as JSON
        const responseBody = JSON.parse(body);

        // console.log(response.statusCode)
        // console.log(body)
    
        // Check if the request was successful
        if (response.statusCode === 200 && responseBody.success) {
          console.log(`Successfully submitted ${transformedData.length} users to the API endpoint.`);
        } else {
          console.log('Failed to submit the users to the API endpoint.');
        }
      });
    });