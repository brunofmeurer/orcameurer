<template>
  <q-layout padding class="q-pt-sm bg-grey-1">
    <q-card  class="bigger fixed-center square " color="dark" style="width: 500px; max-width: 90vw; ">
      <q-card-title align="center" class="text-orange">
        OrçaMeurer - app
      </q-card-title>
      <q-card-main>
        <q-input ref='usuario' v-model="usuario" float-label="Usuario" @keyup.enter="login()" color="orange" class="text-orange" />
        <q-input class="q-mt-md" ref='senha' type="password" v-model="senha" float-label="Senha" color="orange" @keyup.enter="login()"/>
      </q-card-main>
      <q-card-separator />
      <q-card-actions vertical>
        <q-btn :loading="loadButtonLogin" color="orange" @click="login" class="full-width">
          Entrar
        </q-btn>
        <q-btn ref='btnIn' :loading="loadButtonEsqueciMinhaSenha" color="orange" @click="esqueciMinhasenha" class="full-width" flat >
          Esqueci minha senha
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-layout>
</template>
<script>
import UsuarioService from '../services/usuario-service.js'
import Seguranca from '../components/seguranca/Seguranca.js'
import Notificacao from '../components/notificacao/Notificacao.js'
export default {
  mixins: [Seguranca, Notificacao],
  data () {
    return {
      loadButtonLogin: false,
      loadButtonEsqueciMinhaSenha: false,
      usuario: '',
      senha: ''
    }
  },
  methods: {
    login () {
      this.loadButtonLogin = true
      this.$auth.signInWithEmailAndPassword(
        this.usuario, this.senha
      ).then(element => {
        this.direciona()
      }).catch(er => {
        this.notify('Usuário ou senha invalido[s]', false)
        this.loadButtonLogin = false
      })
    },
    direciona () {
      this.$router.push('/')
    },
    esqueciMinhasenha (event) {
      this.loadButtonEsqueciMinhaSenha = true
      this.$auth.sendPasswordResetEmail(this.usuario).then(() => {
        this.notify('E-mail de redefinição de senha enviado com sucesso!', true)
        this.loadButtonEsqueciMinhaSenha = false
      }).catch((error) => {
        this.notify('E-mail invalido', false)
        this.loadButtonEsqueciMinhaSenha = false
      })
    },
    resetUsuario () {
      return {
        id: 0,
        nome: '',
        uid: '',
        email: ''
      }
    }
  },
  mounted () {
    UsuarioService.set(this.$all)
    this.$refs.usuario.focus()
    this.$refs.senha.focus()
  }
}
</script>
<style>
</style>
