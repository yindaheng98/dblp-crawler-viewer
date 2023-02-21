async function getGraphData() {
    return await window.ElectronAPI.invoke('getGraphData')
}
function selectNode(id) {
    window.ElectronAPI.emit('selectNode', id)
}
function selectEdge(from, to) {
    window.ElectronAPI.emit('selectEdge', from, to)
}

export { getGraphData, selectNode, selectEdge };