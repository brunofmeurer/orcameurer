<template>
  <q-page padding class="q-pt-sm bg-grey-1">
    <blockquote class="text-right round-borders text-italic" style="border-color: #FF9800">
      <p>{{mensagem}}</p>
      <small><cite>{{autor}}</cite></small>
    </blockquote>
    <hr>
  </q-page>
</template>

<style lang="stylus">
</style>

<script>
import json from '../json/mensagens.json'
export default {
  name: 'home',
  data () {
    return {
      mensagens: json.mensagens
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
    }
  }
}
</script>
