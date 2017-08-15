const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const url = require('url')
const path = require('path')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true
  }))
}

app.on('ready', createWindow)
app.on('window-all-close', () => {
  //Darwin == OS
  if(system.platform !== "Darwin"){
    app.quit()
  }
})
app.on('activate', () => {
  if(mainWindow === null){
    createWindow()
  }
})
