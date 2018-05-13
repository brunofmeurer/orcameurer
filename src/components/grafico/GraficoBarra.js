import { HorizontalBar, mixins } from 'vue-chartjs'
export default {
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: ['title'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  data () {
    return {
      options: {
        title: {
          display: true,
          text: this.title
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          labels: {
            defaultFontFamily: '"Roboto", "-apple-system", "Helvetica Neue", Helvetica, Arial, sans-serif'
          }
        },
        responsive: true
      }
    }
  },
  methods: {
    atualizar () {
      // GET INSTANCE OF CHART
      this.$data._chart.update()
    }
  }
}
