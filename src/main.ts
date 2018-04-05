import { app, BrowserWindow, Menu, dialog, powerMonitor } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as moment from 'moment';

let mainWindow: BrowserWindow | null;

const isDevMode = process.execPath.match(/[\\/]electron/);

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const manageRefresh = async () => {
  const time = moment('24:00:00', 'hh:mm:ss').diff(moment(), 'seconds');

  setTimeout(() => {
    if (mainWindow) {
      mainWindow.reload();
    }
  }, time * 1000);
};

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 600,
    fullscreenable: true,
    backgroundColor: '#403F4D'
  });

  if (isDevMode) {
    mainWindow.loadURL(`http://localhost:2003`);
    await installExtensions();
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const createMenu = async () => {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Stride',
      submenu: [
        { role: 'about', label: 'About Stride' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }, // Stride Menu

    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    }, // Edit Menu

    {
      label: 'View',
      submenu: [{ role: 'reload' }, { role: 'togglefullscreen' }, { role: 'toggledevtools' }]
    }, // View Menu

    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }]
    } // Window
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

app.on('ready', () => {
  createWindow();
  createMenu();

  powerMonitor.on('resume', () => {
    if (mainWindow) {
      mainWindow.reload();
      console.log('reloaded');
    }
  });

  manageRefresh();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
