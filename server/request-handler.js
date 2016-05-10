/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var storage = {results: []};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var method = request.method;
  var url = request.url;
  var statusCode;

  if (url === '/classes/messages') {
    statusCode = (method === 'GET') ? 200 : 201;

    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'application/json';

    response.writeHead(statusCode, headers);

    if (method === 'POST') {

      var body = [];
      request.on('data', function (chunk) {
        // console.log(chunk);
        body.push(chunk);
      }).on('end', function () {
        body = Buffer.concat(body).toString();
        storage.results.push(JSON.parse(body));
      });

      var responseBody = {
        headers: headers,
        method: request.method,
        url: request.url,
        results: []
      };

      response.end(JSON.stringify(responseBody));

    } else if (method === 'GET' || method === 'OPTIONS') {
      var responseBody = {
        headers: headers,
        method: request.method,
        url: request.url,
        results: storage.results
      };

      response.end(JSON.stringify(responseBody));
    }
  } else {
    statusCode = 404;
    response.writeHead(statusCode);
    response.end();
  }

};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, X-Parse-Application-Id, PARSE_APP_ID, X-Parse-REST-API-Key, PARSE_API_KEY',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;
