<template>
  <q-page class="bg-grey-1">
    <div class="gradient shadow-1 relative-position" style="height: 150px;">
      <div class="absolute-center" align="center">
        <h3>{{form.valor | formatMoney}}
          <q-icon name="trending_up" v-show="form.tipo === 'Ganho'" color="positive"/>
          <q-icon name="trending_down" v-show="form.tipo === 'Despesa'" color="negative"/>
        </h3>
      </div>
    </div>
    <div class="row justify-center">
      <q-progress indeterminate color="dark" v-show="carregando" style="height: 3px"/>
    </div>
    <div class="relative-position">
      <q-btn fab color="dark" icon="edit" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" @click="editar()"/>
      <q-btn round color="dark" icon="delete" class="absolute" style="top: 0; right: 70px; transform: translateY(-50%);" size="sm" @click="deletar()"/>
      <q-btn round color="dark" icon="thumb_up" class="absolute" style="top: 0; right: 106px; transform: translateY(-50%);" size="sm" v-show="!form.efetivado" @click="efetivar()"/>
    </div>
    <div class="absolute-center" align="center">
      <div style="transform: translateY(200%);">
        {{form.descricao}}
      </div>
      <div style="transform: translateY(200%);" v-if="form.categoria != null">
        <q-chip class="q-mt-sm" detail :icon="form.categoria.icone" color="orange">{{form.categoria.descricao}}</q-chip>
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
import CrudMixins from '../components/crud/CrudMixins.js'
import CarteiraService from '../services/carteira-service.js'
import MovimentoService from '../services/movimento-service.js'
import Seguranca from '../components/seguranca/Seguranca.js'
export default {
  name: 'financeiroView',
  mixins: [CrudMixins],
  data () {
    return {
      carregando: false,
      infoLoading: '',
      selected: []
    }
  },
  methods: {
    fetch () {
      this.carregando = false
      this.form.doc = this.form.doc
    },
    editar () {
      this.$router.push('/financeiro/edit/' + this.form.doc)
    },
    deletar () {
      this.selected.push(this.form)
      var retorno = this.excluir()
      this.baixar(-1)
      retorno.then(() => {
        this.$router.push('/financeiro')
      })
    },
    efetivar () {
      this.baixar(1)
    },
    baixar (fator) {
      
      this.form.efetivado = true
      
      var retorno = this.cadastrar()
      if (!retorno) {
        return 
      }
      var valor = this.form.valor * fator

      if (this.form.tipo === 'Despesa') {
        valor = -valor
      }
      retorno.then(() => {
        CarteiraService.findByDoc(this.form.carteira.doc).then(element => {
          element.doc = this.form.carteira.doc
          element.valor += valor
          CarteiraService.salvar(element).then(this.fetch)
        })
      })
    }
  },
  computed: {
    service () {
      return MovimentoService
    },
    form: {
      get () {
        return this.$store.state.movimento.form
      }
    }
  },
  created () {
    this.carregando = true
    this.init([this.service, CarteiraService]).then(() => {
      this.fetch()
    })
  }
}
</script>
