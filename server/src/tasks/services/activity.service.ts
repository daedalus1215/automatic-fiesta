import { Injectable } from "@nestjs/common";
import { FetchStatsForStackForRangeOfDates } from "../transacription-scripts/activities/fetch-stats-for-stack-for-range/fetch-stats-for-stack-for-range-dates.transcription-scripts";
import { FetchAllMonthTasks } from "../transacription-scripts/activities/fetch-all-month-tasks/fetch-all-month-tasks.transcription-script";

@Injectable()
export class ActivityService {
    constructor(
        private readonly fetchStatsForStackForRangeOfDates: FetchStatsForStackForRangeOfDates,
        private readonly fetchAllMonthTasks: FetchAllMonthTasks,
    ) { }

    // @TODO: Bring this back after we migrate to class utils
    async fetchStats(date: Date, days: number, predicates: { includeTags?: string, excludeTags?: string }) {
        return this.fetchStatsForStackForRangeOfDates.apply(date, days, predicates)
    }

    //@TODO: Unit test this
    fetchTasksForAllMonths(includeTags?: string[], excludeTags?: string[]) {
        return this.fetchAllMonthTasks.apply(includeTags, excludeTags);
    };
}