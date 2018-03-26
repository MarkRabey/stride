import { app, BrowserWindow, Menu, dialog, powerMonitor } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import * as moment from 'moment';

let mainWindow: BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({strategy: 'react-hmr'});
}

const manageRefresh = () => {
  const time = moment('24:00:00', 'hh:mm:ss').diff(moment(), 'seconds');

  setTimeout(() => {
    mainWindow.reload();
  }, time * 1000);
};

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 600,
    fullscreenable: true,
    backgroundColor: '#403F4D',
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const createMenu = async () => {
  const template = [
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
        { role: 'selectAll' },
      ],
    }, // Edit Menu

    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'togglefullscreen' },
        { role: 'toggledevtools' },
      ],
    }, // View Menu

    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
      ],
    }, // Window
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

app.on('ready', () => {
  createWindow();
  createMenu();

  powerMonitor.on('resume', () => {
    mainWindow.reload();
    console.log('reloaded');
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
