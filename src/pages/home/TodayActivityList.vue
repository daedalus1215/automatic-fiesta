<script setup lang="ts">
import { ref, computed } from 'vue';
import displayMsInFractionalHourFormat from '../../utils/displayMsInFractionalHourFormat'

//@TODO: Make the requests
const aggregate = ref({
    activities: [
        {
            "taskId": "66765fd901cd5151c8e26b03",
            "title": "Exercise",
            "date": "2024-07-25T15:38:38.176Z",
            "totalTimeToday": 600000,
            "times": [
                {
                    "_id": "65133c088f49308f2e2a678b",
                    "date": "2023-09-26T20:16:08.633Z",
                    "time": 600000
                }
            ]
        },
        {
            "taskId": "66765fd901cd5151c8e26b77",
            "title": "Microservice patterns",
            "date": "2023-12-07T11:59:24.669Z",
            "totalTimeToday": 1680000,
            "times": [
                {
                    "_id": "651342b78f49308f2e2a67b1",
                    "date": "2023-09-26T20:44:39.709Z",
                    "time": 1680000
                }
            ]
        },
        {
            "taskId": "66765fd901cd5151c8e26bc9",
            "title": "General (DFS)",
            "date": "2024-03-20T18:38:40.372Z",
            "totalTimeToday": 2700000,
            "times": [
                {
                    "_id": "651392ab8f49308f2e2a67e3",
                    "date": "2023-09-27T02:25:47.169Z",
                    "time": 2700000
                }
            ]
        },
        {
            "taskId": "66765fd901cd5151c8e26c12",
            "title": "Effective Java (book)",
            "date": "2023-09-30T21:45:19.958Z",
            "totalTimeToday": 2280000,
            "times": [
                {
                    "_id": "6512d8718f49308f2e2a6710",
                    "date": "2023-09-26T13:11:13.802Z",
                    "time": 1440000
                },
                {
                    "_id": "6513264d8f49308f2e2a674f",
                    "date": "2023-09-26T18:43:25.155Z",
                    "time": 840000
                }
            ]
        },
        {
            "taskId": "66765fd901cd5151c8e2776b",
            "title": "React Timer",
            "date": "2024-07-07T22:03:47.518Z",
            "totalTimeToday": 960000,
            "times": [
                {
                    "_id": "65139bdc8f49308f2e2a680a",
                    "date": "2023-09-27T03:05:00.472Z",
                    "time": 960000
                }
            ]
        }
    ],
    "total": 8220000
});

const formattedTotal = computed(() => displayMsInFractionalHourFormat(aggregate.value.total));
</script>

<template>
    <div>Total: {{ formattedTotal }}</div>
    <!-- <div class="underline"></div> -->
    <q-list class="TodaysActivityList">
        <q-item v-for="activity in aggregate.activities" class="activity">
            {{ activity.title }} - {{ displayMsInFractionalHourFormat(activity.totalTimeToday) }}
        </q-item>
    </q-list>
    <!-- <div class="underline"></div> -->
</template>

<style scoped>
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
    background: linear-gradient(to bottom, #0F182E 5%, #0F182E 100%);
}

.activity:hover {
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.3);
    background: linear-gradient(to bottom, #0F182E 10%, #0F182E 70%);
    color: #bbb;
}

.underline {
    border-bottom: 1px solid #000;
    margin: 10px 0;
}
</style>