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
        { name: 'tipo', label: 'Tipo', field: 'tipo', sortable: true, type: 'text' }
      ]
    }
  },
  computed: {
    service () {
      return CarteiraService
    }
  }
}
</script>
<style lang="stylus">
.margem
  margin-top 20px
</style>
