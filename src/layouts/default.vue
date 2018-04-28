<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="dark">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          color="orange">
          <q-icon name="menu"/>
        </q-btn>
        <q-toolbar-title>
          Orçameurer
        </q-toolbar-title>
        <q-btn flat round dense icon="more_vert" color="orange">
          <q-popover>
            <q-list link style="min-width: 100px">
              <q-item @click.native="logout()">
                <q-item-main label="Sair"/>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list
        no-border
        link
        inset-delimiter>
        <q-list-header>Menu</q-list-header>
        <q-item link to="/">
          <q-item-side icon="home" color="orange" />
          <q-item-main label="Inicio" sublabel="Resumos" />
        </q-item>
        <q-item link to="/financeiro">
          <q-item-side icon="trending_up" color="orange"/>
          <q-item-main label="Financeiro" sublabel="Movimentações e lançamentos" />
        </q-item>
        <q-item link to="/planejamento">
          <q-item-side icon="assessment" color="orange"/>
          <q-item-main label="Planejamento" sublabel="Criação de planejamento" />
        </q-item>
        <q-item link to="/categoria">
          <q-item-side icon="label" color="orange"/>
          <q-item-main label="Categorias" sublabel="Manutenção de categorias" />
        </q-item>
        <q-item link to="/carteira">
          <q-item-side icon="credit_card" color="orange"/>
          <q-item-main label="Carteiras" sublabel="Manutenção de carteiras e fundos" />
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import AdminService from '../services/admin-service.js'
import Seguranca from '../components/seguranca/Seguranca.js'
export default {
  name: 'LayoutDefault',
  mixins: [Seguranca],
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  },
  mounted () {
    AdminService.set(this.$all)
  }
}
</script>

<style>
</style>
