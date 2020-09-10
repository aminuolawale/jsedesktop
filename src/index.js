const { app, BrowserWindow } = require('electron');
const {is} = require("electron-util");

let window;
function createWindow() {
  console.log('create window was called/');
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false
    }
  });
  // window.loadFile('./index.html');
  window.loadURL("http://localhost:1234");
  if (is.development){
    window.webContents.openDevTools();
  }
  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);

// quit when all windows are closed
app.on('window-all-closed', () => {
  // on macos only quit when a user explicitly quits the application
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window == null) {
    createWindow();
  }
});
