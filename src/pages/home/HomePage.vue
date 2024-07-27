<template>
    <div>
      <apexchart
        type="heatmap"
        :options="chartOptions"
        :series="series"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  
  export default defineComponent({
    components: {
      apexchart: VueApexCharts,
    },
    setup() {
      const chartOptions = {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: true,
            colorScale: {
              ranges: [
                { from: 0, to: 10, color: '#00A100' },
                { from: 11, to: 20, color: '#128FD9' },
                { from: 21, to: 30, color: '#FFB200' },
                { from: 31, to: 40, color: '#FF0000' },
              ],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: 'category',
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        },
      };
  
      const series = [
        {
          name: 'Week 1',
          data: [10, 20, 30, 40, 50, 60, 70],
        },
        {
          name: 'Week 2',
          data: [15, 25, 35, 45, 55, 65, 75],
        },
      ];
  
      return {
        chartOptions,
        series,
      };
    },
  });
  </script>
  