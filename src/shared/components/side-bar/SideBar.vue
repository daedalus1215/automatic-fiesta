<script setup lang="ts">
  import { ref, watch, defineProps, defineEmits, PropType } from 'vue';

  const forwardToTask = (taskId: string) => {
    emit('forwardToTask', taskId);
  };

  type Task = {
    id: string;
    title: string;
  };

  const props = defineProps({
    query: String,
    tasks: Array as PropType<Task[]>,
    drawerLeft: Boolean,
  });

  const emit = defineEmits([
    'update:query',
    'update:drawerLeft',
    'forwardToTask',
  ]);

  const localQuery = ref(props.query);
  const localDrawerLeft = ref(props.drawerLeft);

  watch(
    () => props.drawerLeft,
    (newVal) => {
      localDrawerLeft.value = newVal;
    },
  );

  watch(localDrawerLeft, (newVal) => {
    emit('update:drawerLeft', newVal);
  });

  watch(localQuery, (newVal) => {
    emit('update:query', newVal);
  });

  watch(
    () => props.query,
    (newVal) => {
      localQuery.value = newVal;
    },
  );
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
