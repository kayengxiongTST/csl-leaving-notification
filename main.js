try { require('electron-reloader')(module); } catch { }
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron')
const path = require('path')

let isQuiting;
let tray;

app.on('before-quit', function () {
	isQuiting = true;
});

function createWindow() {
	const cslIcon = nativeImage.createFromPath('csl-favicon.ico')

	const win = new BrowserWindow({
		width: 400,
		height: 300,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		},
		resizable: false,
		show: false,
		icon: cslIcon
	})
	win.hide()
	win.loadFile('src/index.html')

	win.once('ready-to-show', () => {
		win.show()
	})

	win.on('minimize',function(event){
		event.preventDefault()
		win.hide()
	})
	
	win.on('close', function (event) {
		if(!isQuiting){
			event.preventDefault()
			win.hide()
			event.returnValue = false;
		}
	
		return false
	})


	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Open CSL App', click:  function(){
			win.show()
		} },
		{ label: 'Quit', click:  function(){
			isQuiting = true
			app.quit()
		} }
	])
	tray = new Tray(path.join(__dirname, 'csl-favicon.ico'))
	tray.setToolTip('CSL leaving notification')
	tray.setTitle('CSL')
	tray.setContextMenu(contextMenu)
	tray.on('double-click', function (event) {
		win.show()
	})

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
