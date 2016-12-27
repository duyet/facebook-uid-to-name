var graph = require('fbgraph');
var fs = require('fs');
var config = require('./config');

graph.setAccessToken(config.static_access_token);

fs.readFile('./data/user_ids.sample.txt', function(err, data) {
	if (err) throw err;

	var array = data.toString().split("\n");
    for (i in array) {
    	graph.get('/' + array[i], function (err, res) {
			console.log(res)
		})
    }
})