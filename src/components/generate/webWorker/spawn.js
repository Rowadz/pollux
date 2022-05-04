// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./dataGenerateWebWorker'
import { eventEmitter } from './eventEmitter'

// this runs in a web worker
export const spawnWebWorker = async ({ props, amount, modelId }) => {
  const generateWorker = worker()
  generateWorker.onmessage = ({ data }) => {
    // here you have an access to the window object!
    console.log(data)
    eventEmitter.emit(data.type, { ...data })
  }
  return generateWorker.startGenerating(props, amount, modelId)
}
