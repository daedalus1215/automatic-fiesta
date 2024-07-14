<script setup>
import { inject } from 'vue'

const drawerLeft = inject('drawerLeft')
const forwardToTask = inject('forwardToTask')
const tasks = inject('tasks')
</script>

<template>
  <q-drawer
    v-model="drawerLeft"
    :width="200"
    :breakpoint="700"
    bordered
    :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'"
  >
    <q-scroll-area class="fit">
      <q-list bordered>
        <q-item v-for="task in tasks" :key="task.id">
          <q-item-section>
            <q-item-label @click="forwardToTask(task.id)">{{
              task.title
            }}</q-item-label>
            <!-- <q-item-label caption lines="1">{{ contact.email }}</q-item-label> -->
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
