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
          {label: 'Carrinho', value: 'shopping_cart', icon: 'shopping_cart', leftColor: 'orange'},
          {label: 'Cifrão', value: 'attach_money', icon: 'attach_money', leftColor: 'orange'},
          {label: 'Cartão', value: 'credit_card', icon: 'credit_card', leftColor: 'orange'},
          {label: 'Gasolina', value: 'local_gas_station', icon: 'local_gas_station', leftColor: 'orange'},
          {label: 'Carro', value: 'directions_car', icon: 'directions_car', leftColor: 'orange'},
          {label: 'Casa', value: 'home', icon: 'home', leftColor: 'orange'},
          {label: 'Viagem', value: 'flight', icon: 'flight', leftColor: 'orange'},
          {label: 'Escolaridade', value: 'school', icon: 'school', leftColor: 'orange'},
          {label: 'Telefonia', value: 'call', icon: 'call', leftColor: 'orange'},
          {label: 'Energia', value: 'power', icon: 'power', leftColor: 'orange'},
          {label: 'Agua', value: 'opacity', icon: 'opacity', leftColor: 'orange'},
          {label: 'Pets', value: 'pets', icon: 'pets', leftColor: 'orange'},
          {label: 'Alimentação', value: 'local_dining', icon: 'local_dining', leftColor: 'orange'},
          {label: 'Lavanderia', value: 'local_laundry_service', icon: 'local_laundry_service', leftColor: 'orange'},
          {label: 'Cinema', value: 'local_movies', icon: 'local_movies', leftColor: 'orange'},
          {label: 'Academia', value: 'fitness_center', icon: 'fitness_center', leftColor: 'orange'},
          {label: 'Taxi', value: 'local_taxi', icon: 'local_taxi', leftColor: 'orange'},
          {label: 'Playstore', value: 'shop', icon: 'shop', leftColor: 'orange'},
          {label: 'Games', value: 'videogame_asset', icon: 'videogame_asset', leftColor: 'orange'},
          {label: 'Trabalho', value: 'work', icon: 'work', leftColor: 'orange'},
          {label: 'Presente', value: 'card_giftcard', icon: 'card_giftcard', leftColor: 'orange'},
          {label: 'Filho', value: 'child_care', icon: 'child_care', leftColor: 'orange'},
          {label: 'Bebê', value: 'child_friendly', icon: 'child_friendly', leftColor: 'orange'},
          {label: 'Bolo', value: 'cake', icon: 'cake', leftColor: 'orange'},
          {label: 'Hobbie', value: 'favorite', icon: 'favorite', leftColor: 'orange'},
          {label: 'Saúde', value: 'local_hospital', icon: 'local_hospital', leftColor: 'orange'}
          ]"/>
          <!--local_laundry_service-->

      </template>
      <template slot="field-prev" slot-scope="scope">
        <q-chip class="q-mt-sm" detail :icon="scope.form.icone" color="orange">{{scope.form.descricao}}</q-chip>
      </template>
      <template slot="coll-prev" slot-scope="scope">
        <q-chip v-ripple.mat class="q-mt-sm relative-position" @click="ir(scope.row)" :icon="scope.row.icone" color="orange">{{scope.row.descricao}}</q-chip>
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
        { name: 'descricao', label: 'Descrição', field: 'descricao', sortable: true, type: 'text', hide: true },
        { name: 'icone', label: 'Icone', field: 'icone', sortable: true, type: 'text', hide: true },
        { name: 'prev', label: 'Categoria', field: 'prev', sortable: true }
      ]
    }
  },
  computed: {
    service () {
      return CategoriaService
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
      this.filtro.categoria = row.descricao
      this.$router.push("financeiro")
    }
  }
}
</script>
<style lang="stylus">
.margem
  margin-top 20px
</style>
