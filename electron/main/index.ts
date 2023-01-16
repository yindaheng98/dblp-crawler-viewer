import { dialog, app, BrowserWindow, shell, ipcMain, Menu } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

function load() {
  const selectedFiles = dialog.showOpenDialogSync({
    properties: ['openFile'],
    filters: [
      { name: 'DBLP Crawler Summary', extensions: ['dcs.js'] }
    ]
  });
  if (!selectedFiles || selectedFiles.length <= 0) return;
  const selectedFile = selectedFiles[0];
  console.log(`File specified: ${selectedFile}`);
  if (selectedFile.slice(-6) === 'dcs.js') {
    let data,
      person_data,
      pub_data,
      ccfpie_data,
      conpie_data,
      line_data,
      cat_data,
      ranking_data;
    let bin = readFileSync(selectedFile, { encoding: "utf8" }).replace(/\nlet /g, '').replace(/^let /g, '')
    eval(bin);
    console.log(`Sending: ${selectedFile}`);
    win?.webContents.send('dblp-crawler',
      data,
      person_data,
      pub_data,
      ccfpie_data,
      conpie_data,
      line_data,
      cat_data,
      ranking_data);
  }
}

const menuTemplate = [
  {
    label: 'Open',
    click: load,
  },
  {
    label: '2D Graph',
    submenu: [
      { label: 'Show in this window' },
      { label: 'Show in new window' },
    ]
  },
  {
    label: '3D Graph',
    submenu: [
      { label: 'Show in this window' },
      { label: 'Show in new window' },
    ]
  },
  {
    label: 'Ranking',
    submenu: [
      { label: 'Show in this window' },
      { label: 'Show in new window' },
    ]
  },
  {
    role: 'Close'
  }
]

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);