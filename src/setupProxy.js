const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  const backend = createProxyMiddleware({
    target: 'http://localhost:4040/',
    cookieDomainRewrite: {
      'localhost:4040': 'localhost:3000',
    },
  });
  app.use('/api/**', backend);
};
