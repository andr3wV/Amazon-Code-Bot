const youtube = require('scrape-youtube');
const config = require('./config');

//var URL = "";

//gets the url and sends it to config
youtube.search('ksi try not to laugh', { type: 'playlist' }).then((results) => {
    // grabs KSI TNTL playlist, the first video link
	config.newVideoURL = results.playlists[0].videos[0].link;

})
setTimeout(

	function(){ 
		//console.log(URL);
		//config.newVideoURL = url
		if(config.newVideoURL !== "No Videos Found"){
			config.actionStatus = true;
		}
	}, 1000)

//https://youtu.be/WxHRKCgCtDM