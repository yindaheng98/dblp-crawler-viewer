window.ElectronAPI.on('dblp-crawler', (event, ...args) => {
  console.log('[Receive Main-process message]:', event, ...args)
})