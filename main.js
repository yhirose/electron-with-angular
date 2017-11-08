const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');

let win = null;

function getURL(path) {
  if (isDev) {
    return `http://localhost:4200/${path}`;
  } else {
    return `file://${__dirname}/dist/${path}`;
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    icon: getURL('favicon.jpg')
  });

  win.loadURL(getURL('index.html'));

  if (isDev) {
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  })
}

app.on('read', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
})
