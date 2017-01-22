function getHomeTemp () {
	return new Promise(function (resolve, reject) {
		resolve(25.0);
	});
}

var obj = {
	getHomeTemp : getHomeTemp
};

module.exports = obj;
