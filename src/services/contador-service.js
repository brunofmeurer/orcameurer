var $db
var contador
function set (param1) {
  $db = param1
}

function getIncrementContador (entidade) {
  return getContador(entidade).then(element => {
    if (element != null) {
      contador = element
    }
    else {
      contador = {tabela: entidade, valor: 0}
    }

    atualizaContador()

    return contador
  })
}

function getContador (entidade) {
  return $db.collection('contador').where('tabela', '==', entidade).get().then(querySnapshot => {
    var obj
    querySnapshot.docChanges.forEach(delta => {
      obj = delta.doc.data()
      obj.doc = delta.doc.id
    })
    return obj
  })
}

function atualizaContador () {
  contador.valor = contador.valor + 1
  if (contador.doc != null) { // UPDATE
    var doc = contador.doc
    delete contador.doc
    return $db.collection('contador').doc(doc).update(contador).then(() => {
    }).catch(function (error) {
      console.error('Error updating document: ', error)
    })
  }
  else { // ADD
    return $db.collection('contador').add(contador).then(docRef => {
      return getContador()
    }).catch(function (error) {
      console.error('Error adding document: ', error)
    })
  }
}

export default {
  set, getIncrementContador
}
