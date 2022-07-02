var fs = require('fs');

var text = fs.readFileSync("./txt/combined.txt").toString('utf-8');
var codes = [];

for(var i=4; i<text.length-12;i++){
	if(text.substring(i,i+1)==='-' && text.substring(i+7,i+8)==='-'){
		codes.push(text.substring(i-4, i+12));
	}
}
		
console.log(codes);