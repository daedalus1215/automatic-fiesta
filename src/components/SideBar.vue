<script setup lang="ts">
import { inject } from 'vue'

const drawerLeft = inject('drawerLeft')
const forwardToTask = inject('forwardToTask')
const tasks = inject('tasks')

const props = defineProps({
  query: String,
})
</script>

<template>
  <q-drawer
    v-model="drawerLeft"
    :width="200"
    bordered
    :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"
  >
    <q-scroll-area class="fit">
      <input
        placeholder="test"
        :value="query"
        @input="$emit('update:query', $event.target.value)"
      />
      <q-list>
        <q-item v-for="task in tasks" :key="task.id">
          <q-item-section>
            <q-item-label @click="forwardToTask(task.id)" v-ripple bordered class="my-box cursor-pointer q-hoverable">{{
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
