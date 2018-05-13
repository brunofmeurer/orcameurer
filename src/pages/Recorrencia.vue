<template>
  <q-page padding class="q-pt-sm bg-grey-2">
    <q-breadcrumbs separator=">" active-color="orange" color="orange">
      <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
      <q-breadcrumbs-el icon="credit_card" :label="title" to="/carteira" />
    </q-breadcrumbs>
    <crud :service="service" :columns="columns" :title="title">
      <template slot="field-tipo" slot-scope="scope">
        <q-select v-model="scope.form[scope.data.field]" color="orange" :float-label="scope.data.label" 
        :options="[{label: 'Despesa', value: 'Despesa', icon: 'trending_down', leftColor: 'negative'}, {label: 'Ganho', value: 'Ganho', icon: 'trending_up', leftColor: 'positive'}]"/>
      </template>
      <template slot="field-periodo" slot-scope="scope">
        <q-select v-model="scope.form[scope.data.field]" color="orange" :float-label="scope.data.label" icon="date_range"
          :options="
          [
            {label: 'Mensal', value: 'Mensal', icon: 'date_range', leftColor: 'orange'},
            {label: 'Semestral', value: 'Semestral', icon: 'date_range', leftColor: 'orange'},
            {label: 'Anual', value: 'Anual', icon: 'date_range', leftColor: 'orange'},
            {label: 'Ilimitado', value: 'Ilimitado', icon: 'date_range', leftColor: 'orange'}
          ]"/>
      </template>
      <template slot="field-vencimento" slot-scope="scope">
        <q-datetime
            v-model="scope.form[scope.data.field]"
            type="date"
            color="orange"
            class="text-oranger"
            float-label="Data de vencimento"
            icon="date_range"
            format="DD/MM"/>
      </template>
      
      <template slot="coll-tipo" slot-scope="scope">
        <q-icon name="trending_up" color="positive" v-if="scope.row.tipo === 'Ganho'">
        </q-icon>
        <q-icon name="trending_down" color="negative" v-if="scope.row.tipo === 'Despesa'">
        </q-icon>
      </template>
    </crud>
  </q-page>
</template>
<script>
import RecorrenciaService from '../services/recorrencia-service.js'
import Crud from '../components/crud/Crud.vue'
export default {
  components: {
    Crud
  },
  data () {
    return {
      title: 'Recorrencias',
      columns: [
        { name: 'descricao', label: 'Descrição', field: 'descricao', sortable: true, type: 'text' },
        { name: 'valor', label: 'Valor', field: 'valor', sortable: true, type: 'number', format: this.$options.filters.formatMoney, prefix: 'R$' },
        { name: 'tipo', label: 'Tipo', field: 'tipo', sortable: true, type: 'text' },
        { name: 'periodo', label: 'Periodo', field: 'periodo', sortable: true, type: 'text', hide: true },
        { name: 'vencimento', label: 'Data de Vencimento', field: 'vencimento', sortable: true, type: 'date', hide: true }
      ]
    }
  },
  computed: {
    service () {
      return RecorrenciaService
    }
  }
}
</script>
<style lang="stylus">
.margem
  margin-top 20px
</style>
