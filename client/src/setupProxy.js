const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  const backendUrl = `http://localhost:${process.env.PORT_API || '3000'}`;

  app.use(
    '/api',
    createProxyMiddleware({
      target: `${backendUrl}/api`,
      changeOrigin: true,
    })
  );
};
