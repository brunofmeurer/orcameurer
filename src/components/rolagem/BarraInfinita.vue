<template>
  <div>
    <q-search style="search" icon="search"
      class="q-mb-sm q-mt-sm"
      color="dark"
      v-model="pesquisa" placeholder="..."
      stack-label="Buscar"
      :disabled="this.carregando"
      :disable="this.carregando"
      :debounce="700"
      clearable/>
    <q-infinite-scroll :handler="fetch" ref="infiniteScroll">
      <slot v-bind:list="list">
      </slot>
    </q-infinite-scroll>
    <div align="center" v-if="mensagemSemRegistros != ''"><p>{{mensagemSemRegistros}}</p></div>
    <carregar-infinito :paginacao="paginacao" :carregando="carregando"></carregar-infinito>
  </div>
</template>
<script>
import CarregarInfinito from './CarregarInfinito.vue'
export default {
  props: ['getMethod', 'param'],
  components: {
    CarregarInfinito
  },
  data () {
    return {
      list: [],
      carregando: false,
      pesquisa: '',
      mensagemSemRegistros: '',
      paginacao: {
        total: 0,
        registrosPorPagina: 15,
        iniciarDe: 0
      }
    }
  },
  methods: {
    getPaginacao () {
      return this.paginacao
    },
    pesquisar () {
      this.list = []
      this.$refs.infiniteScroll.reset()
      this.$refs.infiniteScroll.resume()
      this.paginacao.total = 0
    },
    fim () {
      if (this.list.length === 0) {
        this.mensagemSemRegistros = 'Busca sem resultado :('
      }
      this.$refs.infiniteScroll.stop()
    },
    fetch (index, done) {
      this.mensagemSemRegistros = ''
      this.paginacao.iniciarDe = (index != null ? index - 1 : 0) * this.paginacao.registrosPorPagina
      this.param.paginacao = this.paginacao
      this.param.pesquisa = this.pesquisa
      this.carregando = true
      this.getMethod(this.param).then((element) => {
        this.list = this.list.concat(element.data.registros)
        this.paginacao.total = this.list.length
        this.carregando = false
        if (element.data.registros.length < this.paginacao.registrosPorPagina) {
          this.paginacao.iniciarDe = this.paginacao.total
          this.fim()
        }
        done()
      })
    }
  },
  watch: {
    pesquisa (value) {
      this.pesquisar()
    }
  }
}
</script>

<style>

</style>
