//initializing app in express.
var express = require('express');
var app = express();
//initializing soda-js and testing a query pull from a dataset.
var soda = require('soda-js');
//connection to data
var consumer = new soda.Consumer('data.seattle.gov');
//set port
app.set('port', (process.env.PORT || 5000));
//set engine to render jade files. 
app.set('view engine', 'jade');

//Seattle Crimes by Category
app.get('/', function (req, res) {
	// store the values pulled in this array.
	var values = [];
	// get todays date.
	var offset = -8;
	var current_date = new Date( new Date().getTime() + offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );
	//dictonary/hash/map of key values.
	var counts = {};
	var clearance_group = [];
	var number_of_calls = [];
	//columns to pull
	var select = 'event_clearance_group';
	//filter to AFTER yesterdays mightnight(11:59:59 PM)
	//to ensure all data from today is grabbed
	var where = "event_clearance_date > '"+ current_date.getFullYear() 
					+ '-' + (current_date.getMonth() + 1) + '-' + 
					(current_date.getDate() - 1) + "T23:59:59'";
	console.log(where);
	//query the data and set arrays for graph
	var query = consumer.query()
		.withDataset('3k2p-39jp')
		.select(select)
		.where(where)
		.order()
		.getRows()
			.on('success', function(rows) { 
				//looping through rows returned
				for (var item in rows) {
					//looping through row itself
					for (var key in rows[item]) {
						//adds value to values array
						values.push(rows[item][key]);
					};
				};
				console.log(rows.length + " rows");
				for (var i = 0; i < values.length; i++) {
					//sets the value of key
					//adds 1 plus whatever value is currently there
	    			counts[values[i]] = 1 + (counts[values[i]] || 0);
				}
				console.log(counts);
				//sets keys to bar columns: X AXIS
				//sets values to number of calls: Y AXIS
				//arrays are needed for chartist graphs.

				// for (var item in counts) {
				// 	clearance_group.push("'" + item.replace(/,/g , " ") + "'");
				// 	number_of_calls.push(counts[item])
				// }

				//mapping to array
				var tuples = [];

				for (var key in counts) tuples.push([key, counts[key]]);

				//sorting function
				tuples.sort(function(a, b) {
				    a = a[1];
				    b = b[1];

				    return a < b ? -1 : (a > b ? 1 : 0);
				});

				//only assigning 15 values for chartist
				for (var i = 0; i < tuples.length; i++) {
					if (i <= (tuples.length - 16)) {
						console.log("skip");
						continue;
					}
				    var key = tuples[i][0];
				    var value = tuples[i][1];

				  	clearance_group.push("'" + key.replace(/,/g , " ") + "'");
				  	number_of_calls.push(value);

				}

				//array = ['hi', 'test']
				console.log(number_of_calls);
				console.log(clearance_group);
				res.render('chart', { clearance_group: clearance_group, number_of_calls: number_of_calls});
			})
    		.on('error', function(error) { console.error(error); });
});

//Creating local host to display page.
var server = app.listen(app.get('port'), function () {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Testing app listneing on http://%s:%s', host, port);
});

// Successful display of Hello World