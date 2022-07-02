const config = require('./config');
// const frames = require('youtube-video-to-frames');
const frames = require('./YTtoFrames');


for(var i=0; i<1;i++){
var url = require('./urlFetcher');


//everything MUST be done within the setTimeout() because I suck at async :(
setTimeout(function(){
	

		if(!config.actionStatus){
			console.log("KSI has not uploaded a new video");
		}
		else{
		//if the url has changed (i.e. new video uploaded), go to step #2
		console.log("New Video Uploaded!");
		let options = {videoName: 'video', fps: 1, imgFileName: "img", downloadLocation: './images'}
		frames(config.newVideoURL, options)
		return;
		}

	

},2000);

}
