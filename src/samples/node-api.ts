window.ElectronAPI.on('dblp-crawler-data', (event, ...args) => {
  console.log('[Receive Main-process message]:', event, ...args)
})