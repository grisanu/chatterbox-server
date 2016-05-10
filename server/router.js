var storage = {results: []};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, X-Parse-Application-Id, PARSE_APP_ID, X-Parse-REST-API-Key, PARSE_API_KEY',
  'access-control-max-age': 10 // Seconds.
};

var headers = defaultCorsHeaders;

headers['Content-Type'] = 'application/json';


var router = function (url, res, req, method) {
  var statusCode;

  var responseBody = {
    headers: headers,
    method: method,
    url: url,
    results: []
  };
  
  if (url === '/classes/messages') {
    if (method === 'GET' || method === 'OPTIONS') {
      statusCode = 200;
      res.writeHead(statusCode, headers);
      
      responseBody.results = storage.results;

    } else if (method === 'POST') {
      statusCode = 201;
      res.writeHead(statusCode, headers);

      var body = [];
      req.on('data', function (chunk) {
        body.push(chunk);
      }).on('end', function () {
        body = Buffer.concat(body).toString();
        storage.results.push(JSON.parse(body));
      });


    }
    
    res.end(JSON.stringify(responseBody)); 
    
  } else {
    statusCode = 404;
    res.writeHead(statusCode);
    res.end();
  }
  return res;
};

exports.router = router;