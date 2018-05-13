import Helper from './helper.js'
import moment from 'moment'
var $all
var entidade = 'movimento'

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

function getByData (filtro) {
  Helper.set($all, entidade)

  filtro.dataInicio = moment(filtro.dataInicio).startOf('day').valueOf()
  filtro.dataFim = moment(filtro.dataFim).endOf('day').valueOf()

  var fields = ['data', 'data']
  var operators = ['>=', '<=', '==', '==']
  var values = [filtro.dataInicio, filtro.dataFim]

  if (filtro.categoria != null) {
    fields.push('categoria.descricao')
    operators.push('==')
    values.push(filtro.categoria)
  }

  if (filtro.carteira != null) {
    fields.push('carteira.descricao')
    operators.push('==')
    values.push(filtro.carteira)
  }

  if (filtro.efetivado != null) {
    fields.push('efetivado')
    operators.push('==')
    values.push(filtro.efetivado)
  }

  if (filtro.tipo != null) {
    fields.push('tipo')
    operators.push('==')
    values.push(filtro.tipo)
  }
  
  return Helper.getWhereR(fields, operators, values, 'data', 'desc')

  // return Helper.get2Wheres('data', '>=', filtro.dataInicio, 'data', '<=', filtro.dataFim, 'data', 'desc')
}

function findByDoc (doc) {
  Helper.set($all, entidade)
  return Helper.findByDoc(doc)
}

function salvar (edit) {
  Helper.set($all, entidade)
  return Helper.save(edit)
}

function deletar (doc) {
  Helper.set($all, entidade)
  return Helper.del(doc)
}

export default {
  set, listar, salvar, deletar, getByUid, getByData, findByDoc
}
