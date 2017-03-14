const {app, BrowserWindow} = require('electron')
const path = require('path')

let win

app.on('ready', () => {
    win = new BrowserWindow({
        width: 400,
        height: 200,
        show: false
    })
    win.loadURL(`file://${__dirname}/log_in.html`)

    win.on('closed', () => {
        win = null
    })
    win.once('ready-to-show', () => {
        win.show()
    })
})

app.on('window-all-closed', () => {
    // Close app on CMD-W
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    // Dock icon click
    if (win === null) {
        createWindow()
    }
})
