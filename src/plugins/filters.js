import moment from 'moment'
export default ({ app, router, Vue }) => {
  Vue.filter('formatDate', function (value) {
    if (value) {
      return moment(value).format('DD/MM/YYYY')
    }
  })
  Vue.filter('formatMoney', function (value) {
    if (value) {
      var retorno = value
      if (retorno == null) {
        retorno = 0
      }
      return ('R$' + retorno.toFixed(2)).replace('.', ',')
    }
  })
}
