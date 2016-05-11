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

var fsReadFileHelper = function (url, res) {
  fs.readFile(url, 'utf8', function (err, data) {
    res.write(data);
    res.end();
  });
};

var urlObj = {
  '/classes/messages': routerObj.router.bind(null, '/classes/messages'),
  '/': fsReadFileHelper.bind(null, '../client/index.html'),
  '/styles/styles.css': fsReadFileHelper.bind(null, '../client/styles/styles.css'),
  '/bower_components/jquery/dist/jquery.js': fsReadFileHelper.bind(null, '../client/bower_components/jquery/dist/jquery.js'),
  '/env/config.js': fsReadFileHelper.bind(null, '../client/env/config.js'),
  '/scripts/app.js': fsReadFileHelper.bind(null, '../client/scripts/app.js'),
  '/images/spiffygif_46x46.gif': fsReadFileHelper.bind(null, '../client/images/spiffygif_46x46.gif')
  // '/?username=': fsReadFileHelper.bind(null, '../client/index.html')
};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  
  var url = request.url;
  if (/^\/\?username=/.test(request.url)) {
    url = '/';
  }

  if (urlObj[url] !== undefined) {
    urlObj[url](response, request, request.method);
    // fsReadFileHelper(response);
  } else {
    response.writeHead(404);
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
