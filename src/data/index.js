import PouchDB from 'pouchdb'
import moment from 'moment'
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

    let gameArray = result.rows.map(function (game) { return game.doc })

    gameArray.sort(function(a, b){ // most recent first
      if(a.event_start_date_time < b.event_start_date_time) return 1;
      if(a.event_start_date_time > b.event_start_date_time) return -1;
      return 0;
    })

    gameArray.forEach(function(game) {
      game.showOzDetail = false
      game.date = moment(game.event_start_date_time).format("MMM Do")
      if (!game.aussies || game.aussies.length == 0) {
        game.aussies = undefined
      }
    })

    obj[prop] = gameArray
    //obj[prop] = result.rows
  }).catch(function (err) {
    console.log('find games error', err);
  });
}


store.findPostById = (id) => {
  return db.get(id)
}

export default store
