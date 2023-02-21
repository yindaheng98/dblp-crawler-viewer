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

const wins: { [key: string]: BrowserWindow; } = {}
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')

async function createWindow(page, title) {
  if (wins[page] && !wins[page].isDestroyed()) {
    wins[page].focus()
    return
  }
  const url = join(process.env.VITE_DEV_SERVER_URL, page)
  const indexHtml = join(process.env.DIST, page)
  const win = new BrowserWindow({
    title: title,
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
  wins[page] = win
  win.on('closed', () => (delete wins[page]))

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

app.whenReady().then(() => createWindow("index.html", 'Main window'))

app.on('window-all-closed', () => {
  for (let page in wins)
    delete wins[page]
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  for (let page in wins) {
    const win = wins[page]
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
  }
  if (wins['index.html']) {
    // Focus on the main window if the user tried to open another
    wins['index.html'].focus()
  } else if (wins['index3D.html']) {
    wins['index3D.html'].focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow('index.html', 'Main window')
  }
})

let summary = null

function load() {
  const selectedFiles = dialog.showOpenDialogSync({
    properties: ['openFile'],
    filters: [
      { name: 'DBLP Crawler Summary', extensions: ['json'] }
    ]
  });
  if (!selectedFiles || selectedFiles.length <= 0) return;
  const selectedFile = selectedFiles[0];
  console.log(`File specified: ${selectedFile}`);
  summary = JSON.parse(readFileSync(selectedFile, { encoding: "utf8" }));
  for (let page in wins)
    wins[page].webContents.send('update');
}

const menuTemplate = [
  {
    label: 'Open',
    click: load,
  },
  {
    label: 'Graph',
    submenu: [
      { label: '2D', click: () => createWindow('index.html', '2D Graph') },
      { label: '3D', click: () => createWindow('index3D.html', '3D Graph') },
    ]
  },
  {
    label: 'Ranking',
    submenu: [
      { label: 'by selected publications', click: () => createWindow('indexRanking.html', 'Ranking by selected publications') },
      { label: 'by all publications', click: () => createWindow('indexRankingAllPub.html', 'Ranking by all publications') },
    ]
  },
  {
    role: 'Close'
  }
]

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

import { parse_graph, parse_ranking } from './parse'

ipcMain.handle('getGraphData', () => {
  console.log('getGraphData')
  if (summary === null) {
    return [[
      { id: 1, label: 'No data', shape: 'circle' },
      { id: 2, label: 'Please open a summary file', shape: 'box' },
    ], [{ from: 1, to: 2 }]]
  }
  const data = parse_graph(summary)
  return [data.nodes, data.edges];
})

ipcMain.handle('getRankingData', (e, typ) => {
  console.log('getRankingData')
  if (summary === null) {
    return {
      id: ['No data'],
      label: ['No data, Please open a summary file'],
      data: [{ value: 0, itemStyle: { color: "red" } }]
    }
  }
  if (typ === 'byAllPublications')
    return parse_ranking(summary, (node) => ({
      value: node.person.publications.length
    }));
  return parse_ranking(summary, (node) => ({
    value: node.publications.length
  }));
})

let currentNode = 0
ipcMain.on('selectNode', (event, id) => {
  console.log('selectNode', id)
  currentNode = id
})

let currentFrom = 0
let currentTo = 0
ipcMain.on('selectEdge', (event, from, to) => {
  console.log('selectEdge', from, to)
  currentFrom = from
  currentTo = to
})