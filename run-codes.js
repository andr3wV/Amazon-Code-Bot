var fs = require('fs');
var config = require('./src/models/config')

var text = fs.readFileSync("./txt/combined.txt").toString('utf-8');
var codes = [];

//finds all amazon codes in the text file in the form of XXXX-XXXXXX-XXXX
for(var i=4; i<text.length-12;i++){	
	if(text.substring(i,i+1)==='-' && text.substring(i+7,i+8)==='-'){
		codes.push(text.substring(i-4, i+12));
	}
}

//sets codes to global var in config
config.codeArr = codes;
console.log(codes);
