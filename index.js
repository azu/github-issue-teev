// LICENSE : MIT
"use strict";
require("babel/register");
var app = require('app');
var BrowserWindow = require('browser-window');
// keep reference to main window to prevent GC
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    require("electron-template-menu")();
    // Create the browser window.
    mainWindow = new BrowserWindow({
        height: 650,
        width: 1150,
        frame: true
    });
    mainWindow.maximize();
    mainWindow.openDevTools();
    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object
        mainWindow = null;
    });

});