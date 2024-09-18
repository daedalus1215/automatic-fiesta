<script setup lang="ts">
import { inject } from 'vue'
import { Task } from '../constants';

const drawerLeft = inject('drawerLeft')
const forwardToTask = inject<(id?: string) => void>('forwardToTask')
const tasks = inject<Task[]>('tasks')

const props = defineProps({
  query: String,
})
</script>

<template>
  <q-drawer v-model="drawerLeft" :width="200" bordered>
    <q-scroll-area class="fit">
      <q-input class="q-pa-xs q-ma-sm bg-white text-black outlined" placeholder="search" :value="query" type="search"
        @input="$emit('update:query', $event.target.value)">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <q-list>
        <q-item v-for="task in tasks" :key="task.id">
          <q-item-section>
            <q-item-label @click="forwardToTask(task.id)" v-ripple bordered
              class="my-box cursor-pointer q-hoverable bg-white text-black">{{
                task.title
              }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- <div class="q-pa-sm">
        <div v-for="task in tasks" :key="n" @click="forwardToTask(task.id)">
          {{ task.title }}
        </div>
      </div> -->
    </q-scroll-area>
  </q-drawer>
</template>

<style scoped></style>
