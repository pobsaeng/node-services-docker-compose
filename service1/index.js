const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;
const SERVICE2_URL = 'http://service2:3002';

// Axios configuration for handling timeouts and retries
const axiosInstance = axios.create({
  timeout: 5000, // Timeout of 5 seconds
  retry: 3, // Retry 3 times on failure
  retryDelay: (retryCount) => {
    return retryCount * 1000; // Exponential backoff delay
  }
});

// Handler for errors and retries
axiosInstance.interceptors.response.use(undefined, (err) => {
  const { config, response } = err;
  if (response && response.status === 500) {
    // Retry only on 500 Internal Server Error
    return axiosInstance(config);
  }
  throw err;
});

app.get('/', async (req, res) => {
  try {
    // Make an HTTP GET request to service2
    const response = await axiosInstance.get(`${SERVICE2_URL}/findall`);
    res.send(response.data);
    
  } catch (error) {
    console.error('Error calling Service2:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Service 1 listening on port ${PORT}`);
});
