var graph = require('fbgraph');
var config = require('./config');

graph.setAccessToken(config.static_access_token);

graph.get('/me', function (err, res) {
	console.log(res)
})