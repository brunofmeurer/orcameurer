import Notificacao from '../notificacao/Notificacao.js'
import Seguranca from '../seguranca/Seguranca.js'
export default {
  mixins: [Notificacao, Seguranca],
  methods: {
    listar () {
      this.infoLoading = 'Listando registros...'
      this.carregandoLista = true
      this.service.listar().then(elements => {
        this.list = elements
        this.carregandoLista = false
      })
    },
    filtrar (method, filtro) {
      this.infoLoading = 'Listando registros...'
      this.carregandoLista = true
      return this.service[method](filtro).then(elements => {
        this.list = elements
        this.carregandoLista = false
      })
    },
    cadastrar () {
      if (this.$v != null) {
        this.$v.$touch()
        if (this.$v.$error) {
          return false
        }
      }
      this.infoLoading = 'Criando registro...'
      this.carregando = true // inicia loading
      return this.service.salvar(this.form).then(element => {
        this.carregando = false // finaliza loading
        this.notify('Adicionado/Alterado com sucesso!', true)
        if (this.cancelar != null) {
          this.cancelar()
        }
        this.listar()
      })
      return true
    },
    excluir () {
      var retorno = {}
      this.selected.forEach(element => {
        retorno = this.$q.dialog({
          title: 'Excluir',
          message: 'Deseja realmente excluir?',
          ok: 'Sim',
          cancel: 'Não',
          color: 'orange'
        }).then(() => {
          this.carregandoLista = true
          this.carregando = true
          return this.service.deletar(element.doc)
        }).then(() => {
          this.notify('Excluido com sucesso!', true)
          this.listar()
        }).catch(() => {})
      })
      return retorno
    },
    getObjects (service, list, fieldValue, fieldLabel, fieldIcon, args) {
      this[list] = []
      args = args != null ? args : []
      return service.listar().then(elements => {
        elements.forEach(element => {
          var obj = {}
          if (fieldValue === 'object') {
            obj.value = element
          } else {
            obj.value = element[fieldValue]
          }
          obj.label = element[fieldLabel]
          obj.icon = element[fieldIcon]
          args.forEach(element2 => {
            for(var key in element2) {
              obj[key] = element2[key]
            }
          })
          if (obj.value != null) {
            this[list].push(obj)
          }
        })
        return this[list]
      })
    },
    convertObsToForm (obs) {
      var retorno = {}
      for(var key in obs) {
        retorno[key] = obs[key]
      }
      return retorno
    }
  },
  created () {
    this.carregandoLista = true
    this.init([this.service]).then(() => {
      if (this.service.listar != null) {
        this.listar()
      }
    })
  }
}
