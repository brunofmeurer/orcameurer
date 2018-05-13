<template>
  <q-page padding class="q-pt-sm bg-grey-2">
    <q-breadcrumbs separator=">" active-color="orange" color="orange">
      <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
      <q-breadcrumbs-el icon="credit_card" :label="title" to="/carteira" />
    </q-breadcrumbs>
    <crud :service="service" :columns="columns" :title="title">
      <template slot="field-tipo" slot-scope="scope">
        <q-select v-model="scope.form[scope.data.field]" color="orange" :float-label="scope.data.label" 
        :options="[{label: 'Investimento', value: 'Investimento'}, {label: 'Armazenamento', value: 'Armazenamento'}]"/>
      </template>
      <template slot="coll-descricao" slot-scope="scope">
        <q-btn @click="ir(scope.row)" :label="scope.row.descricao" flat size="sm"/>
      </template>
      <template slot="coll-valor" slot-scope="scope">
        <q-chip color="negative" v-show="scope.row.valor < 0">{{scope.row.valor | formatMoney}}</q-chip>
        <q-chip color="positive" v-show="scope.row.valor > 0">{{scope.row.valor | formatMoney}}</q-chip>
        <q-chip v-show="scope.row.valor == null || scope.row.valor == 0">R$0</q-chip>
      </template>
    </crud>
  </q-page>
</template>
<script>
import CarteiraService from '../services/carteira-service.js'
import Crud from '../components/crud/Crud.vue'
export default {
  components: {
    Crud
  },
  data () {
    return {
      title: 'Carteira',
      columns: [
        { name: 'descricao', label: 'Descrição', field: 'descricao', sortable: true, type: 'text' },
        { name: 'valor', label: 'Valor atual', field: 'valor', sortable: true, type: 'number', format: this.$options.filters.formatMoney, prefix: 'R$' },
        { name: 'tipo', label: 'Tipo', field: 'tipo', sortable: true, type: 'text', hide: true }
      ]
    }
  },
  computed: {
    service () {
      return CarteiraService
    },
    filtro: {
      get () {
        return this.$store.state.movimento.filtroMovimento
      }
    }
  },
  methods: {
    ir (row) {
      this.$store.dispatch('movimento/resetFiltroMovimento')
      this.filtro.carteira = row.descricao
      this.$router.push("financeiro")
    }
  }
}
</script>
<style lang="stylus">
.margem
  margin-top 20px
</style>
