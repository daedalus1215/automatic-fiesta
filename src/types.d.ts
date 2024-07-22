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
