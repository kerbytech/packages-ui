var host = 'localhost';
var port = 8000;
var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
  originWhitelist: ['http://localhost:4200', 'https://localhost:4200']
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
