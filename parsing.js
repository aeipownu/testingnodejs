
var data = ['something', 'is', 'here'];
var data2 = {key_output: 'value_output'};
data.forEach(function(entry) {
	console.log(entry);
})

for (item in data) {
	console.log(data[item]);
}

for (item in data2) {
	console.log(item)
	console.log(data2[item]);
}