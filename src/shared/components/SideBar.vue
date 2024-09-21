
<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  query: String,
  tasks: Array,
  drawerLeft: Boolean,
});

const emit = defineEmits(['update:query', 'update:drawerLeft', 'forwardToTask']);

// Local states for reactivity
const localQuery = ref(props.query);
const localDrawerLeft = ref(props.drawerLeft);

// Emit changes to the drawer state
watch(() => props.drawerLeft, (newVal) => {
  localDrawerLeft.value = newVal;
});

watch(localDrawerLeft, (newVal) => {
  emit('update:drawerLeft', newVal);
});

// Emit query updates
watch(localQuery, (newVal) => {
  emit('update:query', newVal);
});

// Sync localQuery with the prop query
watch(() => props.query, (newVal) => {
  localQuery.value = newVal;
});
</script>

<template>
  <q-drawer v-model="localDrawerLeft" :width="200" bordered>
    <q-scroll-area class="fit">
      <q-input
        class="q-pa-xs q-ma-sm bg-white text-black outlined"
        placeholder="Search"
        type="search"
        v-model="localQuery"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-list>
        <q-item v-for="task in tasks" :key="task.id">
          <q-item-section>
            <q-item-label
              @click="forwardToTask(task.id)"
              v-ripple
              bordered
              class="my-box cursor-pointer q-hoverable bg-white text-black"
            >
              {{ task.title }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>
