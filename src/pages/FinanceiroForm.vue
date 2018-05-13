<template>
  <q-page padding class="q-pt-sm bg-grey-1">
    <q-breadcrumbs separator=">" active-color="orange" color="orange">
      <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
      <q-breadcrumbs-el icon="trending_up" label="Financeiro" to="/financeiro" />
      <q-breadcrumbs-el icon="add" label="Adicionar" to="/financeiro/add" v-if="$route.params.doc == null" />
      <q-breadcrumbs-el icon="edit" label="Editar" to="/financeiro/edit" v-else/>
    </q-breadcrumbs>
    <q-card  class="bigger square q-pa-sm q-mt-sm">
      <q-card-main>
        <q-select class="q-pt-sm" v-model="form.recorrencia" color="orange" float-label="Recorrência" clearable
          :options="listRecorrencia" @input="inputReccorencia(form.recorrencia)"/>
        <q-input class="q-pt-sm" v-model="form.descricao" color="orange" float-label="Descrição" type='text'
        :error="error($v.form.descricao)"/>
        <q-input class="q-pt-sm" v-model="form.valor" color="orange" float-label="Valor" type='number' prefix="R$"
        :error="error($v.form.valor)"
        :disable="desabilitaValor"/>
        <q-datetime
            v-model="form.data"
            type="date"
            color="orange"
            class="text-orange q-pt-sm"
            float-label="Data inicial"
            icon="date_range"
            format="DD/MM/YYYY"
            :error="error($v.form.data)"
            @input="inputDate"/>
        <q-radio class="q-pt-sm" v-model="form.tipo" val="Ganho" label="Ganho" color="orange"/>
        <q-radio class="q-pt-sm" v-model="form.tipo" val="Despesa" label="Despesa" color="orange"/>
        <q-select
          class="q-pt-sm"
          v-model="form.carteira"
          color="orange"
          float-label="Carteira"
          clearable
          :options="listCarteira"
          :error="error($v.form.carteira)"
          :disable="desabilitaCarteira"/>
        <q-select class="q-pt-sm" v-model="form.categoria" color="orange" float-label="Categoria"  clearable
          :options="listCategoria"
          :error="error($v.form.categoria)"
          ref="listCat"/>
        <q-toggle v-model="form.efetivado" class="q-pt-sm" label="Movimento já efetivado?" color="orange" :disable="desabilitaEfetivado"/>
      </q-card-main>
      <q-card-separator />
      <q-card-actions vertical>
        <q-btn color="orange" class="full-width" @click="cadastrarOuAlterar()">
          Confirmar
        </q-btn>
        <q-btn color="orange" class="full-width" @click="cancelar()" flat>
          Cancelar
        </q-btn>
      </q-card-actions>
    </q-card>
    <q-inner-loading :visible="carregando">
      <q-spinner-gears size="50px" color="dark"></q-spinner-gears>
      {{infoLoading}}
    </q-inner-loading>
  </q-page>
</template>

<style lang="stylus">
</style>

<script>

import moment from 'moment'
import CrudMixins from '../components/crud/CrudMixins.js'
import { required, minValue } from 'vuelidate/lib/validators'
import CarteiraService from '../services/carteira-service.js'
import CategoriaService from '../services/categoria-service.js'
import MovimentoService from '../services/movimento-service.js'
import RecorrenciaService from '../services/recorrencia-service.js'
import Seguranca from '../components/seguranca/Seguranca.js'
export default {
  name: 'FinanceiroAdd',
  mixins: [CrudMixins, Seguranca],
  data () {
    return {
      carregando: false,
      infoLoading: '',
      listCarteira: [],
      listRecorrencia: [],
      listCategoria: [],
      formOld: {efetovado: true, valor: 0},
      desabilitaEfetivado: false,
      desabilitaValor: false,
      desabilitaCarteira: false
    }
  },
  validations: {
    form: {
      descricao: { required },
      valor: { required, minValue: minValue(1)},
      categoria: { required },
      carteira: { required },
      data: { required }
    },
    doc: '',
    carregando: false,
    infoLoading: ''
  },
  methods: {
    error (obj, isArray) {
      return obj != null && obj.$error
    },
    cancelar () {
      this.$router.push('/financeiro')
    },
    cadastrarOuAlterar () {
      var retorno = this.cadastrar()
      if (!retorno) {
        return 
      }
      var valor = this.form.valor /* - (!this.formOld.efetivado && this.form.efetivado ? this.formOld.valor : 0) */

      if (this.form.tipo === 'Despesa') {
        valor = -valor
      }

      if (!this.formOld.efetivado && this.form.efetivado) {
        retorno.then(() => {
          CarteiraService.findByDoc(this.form.carteira.doc).then(element => {
            element.doc = this.form.carteira.doc
            element.valor += valor
            CarteiraService.salvar(element)
          })
        })
      }
    },
    clearForm () {
      return {
        descricao: '',
        valor: 0,
        tipo: 'Ganho',
        data: moment().startOf('day').valueOf(),
        carteira: '',
        recorrencia: '',
        categoria: '',
        efetivado: true
      }
    },
    fetch () {
      var promises = []
      promises.push(this.getObjects(CarteiraService, 'listCarteira', 'object', 'descricao'))
      promises.push(this.getObjects(RecorrenciaService, 'listRecorrencia', 'object', 'descricao'))
      promises.push(this.getObjects(CategoriaService, 'listCategoria', 'object', 'descricao', 'icone', [{leftColor: 'orange'}]))
      if (this.$route.params.doc != null) {
        this.doc = this.$route.params.doc
        this.desabilitaEfetivado = this.form.efetivado
        this.desabilitaValor = this.form.efetivado
        this.desabilitaCarteira = this.form.efetivado
        this.formOld = this.convertObsToForm(this.form)        
      } else {
        this.$store.dispatch('movimento/setForm', this.clearForm())
      }
      Promise.all(promises).then((response) => {
        this.carregando = false
        this.listCategoria = response[2].sort((a, b) => {
          if (a.value.descricao < b.value.descricao)
            return -1
          if ( a.value.descricao > b.value.descricao)
            return 1
          return 0
        })
      })
    },
    inputReccorencia (obj) {
      if (this.form.doc == null && obj != null) {
        this.form.descricao = obj.descricao
        this.form.valor = obj.valor
        this.form.tipo = obj.tipo
      }
    },
    inputDate (obj) {
      this.form.data = moment(obj).startOf('day').valueOf()
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
  mounted () {
    this.carregando = true
    this.init([CarteiraService, RecorrenciaService, CategoriaService]).then(() => {
      this.fetch()
    })
    
  }
}
</script>
