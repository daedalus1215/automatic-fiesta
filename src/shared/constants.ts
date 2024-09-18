export const SIXTY = 60
export const THOUSAND = 1000


export type Task = {
    title: string,
    description: string,
    contractId: string,
    _id: string,
    id: string, //@todo: pick one of these
    tags: string[],
    time: []
  }
  
  export type Tag = {
    _id: string;
    description: string;
    name: string
  }
  
  export interface AggregateActivity {
    activities: TodaysActivity[],
    total: number;
  }
  
  export interface TodaysActivity {
    taskId: string;
    title: string;
    date: Date,
    totalTimeToday: number;
    times: any[]
  }
  
  export interface YearlyActivities {
    date:string;
    time: number;
    titles: string[]
  }