/*
export const someMutation = (state) => {
}
*/
import moment from 'moment'
export var getFirstDay = function () {
  return moment().startOf('month').valueOf()
}

export var getLastDay = function () {
  return moment().endOf('month').valueOf()
}

export const setFiltroMovimento = (state, filtroMovimento) => {
  state.filtroMovimento = filtroMovimento
}

export const resetFiltroMovimento = (state) => {
  state.filtroMovimento = {dataInicio: getFirstDay(), dataFim: getLastDay(), carteira: null, categoria: null, efetivado: null, tipo: null}
}

export const setForm = (state, form) => {
  state.form = form
}