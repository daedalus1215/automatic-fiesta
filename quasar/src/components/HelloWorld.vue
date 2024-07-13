<template>
  <div class="q-pa-md" style="max-width: 600px">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="tasks" icon="notes" label="Tasks" />
        <q-tab name="tags" icon="loyalty" label="Tags" />
        <q-tab name="stats" icon="bar_chart" label="Stats" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="tasks" class="q-pa-none">
          <q-splitter v-model="splitterModel" style="height: 250px">
            <template v-slot:before>
              <q-tabs v-model="innerTab" vertical class="text-teal">
                <q-tab name="innerTasks" icon="mail" label="Tasks" />
                <q-tab name="innerAlarms" icon="loyalty" label="Tags" />
                <q-tab name="innerMovies" icon="movie" label="Movies" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel name="innerTasks">
                  <div class="text-h4 q-mb-md">Tasks</div>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quis praesentium cumque magnam odio iure quidem, quod illum
                    numquam possimus obcaecati commodi minima assumenda
                    consectetur culpa fuga nulla ullam. In, libero.
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quis praesentium cumque magnam odio iure quidem, quod illum
                    numquam possimus obcaecati commodi minima assumenda
                    consectetur culpa fuga nulla ullam. In, libero.
                  </p>
                </q-tab-panel>

                <q-tab-panel name="innerAlarms">
                  <div class="text-h4 q-mb-md">Alarms</div>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quis praesentium cumque magnam odio iure quidem, quod illum
                    numquam possimus obcaecati commodi minima assumenda
                    consectetur culpa fuga nulla ullam. In, libero.
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quis praesentium cumque magnam odio iure quidem, quod illum
                    numquam possimus obcaecati commodi minima assumenda
                    consectetur culpa fuga nulla ullam. In, libero.
                  </p>
                </q-tab-panel>

                <q-tab-panel name="innerMovies">
                  <div class="text-h4 q-mb-md">Movies</div>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quis praesentium cumque magnam odio iure quidem, quod illum
                    numquam possimus obcaecati commodi minima assumenda
                    consectetur culpa fuga nulla ullam. In, libero.
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quis praesentium cumque magnam odio iure quidem, quod illum
                    numquam possimus obcaecati commodi minima assumenda
                    consectetur culpa fuga nulla ullam. In, libero.
                  </p>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quis praesentium cumque magnam odio iure quidem, quod illum
                    numquam possimus obcaecati commodi minima assumenda
                    consectetur culpa fuga nulla ullam. In, libero.
                  </p>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-tab-panel>

        <q-tab-panel name="tags">
          <div class="text-h6">Tags</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="stats">
          <div class="text-h6">Stats</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      tab: ref('tasks'),
      innerTab: ref('innerTasks'),
      splitterModel: ref(20),
    }
  },
}
</script>
