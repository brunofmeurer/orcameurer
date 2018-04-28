<template>
  <q-page class="bg-grey-1">
    <div class="gradient shadow-1 relative-position" style="height: 150px;">
      <div class="absolute-center" align="center">
        {{movimento.valor | formatMoney}}
        <q-icon name="trending_up" v-show="movimento.tipo === 'Ganho'" color="positive"/>
        <q-icon name="trending_down" v-show="movimento.tipo === 'Gasto'" color="negative"/>
      </div>
    </div>
    <div class="relative-position">
      <q-btn fab color="dark" icon="edit" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" />
      <q-btn round color="dark" icon="delete" class="absolute" style="top: 0; right: 70px; transform: translateY(-50%);" size="sm"/>
    </div>
    
    <div class="absolute-center" align="center">
      <div style="transform: translateY(200%);">
        {{movimento.descricao}}
      </div>
      <div style="transform: translateY(200%);">
        <q-chip class="q-mt-sm" detail :icon="movimento.categoria.icone" color="orange">{{movimento.categoria.descricao}}</q-chip>
      </div>
    </div>
    
  </q-page>
</template>

<style lang="stylus">
  .gradient
    background: linear-gradient(#FF9800, #ffad00);
  button
    div
      i 
        color #FF9800
</style>

<script>
import MovimentoService from '../services/movimento-service.js'
export default {
  name: 'home',
  data () {
    return {
      movimento: {}
    }
  },
  methods: {
    fetch () {
      this.service.findByDoc(this.$route.params.doc).then(element => {
        this.movimento = element
      })
    }
  },
  computed: {
    service () {
      return MovimentoService
    }
  },
  mounted () {
    this.service.set(this.$all)
    this.fetch()
  }
}
</script>
