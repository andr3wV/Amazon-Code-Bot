const config = require('./src/models/config');
const frames = require('./src/YTtoFrames');


for(var i=0; i<1;i++){
var url = require('./src/urlFetcher');


//everything MUST be done within the setTimeout() because I suck at async :(
setTimeout(function(){
	

		if(!config.actionStatus){
			console.log("KSI has not uploaded a new video");
		}
		else{
		//if the url has changed (i.e. new video uploaded), go to step #2
		console.log("New Video Uploaded!");
		let options = {videoName: 'video', fps: 1, imgFileName: "img", downloadLocation: './src/models/images'}
		frames(config.newVideoURL, options)
		return;
		}

	

},2000);

}

//to delete batch of images: find . -type f -name "img*" -print -delete
