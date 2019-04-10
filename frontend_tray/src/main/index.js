'use strict';

import { app, Tray, BrowserWindow, ipcMain } from 'electron'
const path = require('path');
const Positioner = require('electron-positioner');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let window, tray;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;

function createWindow () {
  /**
   * Initial window options
   */

  window = new BrowserWindow({
    width: 500,
    height: 310,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: { webSecurity: false }
  });

  window.loadURL(winURL);

  window.on('closedf', () => {
    window = null
  });


  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow()
  }
};


const createTray = () => {
  let imagePath = path.join(__dirname, 'sunTemplate.png');
  tray = new Tray(imagePath);
  tray.on('click', function (event) {
    toggleWindow()
  })
};

app.on('ready', () => {
  createTray();
  createWindow()
});

const showWindow = () => {
  let positioner = new Positioner(window);
  positioner.move('topRight');
  window.show();
  window.focus()
};

ipcMain.on('show-window', () => {
  showWindow()
});
