export default {
  methods: {
    notify (mensagem, positivo) {
      return this.$q.notify(this.notificacao(mensagem, positivo))
    },
    notificacao (texto, positivo) {
      return {message: texto, position: 'top',  icon: positivo ? 'check' : 'warning', timeout: 1500, type: positivo ? 'positive' : 'negative'}
    }
  }
}
