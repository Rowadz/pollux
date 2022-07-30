// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./dataGenerateWebWorker'
import { eventEmitter } from './eventEmitter'

// this runs in a web worker
export const spawnWebWorker = async ({
  props,
  amount,
  modelId,
  relations,
  relationsProps,
  locale,
}) => {
  const maxWorkers = navigator.hardwareConcurrency || 4
  console.log(`%cUsing ${maxWorkers} workers`, 'color: lightsalmon;')
  const allWorkers = Array.from({ length: maxWorkers }).map(() => {
    const webWorker = worker()
    webWorker.onmessage = ({ data }) => {
      // here you have an access to the window object!
      eventEmitter.emit(data.type, { ...data })
    }
    return webWorker.startGenerating(
      props,
      amount / maxWorkers,
      modelId,
      relations,
      relationsProps,
      locale
    )
  })

  return await Promise.all(allWorkers)
}
