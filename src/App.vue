<script setup lang="ts">
import { useApp } from './useApp';
import SideBar from '@components/side-bar/SideBar.vue';
const { tasks, query, drawerLeft, forwardToTask, homeOnClick, downloadOnClick } = useApp();
</script>

<template>
  <div class="q-pa-md">
    <q-layout
      view="lhh LpR lFf"
      container
      style="height: 96vh"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-header reveal :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn
            flat
            @click="drawerLeft = !drawerLeft"
            round
            dense
            icon="menu"
          />
          <q-toolbar-title>
            <q-btn square color="primary" icon="home" @click="homeOnClick" />
            <q-btn
              square
              color="secondary"
              icon="file_download"
              @click="downloadOnClick"
            />
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <SideBar
        v-model:query="query"
        v-model:drawerLeft="drawerLeft"
        :tasks="tasks"
        @forwardToTask="forwardToTask"
      />

      <q-page-container>
        <router-view></router-view>
      </q-page-container>
    </q-layout>
  </div>
</template>