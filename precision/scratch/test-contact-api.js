const http = require('http');

const data = JSON.stringify({
  name: 'Test User',
  email: 'test@example.com',
  phone: '123456789',
  country: 'BR',
  description: 'Test message description'
});

const options = {
  hostname: 'localhost',
  port: 3002,
  path: '/api/contact',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:', res.headers);

  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    console.log('Response Body:');
    console.log(body);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
