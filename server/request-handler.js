/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var fs = require('fs');
var routerObj = require('./router.js');

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  response = routerObj.router(request, response, request.method, request.url);
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, X-Parse-Application-Id, PARSE_APP_ID, X-Parse-REST-API-Key, PARSE_API_KEY',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;
