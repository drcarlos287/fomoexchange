const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/bit',
    createProxyMiddleware({
      target: 'http://31.220.63.27:8080',
      changeOrigin: true,
    })
  );
};
