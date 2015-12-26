//initializing soda-js and testing a query pull from a dataset.
var soda = require('soda-js');

// console.log(soda);

var consumer = new soda.Consumer('data.seattle.gov');

var query = consumer.query()
	.withDataset('c3ri-wwcn')
	.limit(5)
	.getRows()
		.on('success', function(rows) { console.log(rows); })
    	.on('error', function(error) { console.error(error); });

console.log(consumer);
console.log(query);



//example I found online for soda-js. Using as a reference for my test.

// var consumer = new soda.Consumer('open.whitehouse.gov');

// consumer.query()
//   .withDataset('p86s-ychb')
//   .limit(5)
//   .where({ namelast: 'SMITH' })
//   .order('namelast')
//   .getRows()
//     .on('success', function(rows) { console.log(rows); })
//     .on('error', function(error) { console.error(error); });