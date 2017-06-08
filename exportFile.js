var fs = require('fs');
const electron = require('electron');
const remote = electron.remote;
const app = remote.app;

function main() {
	var homePath = app.getPath('desktop') + '/test.config';
 	var path = electron.remote.dialog.showSaveDialog({
 		title: '保存',
 		defaultPath: homePath
 	});

 	var file = getCurrentFileById(state);
 	var fileStr = JSON.stringify(file);

 	fs.writeFile(path, fileStr, function(err) {
        
    });
}

const getCurrentFileById = (state) => {
	let fileId = state.currentFileId;
	let files = state.files;
	let currentId = state.currentFileId;

	for(var i = 0; i < files.length; i++) {
		if(files[i].id == currentId) {
			return files[i];
		}
	}

	return null;
}

module.exports = main;