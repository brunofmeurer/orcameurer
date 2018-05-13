import Helper from './helper.js'
import CategoriaService from './categoria-service.js'
var $all
var entidade = 'grupo'

function set (all) {
  $all = all
  Helper.set($all, entidade)
}

function getGrupo () {
  Helper.set($all, entidade)
  return Helper.getWhereGrupo('uid.' + $all.user.uid, '==', true)
}

function primeiroAcesso () {
  Helper.set($all, entidade)
  var grupo = {nome: 'Grupo Familiar', uid: {}}

  grupo.uid[$all.user.uid] = true
  return Helper.save(grupo).then((element) => {
    return getGrupo()
  }).then((element) => {
    $all.grupo = element
    CategoriaService.set($all)
    var grupo = element
    CategoriaService.salvarEmLote(
      [
        {descricao: 'Mercado', icone: 'shopping_cart'},
        {descricao: 'Gasolina', icone: 'local_gas_station'},
        {descricao: 'Carro', icone: 'directions_car'},
        {descricao: 'Moradia', icone: 'home'},
        {descricao: 'Viagem', icone: 'flight'},
        {descricao: 'Escolaridade', icone: 'school'},
        {descricao: 'Telefonia', icone: 'call'},
        {descricao: 'Energia', icone: 'power'},
        {descricao: 'Agua', icone: 'opacity'},
        {descricao: 'Animais', icone: 'pets'},
        {descricao: 'Alimentação', icone: 'local_dining'},
        {descricao: 'Lavanderia', icone: 'local_laundry_service'},
        {descricao: 'Cinema', icone: 'local_movies'},
        {descricao: 'Academia', icone: 'fitness_center'},
        {descricao: 'Playstore', icone: 'shop'},
        {descricao: 'Taxi', icone: 'local_taxi'},
        {descricao: 'Games', icone: 'videogame_asset'},
        {descricao: 'Salario', icone: 'attach_money'},
        {descricao: 'Trabalho', icone: 'work'},
        {descricao: 'Presente', icone: 'card_giftcard'},
        {descricao: 'Filho', icone: 'child_friendly'},
        {descricao: 'Hobbie', icone: 'favorite'}
      ])
  })
}

export default {
  set, getGrupo, primeiroAcesso
}
