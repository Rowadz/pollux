import mitt from 'mitt'

export const eventEmitter = mitt()

eventEmitter.on('DOCUMENT_GENERATED', (data) => {
  console.log(data)
})

eventEmitter.on('STARTED', (data) => {
  console.log(data)
})
