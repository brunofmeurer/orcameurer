import Firebase from 'firebase'
require('firebase/firestore')

var config = {
  apiKey: 'AIzaSyCp4tKI35hvMXbcwxRU9Vf30lpkZKI-Py8',
  authDomain: 'orcameurer.firebaseapp.com',
  databaseURL: 'https://orcameurer.firebaseio.com',
  projectId: 'orcameurer',
  storageBucket: 'orcameurer.appspot.com',
  messagingSenderId: '1008066633156'
}

const connection = Firebase.initializeApp(config)
const DB = connection.firestore()
const AUTH = connection.auth()
const STORAGE = connection.storage().ref()
var GRUPO = {}

export default ({ Vue }) => {
  Object.defineProperties(Vue.prototype, {
    $db: {
      get () {
        return DB
      }
    },
    $auth: {
      get () {
        return AUTH
      }
    },
    $storage: {
      get () {
        return STORAGE
      }
    },
    $user: {
      get () {
        return this.$auth.currentUser
      }
    },
    $grupo: {
      get () {
        return GRUPO
      },
      set (value) {
        GRUPO = value
      }
    },
    $all: {
      get () {
        return {db: this.$db, auth: this.$auth, user: this.$user, storage: this.$storage, grupo: this.$grupo}
      }
    },
    $meses: {
      get () {
        return ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      }
    },
    $dias: {
      get () {
        return ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado']
      }
    }
  })
}
