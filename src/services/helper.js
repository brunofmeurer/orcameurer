import ContadorService from './contador-service.js'

var $all
var entidade

function set (all, param) {
  $all = all
  entidade = param
  ContadorService.set($all.db)
}

function get () {
  return $all.db.collection(entidade).get().then(querySnapshot => {
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
  return $all.db.collection(entidade).orderBy(field, 'asc').get().then(querySnapshot => {
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

function findById (id) {
  return $all.db.collection(entidade).where('id', '==', id).get().then(querySnapshot => {
    var obj
    querySnapshot.docChanges.forEach(delta => {
      obj = delta.doc.data()
      obj.doc = delta.doc.id
    })
    return obj
  })
}

function findByDoc (doc) {
  return $all.db.collection(entidade).doc(doc).get().then(querySnapshot => {
    var obj = querySnapshot.data()
    return obj
  })
}

function getWhere (field, operator, value) {
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

function get2Wheres (field, operator, value, field2, operator2, value2, fieldOrder) {
  if (fieldOrder == null) {
    fieldOrder = 'id'
  }
  return $all.db.collection(entidade).where(field, operator, value).where(field2, operator2, value2).orderBy(fieldOrder).get().then(querySnapshot => {
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
  return $all.db.collection(entidade).where(field, operator, value).where(field2, operator2, value2).where(field3, operator3, value3).orderBy(fieldOrder).get().then(querySnapshot => {
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

export default {
  set, get, getOrderBy, save, del, findById, findByDoc, getWhere, get2Wheres, get3Wheres
}
