async function getGraphData() {
    return await window.ElectronAPI.invoke('getGraphData')
}
function selectNode(id) {
    window.ElectronAPI.send('selectNode', id)
}
function selectEdge(from, to) {
    window.ElectronAPI.send('selectEdge', from, to)
}
function onUpdate(callback) {
    window.ElectronAPI.on('update', callback)
}

export { getGraphData, selectNode, selectEdge, onUpdate };