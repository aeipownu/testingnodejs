//initializing soda-js and testing a query pull from a dataset.
var soda = require('soda-js');
//connection to data
var consumer = new soda.Consumer('data.seattle.gov');
// store the values pulled in this array.
var values = [];
// get todays date.
var current_date = new Date();
//dictonary/hash/map of key values.
var counts = {};
var clearance_group = [];
var number_of_calls = []
//columns to pull
var select = 'event_clearance_group'
//filter to AFTER yesterdays mightnight(11:59:59 PM)
//to ensure all data from today is grabbed
var where = "event_clearance_date > '"+ current_date.getFullYear() 
				+ '-' + (current_date.getMonth() + 1) + '-' + 
				(current_date.getDate() - 1) + "T23:59:59'"
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
			for (var item in counts) {
				clearance_group.push(item);
				number_of_calls.push(counts[item]);
			}
		})
    	.on('error', function(error) { console.error(error); });