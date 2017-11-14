import PouchDB from 'pouchdb'
import _ from 'lodash'

const db = new PouchDB('processed')
const remotedb = new PouchDB('https://bestgametowatch.cloudant.com/b_processed')
const store = {}

PouchDB.debug.disable()

store.init = (callback) => {
  db.replicate.from(remotedb, {live: false}).on('change', function (change) {
    //console.log('change', change)
    callback()
  }).on('error', function (err) {
    console.log('err-replicate', err)
  }).then(
      //console.log('done')
      callback()
  ).catch(function (err) {
    console.log('replicate error', err);
  });
}

store.findAll = (obj, prop) => {
  console.log('findAll', remotedb)
  db.allDocs({
    include_docs: true
  }).then(function (result) {
    console.log('find games', result.rows)
    obj[prop] =  result.rows.map(function (game) { return game.doc })
    //obj[prop] = result.rows
  }).catch(function (err) {
    console.log('find games error', err);
  });
}


store.findPostById = (id) => {
  return db.get(id)
}

export default store
