export type Task = {
  title: string,
  description: string,
  contractId: string,
  _id: string,
  tags: string[],
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
  times: DateTime[]
}