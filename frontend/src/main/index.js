'use strict';

import { app, Tray, BrowserWindow, ipcMain} from 'electron'
const path = require('path');
const Positioner = require('electron-positioner');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let trayWindow, mainWindow, tray;
const trayWinURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

const mainWinURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/main`
    : `file://${__dirname}/index.html#main`;

function createTrayWindow() {
  trayWindow = new BrowserWindow({
    width: 500,
    height: 310,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: { webSecurity: false }
  });
  trayWindow.loadURL(trayWinURL);

  trayWindow.on('closedf', () => {
    trayWindow = null
  });
}
function createWindow () {
  /**
   * Initial window options
   */

  mainWindow = new BrowserWindow({
    width: 720,
    height: 600,
    show: true,
    frame: true,
    fullscreenable: true,
    resizable: true,
    transparent: false,
    webPreferences: { webSecurity: false }
  });
  mainWindow.loadURL(mainWinURL);
  mainWindow.maximize();
  // Hide the window when it loses focus
  mainWindow.on('close', () => {
      mainWindow.hide();
  })
}

const toggleWindow = () => {
  if (trayWindow.isVisible()) {
    trayWindow.hide()
  } else {
    showWindow()
  }
};


const createTray = () => {
  let imagePath = path.join(__static, 'sunTemplate.png');
  console.log(imagePath);
  tray = new Tray(imagePath);
  tray.on('click', function (event) {
    toggleWindow()
  })
};

app.on('ready', () => {
  createTray();
  createTrayWindow();
  createWindow();
});

const showWindow = () => {
  let positioner = new Positioner(trayWindow);
  positioner.move('topRight');
  trayWindow.show();
  trayWindow.focus()
};

ipcMain.on('show-window', () => {
  showWindow()
});

ipcMain.on('show-main-window', (event, arg) => {
  createWindow();
});


