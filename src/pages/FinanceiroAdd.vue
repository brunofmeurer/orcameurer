<template>
  <q-page padding class="q-pt-sm bg-grey-1">
    <q-breadcrumbs separator=">" active-color="orange" color="orange">
      <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
      <q-breadcrumbs-el icon="trending_up" label="Financeiro" to="/financeiro" />
      <q-breadcrumbs-el icon="add" label="Adicionar" to="/financeiro/add" />
    </q-breadcrumbs>
    <q-card  class="bigger square q-pa-sm q-mt-sm">
      <q-card-main>
        <q-input class="q-pt-sm" v-model="form.descricao" color="orange" float-label="Descrição" type='text'
        :error="error($v.form.descricao)"/>
        <q-input class="q-pt-sm" v-model="form.valor" color="orange" float-label="Valor" type='number' prefix="R$"
        :error="error($v.form.valor)"/>
        <q-datetime
            v-model="form.data"
            type="date"
            color="orange"
            class="text-orange q-pt-sm"
            float-label="Data inicial"
            icon="date_range"
            format="DD/MM/YYYY"
            :error="error($v.form.data)"/>
        <q-radio class="q-pt-sm" v-model="form.tipo" val="Ganho" label="Ganho" color="orange"/>
        <q-radio class="q-pt-sm" v-model="form.tipo" val="Gasto" label="Gasto" color="orange"/>
        <q-select class="q-pt-sm" v-model="form.carteira" color="orange" float-label="Carteira" 
          :options="listCarteira"
          :error="error($v.form.carteira)"/>
        <q-select class="q-pt-sm" v-model="form.planejamento" color="orange" float-label="Planejamento" 
          :options="listPlanejamento"/>
        <q-select class="q-pt-sm" v-model="form.categoria" color="orange" float-label="Categoria" 
          :options="listCategoria"
          :error="error($v.form.planejamento)"/>
      </q-card-main>
      <q-card-separator />
      <q-card-actions vertical>
        <q-btn :loading="loadFiltro" color="orange" class="full-width" @click="cadastrar()">
          Confirmar
        </q-btn>
        <q-btn :loading="loadFiltro" color="orange" class="full-width" @click="cancelar()" flat>
          Cancelar
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style lang="stylus">
</style>

<script>
import CrudMixins from '../components/crud/CrudMixins.js'
import { required, minValue } from 'vuelidate/lib/validators'
import CarteiraService from '../services/carteira-service.js'
import CategoriaService from '../services/categoria-service.js'
import MovimentoService from '../services/movimento-service.js'
import PlanejamentoService from '../services/planejamento-service.js'
export default {
  name: 'FinanceiroAdd',
  mixins: [CrudMixins],
  data () {
    return {
      form: this.clearForm(),
      loadFiltro: false,
      listCarteira: [],
      listPlanejamento: [],
      listCategoria: []
    }
  },
  validations: {
    form: {
      descricao: { required },
      valor: { required, minValue: minValue(1)},
      categoria: { required },
      carteira: { required },
      data: { required }
    }
  },
  methods: {
    error (obj, isArray) {
      return obj != null && obj.$error
    },
    cancelar () {
      this.$router.push('/financeiro')
    },
    clearForm () {
      return {
        descricao: '',
        valor: 0,
        tipo: 'Ganho',
        data: Date.now(),
        carteira: '',
        planejamento: '',
        categoria: {}
      }
    },
    fetch () {
      var promises = []
      promises.push(this.getObjects(CarteiraService, 'listCarteira', 'doc', 'descricao'))
      promises.push(this.getObjects(PlanejamentoService, 'listPlanejamento', 'doc', 'descricao'))
      promises.push(this.getObjects(CategoriaService, 'listCategoria', 'object', 'descricao', 'icone', [{leftColor: 'orange'}]))
    }
  },
  computed: {
    service () {
      return MovimentoService
    }
  },
  mounted () {
    CarteiraService.set(this.$all)
    PlanejamentoService.set(this.$all)
    CategoriaService.set(this.$all)
    this.fetch()
  }
}
</script>
