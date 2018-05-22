<template>
  <q-page padding class="q-pt-sm bg-grey-1">
    <q-breadcrumbs separator=">" active-color="orange" color="orange">
      <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
      <q-breadcrumbs-el icon="trending_up" label="Financeiro" to="/financeiro" />
    </q-breadcrumbs>
    <q-card class="bigger square q-pa-sm q-mt-sm">
      <q-collapsible icon="filter_list" label="Filtros" ref="collaps">
        <q-card-main>
          <q-datetime
            v-model="filtro.dataInicio"
            type="date"
            color="orange"
            class="text-orange"
            float-label="Data inicial"
            icon="date_range"
            format="DD/MM/YYYY"/>
          <q-datetime
            v-model="filtro.dataFim"
            type="date"
            color="orange"
            class="text-orange q-pt-sm"
            float-label="Data final"
            icon="date_range"
            format="DD/MM/YYYY"/>
          <q-select v-model="filtro.efetivado" class="q-pt-sm" float-label="Efetivado?" clearable color="orange"
          :options="[
            { label: 'Efetivados', value:true, leftColor: 'orange', icon: 'thumb_up'},
            { label: 'Transação pendente', value:false, leftColor: 'orange', icon: 'thumb_down'}
          ]" />
          <q-select
            class="q-pt-sm"
            v-model="filtro.carteira"
            color="orange"
            float-label="Carteira"
            clearable
            :options="listCarteira"/>
          <q-select class="q-pt-sm" v-model="filtro.categoria" color="orange" float-label="Categoria" clearable
            :options="listCategoria"/>
          <q-select v-model="filtro.tipo" color="orange" float-label="Tipo" class="q-pt-sm" clearable
            :options="[
              {label: 'Despesa', value: 'Despesa', icon: 'trending_down', leftColor: 'negative'},
              {label: 'Ganho', value: 'Ganho', icon: 'trending_up', leftColor: 'positive'}
            ]"/>
        </q-card-main>
        <q-card-separator />
        <q-card-actions vertical>
          <q-btn :loading="loadFiltro" color="orange" class="full-width" @click="fetch()">
            Filtrar
          </q-btn>
          <q-btn :loading="loadFiltro" color="dark" class="full-width" @click="limpar()">
            Limpar
          </q-btn>
        </q-card-actions>
      </q-collapsible>
    </q-card>
    <div class="q-pa-md">
      <q-chip 
        v-for="filtroAplicado in filtrosAplicados"
        :key="filtroAplicado.value"
        @click="removerFiltro(filtroAplicado.name)"
        icon="clear"
        color="orange"
        detail
        dense>
        {{filtroAplicado.name}} : {{filtroAplicado.value}}
      </q-chip>
    </div>
    <div class="q-pa-md">
      Total movimentos: {{total | formatMoney}}
    </div>
    <div class="row justify-center">
      <q-progress indeterminate color="dark" v-show="carregandoLista" style="height: 3px"/>
    </div>
    <div class="bg-grey-1 q-pa-xs q-mt-sm shadow-2">
      <div v-if="list.length === 0" class="row justify-center q-pa-md">
        <q-icon name="error_outline" v-show="mensagemSemRegistro != 'Buscando...'"/> {{mensagemSemRegistro}}
      </div>
      <div v-for="(movimento, index) in list" v-bind:key="index" class="q-pa-xs">
        <q-card v-ripple.mat class="relative-position">
          <q-card-title v-bind:class="[(movimento.efetivado ? 'bg-green-2' : 'bg-red-2')]">
            {{movimento.valor | formatMoney}}
            <div slot="right" class="row items-center ">
              <q-chip detail icon="warning" color="negative" v-show="!movimento.efetivado" dense
                class="q-mt-sm absolute" style="top: 0; right: 56px; transform: translateY(82%);" >Transação Pendente</q-chip>
              <q-icon name="trending_up" v-show="movimento.tipo === 'Ganho'" color="positive"/>
              <q-icon name="trending_down" v-show="movimento.tipo === 'Despesa'" color="negative"/>
            </div>
          </q-card-title>
          <q-card-separator class=""/>
          <q-card-main class="">
            <p class="text-faded">{{movimento.descricao}} {{movimento.data | formatDate}}</p>
            <q-collapsible icon="pageview" label="Visualizar detalhe" ref="collaps2" v-show="movimento.grupo != null">
              <div class="row gutter-xs">
                <div class="col-md-4 col-sm-12" v-for="(item, index) in movimento.grupo" :key="index">
                  <q-card v-ripple.mat class="relative-position">
                    <q-card-title>
                      {{item.valor | formatMoney}}
                      <div slot="right" class="row items-center">
                        <q-icon name="trending_up" v-show="item.tipo === 'Ganho'" color="positive"/>
                        <q-icon name="trending_down" v-show="item.tipo === 'Despesa'" color="negative"/>
                      </div>
                    </q-card-title>
                    <q-card-separator class=""/>
                    <q-card-main class="">
                      <p class="text-faded">{{item.descricao}} {{item.data | formatDate}}</p>
                      <q-chip class="q-mt-sm" detail :icon="item.categoria.icone" color="orange" dense>{{item.categoria.descricao}}</q-chip>
                    </q-card-main>
                  </q-card>
                </div>
              </div>
            </q-collapsible>
            <q-chip class="q-mt-sm" detail :icon="movimento.categoria.icone" color="orange" dense>{{movimento.categoria.descricao}}</q-chip>
          </q-card-main>
          <q-card-actions vertical>
            <q-btn size="sm" color="dark" @click="visualizar(movimento)">
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
        <q-fab-action color="dark" icon="note_add" @click="$router.push('financeiro/add')"/>
        <q-fab-action color="dark" icon="filter_list" @click="filter()" v-back-to-top v-show="true"/>
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<style lang="stylus">
  button
    div
      i 
        color #FF9800
  .text-orange
    color #FF9800
</style>

<script>
import moment from 'moment'
import MovimentoService from '../services/movimento-service.js'
import CarteiraService from '../services/carteira-service.js'
import CategoriaService from '../services/categoria-service.js'
import CrudMixins from '../components/crud/CrudMixins.js'
import Seguranca from '../components/seguranca/Seguranca.js'
export default {
  name: 'Financeiro',
  mixins: [CrudMixins, Seguranca],
  data () {
    return {
      loadFiltro: false,
      list: [],
      listCarteira: [],
      listCategoria: [],
      carregandoLista: false,
      infoLoading: '',
      mensagemSemRegistro: 'Buscando...'
    }
  },
  methods: {
    getFirstDay () {
      return moment().startOf('month').valueOf()
    },
    getLastDay () {
      return moment().endOf('month').valueOf()
    },
    visualizar (movimento) {
      this.$store.dispatch('movimento/setForm', movimento)
      this.$router.push('/financeiro/view/' + movimento.doc)
    },
    fetch () {
      var promises = []
      promises.push(this.getObjects(CarteiraService, 'listCarteira', 'descricao', 'descricao'))
      promises.push(this.getObjects(CategoriaService, 'listCategoria', 'descricao', 'descricao', 'icone', [{leftColor: 'orange'}]))
      promises.push(this.filtrar('getByData', this.filtro))
      Promise.all(promises).then((response) => {
        this.mensagemSemRegistro = ' Sem movimentos :('
        this.listCategoria = response[1].sort((a, b) => {
          if (a.value < b.value)
            return -1
          if ( a.value > b.value)
            return 1
          return 0
        })
      })
    },
    filter () {
      this.$refs.collaps.show()
    },
    limpar () {
      this.$store.dispatch('movimento/resetFiltroMovimento')
    },
    removerFiltro (field) {
      this.filtro[field] = null
      this.fetch()
    }
  },
  computed: {
    service () {
      return MovimentoService
    },
    filtro: {
      get () {
        return this.$store.state.movimento.filtroMovimento
      }
    },
    total () {
      var retorno = 0
      this.list.forEach(e => {
        if (e.tipo === 'Ganho') {
          retorno += e.valor
        } else {
          retorno -= e.valor
        }
      })
      return retorno
    },
    filtrosAplicados () {
      var retorno = []
      var fixedFilters = ['dataInicio', 'dataFim']
      for (var field in this.filtro) {
        if (this.filtro[field] != null && !fixedFilters.includes(field)) {
          retorno.push({name: field, value: this.filtro[field]})
        }
      }
      return retorno
    }
  },
  afterDestroy () {
    this.$store.dispatch('movimento/setFiltroMovimento', this.filtro)
  },
  created () {
    this.carregandoLista = true
    this.init([this.service, CarteiraService, CategoriaService]).then(() => {
      this.fetch()
    })
  }
}
</script>
