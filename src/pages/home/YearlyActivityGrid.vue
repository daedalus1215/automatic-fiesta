<template>
    <div class="heatmap-container">
        <div class="heatmap">
            <div v-for="(day, index) in gridData" :key="index" class="heatmap-cell"
                :style="{ backgroundColor: getColor(day.time) }" @mouseenter="showTooltip(day)">
            </div>
        </div>
        <span class="tooltip">
            {{ day.date }}
            <ul>
                <li v-for="(title, idx) in day.titles" :key="idx">{{ title }}</li>
            </ul>
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activities: [],
            day: {
                titles: [''],
                date: ''
            },
            tooltipStyles: {
                visibility: 'hidden',
                left: '610px', // Position outside the grid
                top: '0px'
            }
        };
    },
    computed: {

        gridData() {
            // Sort the activities by date in ascending order
            const sortedActivities = this.activities.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );

            // Initialize a 7x52 grid with empty objects
            const grid = Array.from({ length: 7 * 52 }, () => ({
                date: null,
                time: 0,
                titles: []
            }));

            // Populate the grid from top left to bottom right
            sortedActivities.forEach((activity, index) => {
                grid[index] = activity;
            });

            return grid;
        }
    },
    methods: {
        getColor(time) {
            if (time > 20000000) return "#ff4500"; // Example color mapping
            if (time > 10000000) return "#ffa500";
            if (time > 5000000) return "#ffd700";
            return "#90ee90";
        },
        showTooltip(day) {
            this.day.date = day.date
            this.day.titles = day.titles
            // this.tooltipContent = `${day.date} - ${day.titles.join(', ')}`;
            // this.tooltipStyles.visibility = 'visible';
        },
        hideTooltip() {
            this.tooltipStyles.visibility = 'hidden';
        }
    }
};
</script>

<style>
.heatmap-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;
}

.heatmap {
    display: grid;
    grid-template-columns: repeat(52, 1fr);
    grid-template-rows: repeat(7, 1fr);
    gap: 2px;
    width: 600px;
    overflow-x: scroll;
    margin: auto;
    position: relative;
}

.heatmap-cell {
    width: 10px;
    height: 10px;
    background-color: inherit;
    position: relative;
}

.tooltip {
    background-color: #eee;
    color: #000;
    text-align: left;
    border-radius: 6px;
    padding: 5px;
    width: 200px;
    height: 400px;
    width: 400px;
    /* transition: opacity 0.3s; */
}
</style>
