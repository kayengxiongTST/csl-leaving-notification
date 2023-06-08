try { require('electron-reloader')(module); } catch { };
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
	const win = new BrowserWindow({
		width: 400,
		height: 300,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		},
		resizable: false
	})

	win.loadFile('src/index.html')
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})