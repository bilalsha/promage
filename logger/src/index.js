const express = require('express');
const morganMiddleware = require("./middlewares/morgan");

// The morgan middleware does not need this.
// This is for a manual log
const logger = require("./utils/logger");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "http://localhost:8080";

// Create Express Server
const app = express();

// Logging
app.use(morganMiddleware);

// Info GET endpoint
app.get('/info', (req, res, next) => {
   res.send('This is a proxy service which proxies to Billing and Account APIs.');
});

app.use('/promage', createProxyMiddleware({
   target: API_SERVICE_URL,
   changeOrigin: true,
   pathRewrite: {
       [`^/promage`]: '',
   },
}));

app.listen(PORT, HOST, () => {
   logger.info(`Starting Proxy at ${HOST}:${PORT}`);
});
