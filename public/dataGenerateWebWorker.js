// import * as faker from 'faker'
// import RandExp from 'randexp'

onmessage = function (e) {
  const { amount, props, generateFakeData } = e.data
  setInterval(() => {
    postMessage({ props, amount, generateFakeData, JSONFN: self.JSONFN })
  }, 1000)
}
