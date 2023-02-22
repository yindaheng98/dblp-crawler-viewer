export async function getGraphData() {
    return await window.ElectronAPI.invoke('getGraphData')
}
export async function getRankingData_byAllPublications() {
    return await window.ElectronAPI.invoke('getRankingData', 'byAllPublications')
}
export async function getRankingData() {
    return await window.ElectronAPI.invoke('getRankingData')
}
export function onUpdate(callback) {
    window.ElectronAPI.on('update', callback)
}

export function selectNode(id) {
    window.ElectronAPI.send('selectNode', id)
}
export function onSelectNode(callback) {
    window.ElectronAPI.on('selectNode', callback)
}
export async function getSelectedNode() {
    return await window.ElectronAPI.invoke('getSelectedNode')
}
export async function getNodeCCFData(id: string) {
    return await window.ElectronAPI.invoke('getNodeCCFData', id)
}
export async function getNodeConfData(id: string) {
    return await window.ElectronAPI.invoke('getNodeConfData', id)
}

export function selectEdge(from, to) {
    window.ElectronAPI.send('selectEdge', from, to)
}
export function onSelectEdge(callback) {
    window.ElectronAPI.on('selectEdge', callback)
}
export async function getSelectedEdge() {
    return await window.ElectronAPI.invoke('getSelectedEdge')
}
export async function getEdgeCCFData(from: string, to: string) {
    return await window.ElectronAPI.invoke('getEdgeCCFData', from, to)
}
export async function getEdgeConfData(from: string, to: string) {
    return await window.ElectronAPI.invoke('getEdgeConfData', from, to)
}

export async function isSelectedNode() {
    return await window.ElectronAPI.invoke('isSelectedNode')
}