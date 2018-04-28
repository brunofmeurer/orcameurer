<template>
  <div>
    <div class="row justify-center" style="margin-bottom: 50px;">
      <q-spinner-gears slot="message" :size="40" color="dark" v-show="carregando"></q-spinner-gears>
      <p v-show="paginacao.total > 0">{{paginacao.total}} Registro(s)</p>
      <!--<q-spinner-dots slot="message"  />-->
    </div>
  </div>
</template>

<script>
export default {
  props: ['paginacao', 'carregando']
}
</script>
<style>

</style>
