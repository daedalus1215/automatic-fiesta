<template>
  <div class="heatmap-container">
    <div class="heatmap">
      <div
        v-for="(day, index) in gridData"
        :key="index"
        class="heatmap-cell"
        :style="{ backgroundColor: getColor(day.time) }"
        @mouseenter="showTooltip(day, $event)"
        @mouseleave="hideTooltip"
      ></div>
    </div>
    <span class="tooltip">
      {{ tooltipData.date }}
      <ul>
        <li v-for="(title, idx) in tooltipData.titles" :key="idx">
          {{ title }}
        </li>
      </ul>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue';
  import { useYearlyActivityGrid } from './useYearlyActivityGrid';

  const activities = inject('yearlyActivities');

  const { gridData, tooltipData, showTooltip, hideTooltip, getColor } =
    useYearlyActivityGrid(activities);
</script>

<style>
  .heatmap-container {
    display: flex;
    width: 100%;
    height: 200px;
    position: relative;
  }

  .heatmap {
    display: grid;
    grid-template-columns: repeat(52, 1fr);
    grid-template-rows: repeat(7, 1fr);
    gap: 2px;
    width: 600px;
    overflow-x: scroll;
    margin: auto;
    position: relative;
  }

  .heatmap-cell {
    width: 10px;
    height: 10px;
    background-color: inherit;
  }

  .tooltip {
    background-color: #eee;
    color: #000;
    text-align: left;
    border-radius: 6px;
    padding: 5px;
    width: 260px;
    position: absolute;
    transition: visibility 0.1s;
    z-index: 1000;
    /* Ensure tooltip is above other elements */
  }
</style>
