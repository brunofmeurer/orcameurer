export const setFiltroMovimento = ({commit}, filtroMovimento) => {
  commit('setFiltroMovimento', filtroMovimento)
}

export const resetFiltroMovimento = ({commit}) => {
  commit('resetFiltroMovimento')
}

export const setForm = ({commit}, form) => {
  commit('setForm', form)
}

export const regeraFatura = ({commit}, value) => {
  commit('regeraFatura', value)
}
