<template>
  <q-page padding class="q-pt-sm bg-grey-1">
    <q-breadcrumbs separator=">" active-color="orange" color="orange">
      <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
      <q-breadcrumbs-el icon="trending_up" label="Financeiro" to="/financeiro" />
    </q-breadcrumbs>
    <q-card  class="bigger square q-pa-sm q-mt-sm">
      <q-collapsible icon="chrome_reader_mode" label="Filtros">
        <q-card-main>
          <q-datetime
            v-model="filtro.dataInicio"
            type="date"
            color="orange"
            class="text-orange q-pa-sm"
            float-label="Data inicial"
            icon="date_range"
            format="DD/MM/YYYY"/>
          <q-datetime
            v-model="filtro.dataFim"
            type="date"
            color="orange"
            class="text-orange q-pa-sm"
            float-label="Data final"
            icon="date_range"
            format="DD/MM/YYYY"/>
        </q-card-main>
        <q-card-separator />
        <q-card-actions vertical>
          <q-btn :loading="loadFiltro" color="orange" class="full-width">
            Filtrar
          </q-btn>
        </q-card-actions>
      </q-collapsible>
    </q-card>
    <div class="bg-grey-1 q-pa-xs q-mt-sm shadow-2">
      <div v-for="(movimento, index) in list" v-bind:key="index" class="q-pa-xs" v-touch-hold="handleHold">
        <q-card v-ripple.mat class="relative-position" >
          <q-card-title class="text-black">
            {{movimento.valor | formatMoney}}
            <div slot="right" class="row items-center text-black">
              <q-icon name="trending_up" v-show="movimento.tipo === 'Ganho'" color="positive"/>
              <q-icon name="trending_down" v-show="movimento.tipo === 'Gasto'" color="negative"/>
            </div>
          </q-card-title>
          <q-card-separator class="text-black"/>
          <q-card-main class="text-black">
            <p class="text-faded">{{movimento.descricao}}</p>
            <p>Data de transação: {{movimento.data | formatDate}}</p>
          </q-card-main>
          <q-card-actions vertical>
            <q-btn size="sm" color="dark" @click="visualizar(movimento.doc)">
              Visualizar
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="add"
        direction="up"
        color="dark">
        <q-fab-action color="dark" icon="add" @click="$router.push('financeiro/add')"/>
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<style lang="stylus">
  button
    div
      i 
        color #FF9800
  .text-black
    color #000000
  .text-orange
    color #FF9800
</style>

<script>
import moment from 'moment'
import MovimentoService from '../services/movimento-service.js'
import CrudMixins from '../components/crud/CrudMixins.js'
export default {
  name: 'Financeiro',
  mixins: [CrudMixins],
  data () {
    return {
      filtro: {dataInicio: this.getFirstDay(), dataFim: this.getLastDay()},
      loadFiltro: false,
      list: []
    }
  },
  methods: {
    getFirstDay () {
      return moment().startOf('month').valueOf()
    },
    getLastDay () {
      return moment().endOf('month').valueOf()
    },
    listar () {
      MovimentoService.listar().then(elements => {
        this.list = elements
      })
    },
    handleHold ({ position, duration, evt }) {
      this.$router.push('/financeiro/movimento/')
    },
    visualizar (doc) {
      this.$router.push('/financeiro/movimento/' + doc)
    },
  },
  computed: {
    service () {
      return MovimentoService
    }
  }
}
</script>
