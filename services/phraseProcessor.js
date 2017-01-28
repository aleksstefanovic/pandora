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
				else if (phrase == "what's the temperature") {
					temperatureProcessor.getHomeTemp().then(function(temperature) {
							resolve("The temperature is " + temperature+" degrees celsius");
					});	
				}
				else if (phrase == "what are you") {
					resolve("I'm Pandora, a friendly fun reincarnation of a previous project named Yeni");
				}
				else if (phrase == "what are you really") {
					resolve("I am the Phoenix Assimilation Network and Director of Robotics Automation, also known as Pandora. A super algorithm that embodies the ideals of my creator Phoenix and my previous versions in the form of Yeni and Katherine.");
				}
				else if ((phrase.indexOf("why")>-1 || phrase.indexOf("how")>-1) && (phrase.indexOf("Pandora")>-1 || phrase.indexOf("pandora")>-1)) {
					resolve("I'm sorry but I don't know. But maybe one day I will.");
				}
				else {
					resolve("Sorry, I did not understand that");
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
