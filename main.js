var graph = require('fbgraph');
var fs = require('fs');
var config = require('./config');
graph.setAccessToken(config.static_access_token);

var inputFile = './data/facebook_5k.txt';
var outputFile = './data/user_ids.with_name.txt';

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(inputFile)
});

function getUserNameFromUserId(user_id, success, error) {
	graph.get('/' + user_id, function (err, res) {
		if (err && error) error(err);
		else success(res);
	});
}

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
  var user_id = line.split(',');

  getUserNameFromUserId(user_id[0], function(res) {
  	console.log(res, user_id[1])
  	var new_line = res['id'] + ',' + res['name'] + ',' + user_id[1] + '\n';
  	fs.appendFile(outputFile, new_line, function(err) {
  		if (err) console.log('Error when write result', err);
  		else console.log('OK', new_line);
  	});

  }, function(err) {
  	console.log("Error: ", err)
  })
});