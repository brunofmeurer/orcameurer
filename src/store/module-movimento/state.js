import moment from 'moment'
export var getFirstDay = function () {
  return moment().startOf('month').valueOf()
}

export var getLastDay = function () {
  return moment().endOf('month').valueOf()
}

export default {
  filtroMovimento: {dataInicio: getFirstDay(), dataFim: getLastDay(), carteira: null, categoria: null, efetivado: null, tipo: null},
  form: {}
}