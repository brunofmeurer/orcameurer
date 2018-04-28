<template>
  <div>
    <q-card  class="bigger square q-pa-sm q-mt-sm">
      <q-collapsible icon="chrome_reader_mode" label="Formulário" :opened="false" ref="collaps">
        <q-card-main>
          <!--<slot></slot>-->
          <div v-for="(obj, index) in columns" v-bind:key="index">
            <slot :name="'field-' + obj.name" :data="obj" :form="form">
              <q-input v-model="form[obj.field]" color="orange" :float-label="obj.label" :type='obj.type' :prefix="obj.prefix"/>
            </slot>
          </div>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
          <q-btn label="Confirmar" color="orange" @click="cadastrar" size="sm"/>
          <q-btn label="Cancelar" color="dark" @click="cancelar()" size="sm"/>
          <q-btn label="Limpar" color="dark" @click="clearForm()" size="sm"/>
        </q-card-actions>
      </q-collapsible>
    </q-card>
    <q-table class="q-mb-sm margem"
      :title="title"
      :data="list"
      :columns="columns"
      :loading="this.carregandoLista"
      selection="single"
      :selected.sync="selected"
      color="dark"
      dense hide-bottom>
      <q-tr slot="header" slot-scope="props">
        <q-th auto-width>
          <q-checkbox
            v-if="props.multipleSelect"
            v-model="props.selected"
            indeterminate-value="some"
          />
        </q-th>
        <q-th v-for="col in props.cols" :key="col.name" :props="props" v-show="!col.hide">
          {{ col.label }}
        </q-th>
      </q-tr>
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td auto-width>
          <q-checkbox color="dark" v-model="props.selected" />
        </q-td>
        <q-td v-for="col in props.cols" :key="col.name" :props="props" v-show="!col.hide">
          <slot :name="'coll-' + col.name" :row="props.row">
            {{ col.value }}
          </slot>
        </q-td>
      </q-tr>
    </q-table>
    <q-btn label="Adicionar" color="orange" @click="adicionar()" size="sm"/>
    <q-btn label="Alterar" color="dark" @click="alterar()" size="sm"/>
    <q-btn label="Excluir" color="dark" @click="excluir()" size="sm"/>
    <q-inner-loading :visible="carregando">
      <q-spinner-gears size="50px" color="dark"></q-spinner-gears>
      {{infoLoading}}
    </q-inner-loading>
  </div>
</template>

<script>
import CrudMixins from './CrudMixins.js'
export default {
  props: ['columns', 'service', 'title'],
  mixins: [CrudMixins],
  data () {
    return {
      form: {},
      carregando: false,
      infoLoading: '',
      carregandoLista: false,
      list: [],
      selected: []
    }
  },
  methods: {
    adicionar () {
      this.clearForm()
      this.showForm()
    },
    alterar () {
      if (this.selected.length > 0) {
        this.form = this.convertObsToForm(this.selected[0])
        this.showForm()
      }
    },
    editar (param) {
      this.form = param
    },
    cancelar () {
      this.hideForm()
      this.clearForm()
    },
    clearForm () {
      for(var key in this.form) {
        this.form[key] = null
      }
    },
    convertObsToForm (obs) {
      var retorno = {}
      for(var key in obs) {
        retorno[key] = obs[key]
      }
      return retorno
    },
    hideForm () {
      this.$refs.collaps.hide()
    },
    showForm () {
      this.$refs.collaps.show()
    }
  }
}
</script>

<style>

</style>
