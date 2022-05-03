// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./dataGenerateWebWorker'

export const spawnWebWorker = async ({ props, amount, modelId }) => {
  const generateWorker = worker()

  return generateWorker.startGenerating(props, amount, modelId)
}
