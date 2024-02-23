const express = require('express');
const app = express();
const PORT = 3002;

app.get('/findall', (req, res) => {
  const responseObject = {
    id: "10001",
    fullname: "Nicolas Cage",
    message: 'Hello from Service 2!',
    timestamp: new Date().toISOString()
  };

  res.setHeader('Content-Type', 'application/json');
  res.json(responseObject);
});

app.listen(PORT, () => {
  console.log(`Service 2 listening on port ${PORT}`);
});
