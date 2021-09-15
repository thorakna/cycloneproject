// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')


let loadingWindow;
let mainWindow;


function createLoadingScreen(){
  loadingWindow = new BrowserWindow({width:300, height:400, frame:false, show:false, resizable:false, alwaysOnTop:true,icon: path.join(__dirname, 'public/favicon.ico'),
    webPreferences: {
      nativeWindowOpen:false,
  }});
  loadingWindow.loadFile('loadingScreen.html');
  createWindow();

  loadingWindow.once('ready-to-show', () => {
    loadingWindow.show();
  });

  mainWindow.once('ready-to-show', () => {
    loadingWindow.close();
    mainWindow.show();
  })
}

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    minHeight: 550,
    minWidth: 480,
    autoHideMenuBar: true,
    show:false,
    icon: path.join(__dirname, 'public/favicon.ico'),
    webPreferences: {
      nativeWindowOpen:false
    }
  })

  mainWindow.loadURL('http://localhost:3000')
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createLoadingScreen()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
