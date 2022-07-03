const youtube = require('scrape-youtube');
const config = require('./models/config');

//gets the url and sends it to config
youtube.search('ksi try not to laugh', { type: 'playlist' }).then((results) => {
    //sets a global var to the first link of the first video of the first playlist from search
	config.newVideoURL = results.playlists[0].videos[0].link;

})

//compares newest video to the last video I manually have seen -- if it changed then we know it's a new upload!
setTimeout(
	function(){ 
		if(config.newVideoURL !== "https://youtu.be/WxHRKCgCtDM"){
			config.actionStatus = true;
		}
	}, 1000)

// TODO: replace "No Videos Found" with "https://youtu.be/WxHRKCgCtDM"