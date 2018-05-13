<template>
  <q-page padding class="q-pt-sm bg-grey-1">
    <blockquote class="text-right round-borders text-italic" style="border-color: #FF9800">
      <p>{{mensagem}}</p>
      <small><cite>{{autor}}</cite></small>
    </blockquote>
    <hr>
    <grafico-barra :height="300" ref="graficoBarra" :chart-data="listBar" title="Carteiras e seus valores"></grafico-barra>
    <div class="q-pa-md">
      Total em caixa: {{total | formatMoney}}
    </div>
    <grafico-linha :height="300" class="" ref="graficoLinha" :chart-data="listLine" title="Resumo Transações dos ultimos/próximos (30) dias"></grafico-linha>
    <div class="q-pa-md">
      Total pendente: {{total | formatMoney}}
    </div>
    <grafico-pizza :height="300" ref="graficoPizza" :chart-data="listPie" title="6 Cateogrias mais movimentadas dos ultimos/próximos (30) dias"></grafico-pizza>
  </q-page>
</template>

<style lang="stylus">
</style>

<script>
import json from '../json/mensagens.json'
import GraficoMixins from '../components/grafico/GraficoMixins.js'
export default {
  name: 'home',
  mixins: [GraficoMixins],
  data () {
    return {
      mensagens: json.mensagens,
      loadFiltro: false
    }
  },
  methods: {
    generateNotification (numero) {
      cordova.plugins.notification.local.schedule({
        title: 'Notificação fixa',
        text: 'Teste de notificação fixa' + numero,
        foreground: true
      })
    },
    enviteNotification (numero) {
      cordova.plugins.notification.local.schedule({
        title: 'Happy Birthday!!!',
        trigger: { every: { minute: 1 } }
      })
    }
  },
  computed: {
    index: function () {
      return Math.floor(Math.random() * 99)
    },
    mensagem: function () {
      return '"' + this.mensagens[this.index].mensagem + '"'
    },
    autor: function () {
      return this.mensagens[this.index].autor
    },
    total: function () {
      var retorno = 0
      this.listBar.datasets[0].data.forEach(valor => {
        retorno += valor
      })
      return retorno
    },
    filtro: {
      get () {
        return this.$store.state.movimento.filtroMovimento
      }
    }
  },
  created () {
    document.addEventListener('deviceready', () => {
      this.generateNotification(2)
      this.enviteNotification(3)
    }, false)
  },
  beforeDestroy () {
    window.removeEventListener('deviceready', null, false)
  }
}
</script>
