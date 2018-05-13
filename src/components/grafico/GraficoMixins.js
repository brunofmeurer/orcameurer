import moment from 'moment'
import GraficoLinha from './GraficoLinha'
import GraficoBarra from './GraficoBarra'
import GraficoPizza from './GraficoPizza'
import CarteiraService from '../../services/carteira-service.js'
import MovimentoService from '../../services/movimento-service.js'
import Seguranca from '../seguranca/Seguranca.js'
export default {
  mixins: [Seguranca],
  components: {
    GraficoLinha,
    GraficoBarra,
    GraficoPizza
  },
  data () {
    return {
      listBar: {
        labels: [],
        datasets: [
          {
            label: 'Valor',
            backgroundColor: ['rgba(255, 152, 0, 0.2)', 'rgba(66, 66, 66, 0.2)'],
            borderColor: ['rgba(255, 152, 0, 0.5)', 'rgba(66, 66, 66, 0.5)'],
            borderWidth: 5,
            data: []
          }
        ]
      },
      listLine: {
        labels: [],
        datasets: [
          {
            doc: '',
            label: ['Resumo'],
            backgroundColor: 'rgba(255, 152, 0, 0.2)',
            borderColor: 'rgba(255, 152, 0, 0.5)',
            data: [],
            pointRadius: 5,
            pointHoverRadius: 10,
            borderWidth: 3
          }
          ,
          {
            label: ['Em aberto'],
            backgroundColor: 'rgba(66, 66, 66, 0.2)',
            borderColor: 'rgba(66, 66, 66, 0.5)',
            data: [],
            pointRadius: 5,
            pointHoverRadius: 10,
            borderWidth: 3
          }
        ],
        scaleOverride: true,
        scaleStartValue: 0
      },
      listPie: {
        labels: [],
        datasets: [
          {
            label: '<i>Valor',
            backgroundColor: ['rgba(255, 152, 0, 0.2)', 'rgba(66, 66, 66, 0.2)'],
            borderColor: ['rgba(255, 152, 0, 0.5)', 'rgba(66, 66, 66, 0.5)'],
            borderWidth: 3,
            data: []
          }
        ]
      }
    }
  },
  methods: {
    fetchGraficos () {
      CarteiraService.listar().then(elements => {
        elements.forEach((element, index) => {
          this.listBar.labels.push(element.descricao)
          this.listBar.datasets[0].data.push(element.valor)
          this.listBar.datasets[0].backgroundColor.push(this.getColorBackground(index))
          this.listBar.datasets[0].borderColor.push(this.getColorBorder(index))
          this.$refs.graficoBarra.atualizar()
        })
      })

      var filtro = {dataInicio: this.getFirstDay(), dataFim: this.getLastDay()}

      MovimentoService.getByData(filtro).then(elements => {
        elements = elements.reverse()
        this.criaLine(elements)
        this.criaPizza(elements)
      })
    },
    criaPizza (elements) {
      elements.filter(e => e.efetivado && e.tipo != 'Ganho').sort((a, b)=> b.valor - a.valor).forEach(element => {
        var id = -1
        var label = element.categoria.descricao

        this.listPie.labels.forEach((element, index) => {
          if (element === label) {
            id = index
            return
          }
        })
        
        if (id < 0 && this.listPie.labels.length < 6) {
          this.listPie.labels.push(label)
          this.listPie.datasets[0].data.push(element.valor)
          id = this.listPie.datasets[0].data.length - 1
          this.listPie.datasets[0].backgroundColor.push(this.getColorBackground(id))
          this.listPie.datasets[0].borderColor.push(this.getColorBorder(id))
        } else {
          if (id <= 6) {
            this.listPie.datasets[0].data[id] += element.valor
          }
        }
      })
      this.$refs.graficoPizza.atualizar()
    },
    criaLine (elements) {
      // cria labels
      elements.forEach(element => {
        var id = -1
        var label = moment(element.data).format('DD/MM')
        this.listLine.labels.forEach((element, index) => {
          if (element === label) {
            id = index
            return
          }
        })

        if (id < 0) {
          this.listLine.labels.push(label)
        }
      })

      for (var i=0;i<this.listLine.labels.length;i++) {
        this.listLine.datasets[0].data.push(0)
        this.listLine.datasets[1].data.push(0)
      }

      elements.filter(e => e.efetivado).forEach(element => {
        var id = -1
        var label = moment(element.data).format('DD/MM')
        this.listLine.labels.forEach((element, index) => {
          if (element === label) {
            id = index
            return
          }
        })
        this.listLine.datasets[0].data[id] += element.tipo === 'Ganho' ? element.valor : -element.valor          
        this.$refs.graficoLinha.atualizar()
      })

      elements.filter(e => !e.efetivado).forEach(element => {
        var id = -1
        var label = moment(element.data).format('DD/MM')
        this.listLine.labels.forEach((element, index) => {
          if (element === label) {
            id = index
            return
          }
        })
        this.listLine.datasets[1].data[id] += element.tipo === 'Ganho' ? element.valor : -element.valor          
        this.$refs.graficoLinha.atualizar()
      })
      // fim lines
    },
    getColorBackground (index) {
      return index % 2 === 0 ? 'rgba(255, 152, 0, 0.2)' : 'rgba(66, 66, 66, 0.2)'
    },
    getColorBorder (index) {
      return index % 2 === 0 ? 'rgba(255, 152, 0, 0.5)' : 'rgba(66, 66, 66, 0.5)'
    },
    getFirstDay () {
      return moment().add(-30, 'days').valueOf()
    },
    getLastDay () {
      return moment().add(30, 'days').valueOf()
    }
  },
  created () {
    this.init([CarteiraService, MovimentoService]).then(() => {
      this.fetchGraficos()
    })
  }
}
