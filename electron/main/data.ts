import { ipcMain } from 'electron'
ipcMain.handle('getGraphData', () => {
    console.log('getGraphData')
    const nodes = [
        { id: 1, label: 'circle', shape: 'circle' },
        { id: 2, label: 'ellipse', shape: 'ellipse' },
        { id: 3, label: 'database', shape: 'database' },
        { id: 4, label: 'box', shape: 'box' },
        { id: 5, label: 'diamond', shape: 'diamond' },
        { id: 6, label: 'dot', shape: 'dot' },
        { id: 7, label: 'square', shape: 'square' },
        { id: 8, label: 'triangle', shape: 'triangle' },
    ]
    const edges = [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 5, to: 6 },
        { from: 5, to: 7 },
        { from: 6, to: 8 }
    ]
    return [nodes, edges];
})