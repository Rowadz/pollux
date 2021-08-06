export default (auth=false) => ({
  description:
    'The file is generated using https://mohammedal-rowad.github.io/pollux/',
  scripts: {
    dev: `${auth ? 'json-server-auth' : 'json-server'} --watch db.json -r routes.json`,
  },
  author: 'Rowadz',
  license: 'MIT',
  dependencies: {
    'json-server': '^0.16.2',
    'json-server-auth': '^2.0.2'
  },
})
