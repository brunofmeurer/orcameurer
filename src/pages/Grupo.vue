<template>
  <q-page class="bg-grey-1">
    <div class="gradient shadow-1 relative-position" style="height: 150px;">
      <div class="absolute-center" align="center">
        <h3>{{form.nome}}
          <q-icon name="trending_up" v-show="form.tipo === 'Ganho'" color="positive"/>
          <q-icon name="trending_down" v-show="form.tipo === 'Despesa'" color="negative"/>
        </h3>
      </div>
    </div>
    <div class="row justify-center">
      <q-progress indeterminate color="dark" v-show="carregando" style="height: 3px"/>
    </div>
    <div class="relative-position">
      <q-btn fab color="dark" icon="share" class="absolute" style="top: 0; right: 8px; transform: translateY(-50%);" @click="editar()"/>
      <q-btn round color="dark" icon="exit_to_app" class="absolute" style="top: 0; right: 70px; transform: translateY(-50%);" size="sm" @click="deletar()"/>
    </div>
    <div class="absolute-center" align="center">
      <div style="transform: translateY(50%);">
        <q-card  class="bigger square q-pa-sm q-mt-sm" color="dark">
          <q-card-title>
            brunofmeurer@gmail.com
          </q-card-title>
        </q-card>
        <q-card  class="bigger square q-pa-sm q-mt-sm" color="dark">
          <q-card-title>
            daniela_haskel@hotmail.com
          </q-card-title>
        </q-card>
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
import Seguranca from '../components/seguranca/Seguranca.js'
import GrupoService from '../services/grupo-service.js'
export default {
  name: 'financeiroView',
  mixins: [CrudMixins],
  data () {
    return {
      form: {},
      carregando: false,
      infoLoading: '',
      selected: []
    }
  },
  methods: {
    fetch () {
      this.carregando = true
      this.infoLoading = 'Carregando form...'
      this.service.getGrupo().then(element => {
        this.carregando = false
        this.form = element[0]
        this.form.doc = this.$route.params.doc
        console.log(this.form)
      })
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
      return GrupoService
    }
  },
  created () {
    this.carregando = true
    this.init([this.service, GrupoService]).then(() => {
      this.fetch()
    })
  }
}
</script>
