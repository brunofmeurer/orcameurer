import Helper from './helper.js'
var $all
var entidade = 'usuario'

function set (all) {
  $all = all
  Helper.set($all, entidade)
}

function getUsuarios () {
  Helper.set($all, entidade)
  return Helper.get()
}

function getUsuariosByUid (value) {
  Helper.set($all, entidade)
  return Helper.getWhere('uid', '==', value)
}

function saveUsuario (edit) {
  Helper.set($all, entidade)
  return Helper.save(edit)
}

function deleteUsuario (doc) {
  Helper.set($all, entidade)
  return Helper.del(doc)
}

export default {
  set, getUsuarios, saveUsuario, deleteUsuario, getUsuariosByUid
}
