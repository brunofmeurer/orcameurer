import GrupoService from '../../services/grupo-service.js'
export default {
  data () {
    return {
    }
  },
  methods: {
    seguranca () {
      return new Promise((resolve, reject) => {
        this.$auth.onAuthStateChanged((user) => {
          if (user) {
            console.log('Usuario autenticado: ', user.email)
            this.email = user.email
            this.$all.user = user
            resolve()
          }
          else {
            this.logout()
          }
        })
      })
    },
    logout () {
      this.$auth.signOut().then(() => {
        console.log('Usuario desconectado!')
      }, () => {
        console.log('erro ao desconectar usuario')
      })
      this.$router.push('/login')
    },
    init (services) {
      return this.seguranca().then(() => {
        GrupoService.set(this.$all)
        return GrupoService.getGrupo().then(element => {
          this.$grupo = element
          services.forEach(e => {
            e.set(this.$all)
          })
          return
        })
      })
    },
    verificaPrimeiroAcesso () {
      return this.seguranca().then(() => {
        GrupoService.set(this.$all)
        return GrupoService.getGrupo().then(element => {
          this.$grupo = element
          if (this.$grupo.length === 0) {
            GrupoService.primeiroAcesso()
          }
        })
      })
    }
  },
  mounted () {
    this.init([]).then(() => {})
  }
}
