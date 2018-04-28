<template>
  <q-page padding class="q-pt-sm bg-grey-2">
    <q-breadcrumbs separator=">" active-color="orange" color="orange">
      <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
      <q-breadcrumbs-el icon="label" :label="title" to="/categoria" />
    </q-breadcrumbs>
    <crud :service="service" :columns="columns" :title="title">
      <template slot="field-icone" slot-scope="scope">
        <q-select v-model="scope.form[scope.data.field]" color="orange" :float-label="scope.data.label" 
        :options="[
          {label: 'Carrinho de compras', value: 'shopping_cart', icon: 'shopping_cart', leftColor: 'orange'},
          {label: 'Cifrão', value: 'attach_money', icon: 'attach_money', leftColor: 'orange'},
          {label: 'Cartão', value: 'credit_card', icon: 'credit_card', leftColor: 'orange'},
          {label: 'Gasolina', value: 'local_gas_station', icon: 'local_gas_station', leftColor: 'orange'},
          {label: 'Carro', value: 'directions_car', icon: 'directions_car', leftColor: 'orange'},
          {label: 'Casa', value: 'home', icon: 'home', leftColor: 'orange'},
          {label: 'Viagem', value: 'flight_takeoff', icon: 'flight_takeoff', leftColor: 'orange'},
          {label: 'Escolaridade', value: 'school', icon: 'school', leftColor: 'orange'}
          ]"/>

      </template>
      <template slot="field-prev" slot-scope="scope">
        <q-chip class="q-mt-sm" detail :icon="scope.form.icone" color="orange">{{scope.form.descricao}}</q-chip>
      </template>
      <template slot="coll-prev" slot-scope="scope">
        <q-chip class="q-mt-sm" detail :icon="scope.row.icone" color="orange">{{scope.row.descricao}}</q-chip>
      </template>
    </crud>
  </q-page>
</template>
<script>
import CategoriaService from '../services/categoria-service.js'
import Crud from '../components/crud/Crud.vue'
export default {
  components: {
    Crud
  },
  data () {
    return {
      title: 'Categoria',
      columns: [
        { name: 'descricao', label: 'Descrição', field: 'descricao', sortable: true, type: 'text' },
        { name: 'icone', label: 'Icone', field: 'icone', sortable: true, type: 'text', hide: true },
        { name: 'prev', label: 'Prev.', field: 'prev', sortable: true }
      ]
    }
  },
  computed: {
    service () {
      return CategoriaService
    }
  }
}
</script>
<style lang="stylus">
.margem
  margin-top 20px
</style>
