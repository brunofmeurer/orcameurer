import { Line, mixins } from 'vue-chartjs'
export default {
  extends: Line,
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
