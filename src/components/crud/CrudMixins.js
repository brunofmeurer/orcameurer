import Notificacao from '../notificacao/Notificacao.js'
export default {
  mixins: [Notificacao],
  methods: {
    listar () {
      this.infoLoading = 'Listando registros...'
      this.carregandoLista = true
      this.service.listar().then(elements => {
        this.list = elements
        this.carregandoLista = false
      })
    },
    cadastrar () {
      if (this.$v != null) {
        this.$v.$touch()
        if (this.$v.$error) {
          return
        }
      }
      this.infoLoading = 'Criando registro...'
      this.carregando = true // inicia loading
      this.service.salvar(this.form).then(element => {
        this.carregando = false // finaliza loading
        this.notify('Adicionado/Alterado com sucesso!', true)
        this.cancelar()
        this.listar()
      })
    },
    excluir () {
      this.selected.forEach(element => {
        this.$q.dialog({
          title: 'Excluir',
          message: 'Deseja realmente excluir?',
          ok: 'Sim',
          cancel: 'Não',
          color: 'orange'
        }).then(() => {
          this.carregandoLista = true
          return this.service.deletar(element.doc)
        }).then(() => {
          this.notify('Excluido com sucesso!', true)
          this.listar()
        }).catch(() => {})
      })
    },
    getObjects (service, list, fieldValue, fieldLabel, fieldIcon, args) {
      this[list] = []
      args = args != null ? args : []
      service.listar().then(elements => {
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
      })
    }
  },
  created () {
    this.service.set(this.$all)
    this.listar()
  }
}
