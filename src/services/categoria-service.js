import Helper from './helper.js'
var $all
var entidade = 'categoria'

function set (all) {
  $all = all
  Helper.set($all, entidade)
}

function listar () {
  Helper.set($all, entidade)
  return Helper.get()
}

function getByUid (value) {
  Helper.set($all, entidade)
  return Helper.getWhere('uid', '==', value)
}

function salvar (edit) {
  Helper.set($all, entidade)
  return Helper.save(edit)
}

function salvarEmLote (list) {
  Helper.set($all, entidade)
  return Helper.salvarEmLote(list)
}

function deletar (doc) {
  Helper.set($all, entidade)
  return Helper.del(doc)
}

export default {
  set, listar, salvar, salvarEmLote, deletar, getByUid
}
