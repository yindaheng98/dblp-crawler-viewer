async function getGraphData() {
    console.log("Fetching GraphData")
    const data = await window.ElectronAPI.invoke('getGraphData')
    console.log(data)
    return data
}
async function getRankingData_byAllPublications() {
    console.log("Fetching RankingData")
    const data = await window.ElectronAPI.invoke('getRankingData', 'byAllPublications')
    console.log(data)
    return data
}
async function getRankingData() {
    console.log("Fetching RankingData")
    const data = await window.ElectronAPI.invoke('getRankingData')
    console.log(data)
    return data
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

export { getGraphData, getRankingData, getRankingData_byAllPublications, selectNode, selectEdge, onUpdate };