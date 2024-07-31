import { ref, computed } from 'vue';

export const useYearlyActivityGrid = (activities: any) => {
    type YearlyActivity = {
        date: string;
        time: number;
        titles: string[];
    }

    type TooltipDataType = { titles: string[], date: string };

    const tooltipData = ref<YearlyActivity>({ titles: [''], date: '', time: 0 });


    const getColor = (time: number) => {
        if (time > 20000000) return '#ff4500';
        if (time > 10000000) return '#ffa500';
        if (time > 5000000) return '#ffd700';
        return '#90ee90';
    };

    const showTooltip = (day: TooltipDataType) => {
        tooltipData.value.date = day.date;
        tooltipData.value.titles = day.titles;
    };

    const hideTooltip = () => {
        tooltipData.value.date = '';
        tooltipData.value.titles = [''];
    };

    const gridData = computed(() => {
        const grid = Array.from({ length: 7 * 52 }, () => ({
          date: '',
          time: 0,
          titles: [''],
        }));
  
        activities.value.forEach((activity:YearlyActivity, index:number) => {
          grid[index] = activity;
        });
  
        return grid;
      });

    return {
        gridData,
        tooltipData,
        showTooltip,
        hideTooltip,
        getColor
    };
}
