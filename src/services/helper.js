import ContadorService from './contador-service.js'

var $all
var entidade

function set (all, param) {
  $all = all
  entidade = param
  ContadorService.set($all.db)
}

function get () {
  return $all.db.collection(entidade).where('uidGrupo', '==', $all.grupo[0].doc).get().then(querySnapshot => {
    var obj
    var table = []
    querySnapshot.docChanges.forEach(delta => {
      obj = delta.doc.data()
      obj.doc = delta.doc.id
      table.push(obj)
    })
    return table
  })
}

function getOrderBy (field) {
  return $all.db.collection(entidade).where('uidGrupo', '==', $all.grupo[0].doc).orderBy(field, 'asc').get().then(querySnapshot => {
    var obj
    var table = []
    querySnapshot.docChanges.forEach(delta => {
      obj = delta.doc.data()
      obj.doc = delta.doc.id
      table.push(obj)
    })
    return table
  })
}

function del (doc) {
  return $all.db.collection(entidade).doc(doc).delete()
}

function save (edit) {
  if ($all.grupo.length > 0) {
    edit.uidGrupo = $all.grupo[0].doc
  }
  if (edit.doc != null) { // UPDATE
    var doc = edit.doc
    delete edit.doc
    return $all.db.collection(entidade).doc(doc).update(edit).then(() => {
      edit.doc = doc
    })
  }
  else { // ADD
    return ContadorService.getIncrementContador(entidade).then(cont => {
      edit.id = cont.valor

      return $all.db.collection(entidade).add(edit).then(docRef => {
        edit.doc = docRef.id
        return edit.id
      })
    })
  }
}

function salvarEmLote (list) {
  return ContadorService.getIncrementContador(entidade).then(cont => {
    list.forEach(element => {
      if ($all.grupo.length > 0) {
        element.uidGrupo = $all.grupo[0].doc
      }
      element.id = cont.valor
      cont.valor++
      $all.db.collection(entidade).add(element)
    })
    ContadorService.salvar(cont)
  })
}

function findById (id) {
  return $all.db.collection(entidade).where('uidGrupo', '==', $all.grupo[0].doc).where('id', '==', id).get().then(querySnapshot => {
    var obj
    querySnapshot.docChanges.forEach(delta => {
      obj = delta.doc.data()
      obj.doc = delta.doc.id
    })
    return obj
  })
}

function getWhereGrupo (field, operator, value) {
  return $all.db.collection(entidade).where(field, operator, value).get().then(querySnapshot => {
    var obj
    var table = []
    querySnapshot.docChanges.forEach(delta => {
      obj = delta.doc.data()
      obj.doc = delta.doc.id
      table.push(obj)
    })
    return table
  })
}
function findByDoc (doc) {
  return $all.db.collection(entidade).doc(doc).get().then(querySnapshot => {
    var obj = querySnapshot.data()
    return obj
  })
}

function getWhere (field, operator, value) {
  return $all.db.collection(entidade).where('uidGrupo', '==', $all.grupo[0].doc).where(field, operator, value).get().then(querySnapshot => {
    var obj
    var table = []
    querySnapshot.docChanges.forEach(delta => {
      obj = delta.doc.data()
      obj.doc = delta.doc.id
      table.push(obj)
    })
    return table
  })
}

function get2Wheres (field, operator, value, field2, operator2, value2, fieldOrder, orientation) {
  console.log("TESTE1234", $all.grupo)
  if (fieldOrder == null) {
    fieldOrder = 'id'
    orientation = 'asc'
  }
  return $all.db.collection(entidade).where('uidGrupo', '==', $all.grupo[0].doc).where(field, operator, value).where(field2, operator2, value2).orderBy(fieldOrder, orientation).get().then(querySnapshot => {
    var obj
    var table = []
    querySnapshot.docChanges.forEach(delta => {
      obj = delta.doc.data()
      obj.doc = delta.doc.id
      table.push(obj)
    })
    return table
  })
}

function get3Wheres (field, operator, value, field2, operator2, value2, field3, operator3, value3, fieldOrder) {
  if (fieldOrder == null) {
    fieldOrder = 'id'
  }
  return $all.db.collection(entidade).where('uidGrupo', '==', $all.grupo[0].doc).where(field, operator, value).where(field2, operator2, value2).where(field3, operator3, value3).orderBy(fieldOrder).get().then(querySnapshot => {
    var obj
    var table = []
    querySnapshot.docChanges.forEach(delta => {
      obj = delta.doc.data()
      obj.doc = delta.doc.id
      table.push(obj)
    })
    return table
  })
}

function getWhereR (fields, operators, values, orderField, orientation, exec, index) {
  if (index == null) {
    index = 0
  } else { 
    index++
  }

  if (exec == null) {
    exec = $all.db.collection(entidade).where('uidGrupo', '==', $all.grupo[0].doc)
  }
  
  exec = exec.where(fields[index], operators[index], values[index])

  if (fields.length - 1 === index) {
    return exec.orderBy(orderField, orientation).get().then(querySnapshot => {
      var obj
      var table = []
      querySnapshot.docChanges.forEach(delta => {
        obj = delta.doc.data()
        obj.doc = delta.doc.id
        table.push(obj)
      })
      return table
    })
  } else {
    return getWhereR(fields, operators, values, orderField, orientation, exec, index)
  }
}

export default {
  set, get, getOrderBy, save, salvarEmLote, del, findById, findByDoc, getWhereGrupo, getWhere, get2Wheres, get3Wheres, getWhereR
}
