import { Controller, Get, Query } from "@nestjs/common";
import { ActivityService } from "../../services/activity.service";

@Controller('activities')
export class ActivityController {
    constructor(private activityService: ActivityService) { }

    @Get('/stack-graph')
    async statsForRangeOfDates(@Query('date') date?: Date, @Query('days') days?: number, @Query('predicates') predicates?: { includeTags?: string, excludeTags?: string }) {
        return await this.activityService.fetchStats(date, days, predicates);
    }

    @Get('/months')
    async fetchAllMonthTasks(@Query('includeTags') includeTags: string[], @Query(' excludeTags') excludeTags: string[]) {
        return await this.activityService.fetchTasksForAllMonths(includeTags, excludeTags);
    }

    @Get('/months/today')
    async getTodaysActivityAction() {
        // @TODO: fill me in
    }

    @Get('/months/all')
    async getAllDayTasksAction() {
        // @TODO: fill me in
    }
}