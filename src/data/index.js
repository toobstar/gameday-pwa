import PouchDB from 'pouchdb'
import _ from 'lodash'

const db = new PouchDB('b_results6')
const remotedb = new PouchDB('https://bestgametowatch.cloudant.com/b_results')
const store = {}

PouchDB.debug.disable()

store.init = () => {
  //db.replicate.from(remotedb, {live: false}).on('change', function (change) {
  //  console.log('change', change)
  //}).on('error', function (err) {
  //  console.log('err-replicate', err)
  //}).then(
  //    console.log('done')
  //).catch(function (err) {
  //  console.log('replicate error', err);
  //});
}

store.find = () => {
  return db.allDocs({include_docs: true})
}

store.find2 = (obj, prop) => {
  console.log('find2', remotedb)

  //db.allDocs({
  remotedb.get('20171017-boston-celtics-at-cleveland-cavaliers', {
    include_docs: true
  }).then(function (result) {
    console.log('find games', result)
    //result.rows.forEach(function(doc) {
    //  console.log('doc', doc.value)
    //})
    obj[prop] = [result]
  }).catch(function (err) {
    console.log('find games error', err);
  });
}


store.findPostById = (id) => {
  return db.get(id)
}

export default store
