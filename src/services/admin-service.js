import Helper from './helper.js'
var $all
var entidade = 'admin'

function set (all) {
  $all = all
  Helper.set($all, entidade)
}

function getAdminsByIsAdmin (value) {
  Helper.set($all, entidade)
  return Helper.getWhere('isAdmin', '==', value)
}

export default {
  set, getAdminsByIsAdmin
}
