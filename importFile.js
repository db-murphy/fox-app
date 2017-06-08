var fs = require('fs');
const electron = require('electron');
const remote = electron.remote;
const app = remote.app;

function main() {
	var homePath = app.getPath('desktop');
 	var path = electron.remote.dialog.showOpenDialog({
 		title: '打开文件',
 		defaultPath: homePath,
 		filters: [{ name: 'All Files', extensions: ['config'] }]
 	});

 	fs.readFile(path[0], 'utf8', function(err, data) {
 		var data = JSON.parse(data);

 		console.log(data.fileBg)
 		window.addFile(data);
 	});
}

module.exports = main;