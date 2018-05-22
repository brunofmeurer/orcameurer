<template>
  <q-page padding class="q-pt-sm bg-grey-1">
    <q-breadcrumbs separator=">" active-color="orange" color="orange">
      <q-breadcrumbs-el icon="home" label="Inicio" to="/" />
      <q-breadcrumbs-el icon="trending_up" label="Financeiro" to="/financeiro" />
      <q-breadcrumbs-el icon="add" label="Adicionar" to="/financeiro-grupo/add-grupo" v-if="$route.params.doc == null" />
      <q-breadcrumbs-el icon="edit" label="Editar" to="/financeiro/edit-grupo" v-else/>
    </q-breadcrumbs>
    <q-card  class="bigger square q-pa-sm q-mt-sm">
      <q-card-main>
        <q-select class="q-pt-sm" v-model="form.recorrencia" color="orange" float-label="Recorrência" clearable
          :options="listRecorrencia" @input="inputReccorencia(form.recorrencia)"/>
        <q-input class="q-pt-sm" v-model="form.descricao" color="orange" float-label="Descrição" type='text'
        :error="error($v.form.descricao)"/>
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
        
        <q-alert
        key="negative"
        icon="warning"
        type="negative"
        class="q-mb-sm q-mt-md"
        v-if="$v.grupo.$error && grupo.length === 0"
      >
        Pelo menos 1 item deve ser inserido!
      </q-alert>
        <div class="bg-grey-1 q-pa-xs q-mt-sm shadow-2">
          <q-btn color="orange" @click="addItem()" icon="add" size="sm"/>
          <div class="bg-grey-1 q-pa-xs q-mt-sm shadow-2" v-for="(item, index) in grupo" :key="index">
            Item {{index + 1}}
            <q-input class="q-pt-sm" v-model="item.descricao" color="orange" float-label="Descrição" type='text'
            :error="error($v.grupo.$each[index].descricao)"/>
            <q-input class="q-pt-sm" v-model="item.valor" color="orange" float-label="Valor" type='number' prefix="R$"
            :error="error($v.grupo.$each[index].valor)"/>
            <q-radio class="q-pt-sm" v-model="item.tipo" val="Despesa" label="Despesa" color="orange"/>
            <q-radio class="q-pt-sm" v-model="item.tipo" val="Ganho" label="Ganho" color="orange"/>
            <!--<q-select class="q-pt-sm" v-model="item.categoria" color="orange" float-label="Categoria"  clearable
              :options="listCategoria"
              ref="listCat"
              :error="error($v.grupo.$each[index].categoria)"/>-->
              <div class="col-12" align="right">
                <q-btn class="q-mt-sm" color="dark" @click="removeItem(index)" icon="clear" size="sm"/>
              </div>
          </div>
        </div>
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
import { required, minValue, minLength } from 'vuelidate/lib/validators'
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
      grupo: [],
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
    grupo: {
      required,
      minLength: minLength(1),
      $each: {
        valor: { required, minValue: minValue(1)},
        descricao: { required }
      }
    }
  },
  methods: {
    error (obj, isArray) {
      return obj != null && obj.$error
    },
    cancelar () {
      this.$router.push('/financeiro')
    },
    iniciarGrupos () {
      this.grupo = []
      for(var field in this.form.grupo) {
        this.grupo.push(this.form.grupo[field])
      }
    },
    montarGrupos () {
      this.form.grupo = {}
      this.form.valor = 0
      this.grupo.forEach((element, index) => {
        this.form.grupo['item' + index] = element
        if (element.tipo === 'Despesa') {
          this.form.valor -= element.valor
        } else {
          this.form.valor += element.valor
        }
      })
      if (this.form.valor > 0) {
        this.form.tipo = 'Ganho'
      } else {
        this.form.tipo = 'Despesa'
        this.form.valor = this.form.valor * -1
      }
    },
    cadastrarOuAlterar () {
      this.$v.$touch()
      this.montarGrupos()
      // this.$store.dispatch('movimento/setForm', this.form)
      console.log(this.form)
      var retorno = this.cadastrar()
      if (!retorno) {
        return 
      }
      var valor = this.form.valor

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
        data: moment().startOf('day').valueOf(),
        carteira: '',
        recorrencia: '',
        categoria: '',
        efetivado: false,
        valor: 0
      }
    },
    addItem () {
      this.grupo.push({valor: 0, tipo: 'Despesa', categoria: '', descricao: ''})
    },
    removeItem (index) {
      this.grupo.splice(index, 1)
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
        this.iniciarGrupos()
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
