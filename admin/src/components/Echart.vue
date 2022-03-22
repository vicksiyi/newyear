<template>
  <div :style="{ height: `${height}px` }" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Echart",
  props: {
    height: {
      type: Number,
      default: 220,
    },
    isItemType: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
      default: false,
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          lData: [],
          series: {},
        };
      },
    },
  },
  data() {
    return {
      itemTypeOption: {
        xAxis: {
          data: [],
        },
        yAxis: {},
        legend: {
          data: [],
        },
        series: [],
      },
      userOption: {
        legend: {
          // 图例颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [],
      },
      videoOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3eb1cf",
        ],
        series: [],
      },
      echart: null,
    };
  },
  watch: {
    chartData: {
      handler: function () {
        this.$nextTick(() => {
          this.initChart();
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.chart);  // 初始化
        this.echart.setOption(this.options); // 传入配置
      }
    },
    initChartData: function () {
      if (this.isItemType) {
        this.itemTypeOption.xAxis.data = this.chartData.xData;
        this.itemTypeOption.legend.data = this.chartData.lData;
        this.itemTypeOption.series = this.chartData.series;
      }
      if (this.isUser) {
        this.userOption.xAxis.data = this.chartData.xData;
        this.userOption.series = this.chartData.series;
      }
      if (this.isVideo) {
        this.videoOption.series = this.chartData.series;
      }
    },
  },
  computed: {
    options() {
      if (this.isItemType) return this.itemTypeOption;
      console.log(this.userOption);
      if (this.isUser) return this.userOption;
      if (this.isVideo) return this.videoOption;
    },
  },
};
</script>


<style scoped>
</style>
