<script setup lang="ts">
    import { onMounted, ref, provide } from 'vue';
    import { fetchTags } from '@utils/fetch';
    const tags = ref([{}]);
  
    onMounted(async () => {
      const response = await fetchTags();
      tags.value = response;
    });
  
  </script>

<template>
     <q-list bordered padding>
      <q-item v-for="tag in tags" :key="tag._id">
        <q-item-section>
          <q-item-label>{{ tag.name }}</q-item-label>
          <q-item-label caption lines="2">{{ tag.description }}</q-item-label>
        </q-item-section>
    </q-item>

    </q-list>
</template>