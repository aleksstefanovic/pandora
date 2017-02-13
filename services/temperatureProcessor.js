var pg = require('pg');

function getHomeTemp () {
	return new Promise(function (resolve, reject) {
		  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
			client.query('SELECT * FROM temp_table ORDER BY id DESC limit 1', function(err, result) {
			  done();
			  if (err)
			   { 
				console.error("Error " + err); 
				reject();
				}
			  else
			   {
				console.log(JSON.stringify(result.rows));
				//{results: result.rows}); 
				resolve(result.rows[0].temp);
				}
			});
		  });
	});
}

function insertNewTemp (temp, id) {
	return new Promise(function (resolve, reject) {
		  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
			client.query('insert into temp_table values ('+id+', '+temp+')', function(err, result) {
			  done();
			  if (err)
			   { 
				console.error("Error " + err); 
				reject();
				}
			  else
			   {
				console.log(JSON.stringify(result.rows));
				resolve();
				//{results: result.rows}); 
				//resolve(result.rows[0].temp);
				}
			});
		  });
	});
}

function deleteOldestTemp() {
	return new Promise(function (resolve, reject) {
		  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
			client.query('DELETE FROM temp_table WHERE ctid IN (SELECT ctid FROM temp_table ORDER BY id LIMIT 1)', function(err, result) {
			  done();
			  if (err)
			   { 
				console.error("Error " + err); 
				reject();
				}
			  else
			   {
				console.log(JSON.stringify(result.rows));
				resolve();
				//{results: result.rows}); 
				//resolve(result.rows[0].temp);
				}
			});
		  });
	});
}

var obj = {
	getHomeTemp : getHomeTemp,
	insertNewTemp : insertNewTemp,
	deleteOldestTemp : deleteOldestTemp
};

module.exports = obj;
