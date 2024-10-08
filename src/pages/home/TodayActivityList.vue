<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import displayMsInFractionalHourFormat from '@utils/displayMsInFractionalHourFormat';
  import axios from 'axios';
  import { fetchTags } from '../../shared/utils/fetch';
  import MultiSelectInput from '../../shared/components/multi-select-input/MultiSelectInput.vue';

  const aggregate = ref({ activities: [], total: 0 });
  const error = ref(null);
  const formData = ref({
    includeTags:[''],
    excludeTags:[''],
  });
  const options = ref([]);

  const fetchTodaysActivities = async () => {
    const date = new Date().toLocaleDateString('en-US').split('/');
    try {
      const response = await axios.get(
        `http://localhost:3000/activities/today?date=${date[0]}-${date[1]}-${date[2]}`,
      );
      const data = response.data;
      aggregate.value.activities = data.activities;
      aggregate.value.total = data.activities.reduce(
        (acc, current) => acc + current.totalTimeToday,
        0,
      );
    } catch (error) {
      error.value = error.message;
    }
  };
  fetchTodaysActivities();

  const formattedTotal = computed(() =>
    displayMsInFractionalHourFormat(aggregate.value.total),
  );

  onMounted(async () => {
        const tags = await fetchTags();
        options.value = tags.map(tag => tag.name) || [];
    })


</script>

<template>
  
    <MultiSelectInput v-model="formData.includeTags" :options="options" icon="bookmark" label="Include Tags"/>
    <MultiSelectInput v-model="formData.excludeTags" :options="options" icon="bookmark_border" label="Exclude Tags"/>
  
  <div>Total: {{ formattedTotal }}</div>
  <q-list class="TodaysActivityList">
    <q-item
      v-for="activity in aggregate.activities"
      v-bind:key="activity.taskId"
      class="activity"
    >
      {{ activity.title }} -
      {{ displayMsInFractionalHourFormat(activity.totalTimeToday) }}
    </q-item>
  </q-list>

  <!-- Error message if API call fails -->
  <div v-if="error">{{ error }}</div>
</template>

<style scoped>
  .filters {
    display: flex;
    /* justify-content: space-between; */
    margin: 10px;
    max-width: 800px;     
  }
  .TodaysActivityList {
    margin: 10px;
    max-height: 300px;
    overflow: scroll;
  }

  .activity {
    cursor: pointer;
    color: #ddd;
    margin: 10px;
    padding: 10px;
    background: linear-gradient(to bottom, #0f182e 5%, #0f182e 100%);
  }

  .activity:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom, #0f182e 10%, #0f182e 70%);
    color: #bbb;
  }

  .underline {
    border-bottom: 1px solid #000;
    margin: 10px 0;
  }
</style>
