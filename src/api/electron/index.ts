async function getGraphData() {
    return await window.ElectronAPI.invoke('getGraphData')
}
function selectNode(id) {
    window.ElectronAPI.send('selectNode', id)
}
function selectEdge(from, to) {
    window.ElectronAPI.send('selectEdge', from, to)
}

export { getGraphData, selectNode, selectEdge };