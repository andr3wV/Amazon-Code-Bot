const config = require('./src/models/config');
const frames = require('./src/YTtoFrames');

setInterval(function(){
	var url = require('./src/urlFetcher'); //checks if new video

	//everything MUST be done within the setTimeout() because I suck at async :(
	setTimeout(function(){
			if(!config.actionStatus){
				console.log("No New Upload");
			}
			else{	
				//if the url has changed (i.e. new video uploaded), downloads the frames in that video
				console.log("New Video Uploaded!");
				let options = {videoName: 'video', fps: 1, imgFileName: "img", downloadLocation: './src/models/images'};
				frames(config.newVideoURL, options)
				return;
			}
	},2000);

},5000);

/*
to delete batch of images: 
find . -type f -name "img*" -print -delete && rm video.mp4
*/
