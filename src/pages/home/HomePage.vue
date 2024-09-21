<script setup lang="ts">
  import { onMounted, ref, provide } from 'vue';
  import TodayActivityList from '@pages/home/TodayActivityList.vue';
  import YearlyActivityGrid from '@pages/home/yearlyActivityGrid/YearlyActivityGrid.vue';
  import { fetchYearlyActivities } from '@utils/fetch';

  const yearlyActivities = ref([{}]);

  onMounted(async () => {
    const response = await fetchYearlyActivities();
    yearlyActivities.value = response;
  });

  provide('yearlyActivities', yearlyActivities);
</script>
<template>
  <h3>Homepage</h3>
  <TodayActivityList />
  <YearlyActivityGrid />
</template>
