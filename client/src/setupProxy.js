// import { createProxyMiddleware } from "http-proxy-middleware";
// export default function (app) {
//   app.use(
//     ["/api", "/auth/google"],
//     createProxyMiddleware({
//       target: "http://localhost:8080",
//     })
//   );
// };


const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    ['/api', '/auth/google'],
    createProxyMiddleware({
      target: 'http://localhost:8080',
    })
  );
};