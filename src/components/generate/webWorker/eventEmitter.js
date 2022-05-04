import mitt from 'mitt'

export const eventEmitter = mitt()

// eventEmitter.on('DOCUMENT_GENERATED', ({ modelId }) => {
//   postMessage({})
//   store.dispatch(setProgress({ modelId }))
//   store.dispatch(enableAuth())
// })

// eventEmitter.on('STARTED', (data) => {
//   console.log('%cweb worker started...', 'color: lightcoral; font-size: 15px')
// })
