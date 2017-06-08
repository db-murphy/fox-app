const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;
const Menu = remote.Menu;
const ExportFile = require('./exportFile.js');
const ImportFile = require('./importFile.js');

var flag = true;

document.querySelector(".min").onclick = function() {
  remote.getCurrentWindow().minimize();
};

document.querySelector(".max").onclick = function() {
  remote.getCurrentWindow().setFullScreen(flag);
  flag = false;
};

document.querySelector(".close").onclick = function() {
  remote.getCurrentWindow().close();
};

var template = [
  {
  label: '文件',
  submenu: [
    {
      label: '新建',
      accelerator: 'CmdOrCtrl+N',
      click: function (item, focusedWindow) {
        createFile();
      }
    },
    {
      label: '打开',
      accelerator: 'Shift+CmdOrCtrl+O',
      click: function (item, focusedWindow) {
        ImportFile();
      }
    },
    {
      label: '导出',
      accelerator: 'CmdOrCtrl+P',
      click: function (item, focusedWindow) {
        ExportFile();
      }
    }
  ]
},

{
  label: '视图',
  submenu: [
    {
      label: '全屏',
      accelerator: (function () {
        return (process.platform === 'darwin') ? 'Ctrl+Command+F' : 'F11'
      })(),
      click: function (item, focusedWindow) {
        if (focusedWindow) focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    },
    {
      label: 'Toggle Developer Tools',
      accelerator: (function () {
        if (process.platform === 'darwin') {
          return 'Alt+Command+I'
        } else {
          return 'Ctrl+Shift+I'
        }
      })(),
      click: function (item, focusedWindow) {
        if (focusedWindow) focusedWindow.toggleDevTools()
      }
    }
  ]
},
{
  label: '窗口',
  role: 'window',
  submenu: [
    {
      label: '最小化',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: '关闭',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    }
  ]
},
{
  label: '帮助',
  role: 'help',
  submenu: [
    {
      label: 'Learn More',
      click: function () { require('electron').shell.openExternal('http://electron.atom.io') }
    }
  ]
}
];

if (process.platform === 'darwin') {
var name = require('electron').remote.app.getName()
template.unshift({
  label: name,
  submenu: [
    {
      label: 'zAbout ' + name,
      role: 'about'
    },
    {
      type: 'separator'
    },
    {
      label: 'Services',
      role: 'services',
      submenu: []
    },
    {
      type: 'separator'
    },
    {
      label: 'Hide ' + name,
      accelerator: 'Command+H',
      role: 'hide'
    },
    {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    },
    {
      label: 'Show All',
      role: 'unhide'
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () { app.quit() }
    }
  ]
})
// Window menu.
template[3].submenu.push(
  {
    type: 'separator'
  },
  {
    label: 'Bring All to Front',
    role: 'front'
  }
)
}

var menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)