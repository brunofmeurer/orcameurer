import AdminService from '../../services/admin-service.js'
export default {
  data () {
    return {
      administrador: false
    }
  },
  methods: {
    /* verificaLogin () {
      this.$auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('Usuario autenticado: ', user.email)
          this.email = user.email
          this.$all.user = user
          AdminService.getAdminsByIsAdmin(true).then((e) => {
            this.administrador = e.length > 0
          }, () => {
            this.administrador = false
          })
        }
      })
      this.$router.push('/inicio')
    }, */
    seguranca () {
      this.$auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('Usuario autenticado: ', user.email)
          this.email = user.email
          this.$all.user = user
          AdminService.getAdminsByIsAdmin(true).then((e) => {
            this.administrador = e.length > 0
          }, () => {
            this.administrador = false
          })
        }
        else {
          this.logout()
        }
      })
    },
    logout () {
      this.$auth.signOut().then(() => {
        console.log('Usuario desconectado!')
      }, () => {
        console.log('erro ao desconectar usuario')
      })
      this.$router.push('/login')
    }
  },
  mounted () {
    AdminService.set(this.$all)
    this.seguranca()
  }
}
