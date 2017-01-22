var temperatureProcessor = require('./temperatureProcessor');

function readIn (phrase) {
	return new Promise(function (resolve, reject) {
		try {
				if (phrase == "testing") {
					resolve("That's a great test!");
				}
				else if (phrase == "what is the temperature") {
					temperatureProcessor.getHomeTemp().then(function(temperature) {
							resolve("The temperature is " + temperature+" degrees celsius");
					});	
				}
				else {
					resolve("Sorry, did not understand that");
				}
		}
		catch (e) {
			reject(false);
		}
	});
}

var obj = {
	readIn : readIn
}

module.exports = obj;
