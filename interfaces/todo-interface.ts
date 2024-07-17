export interface ITodoData {
  id: number;
  todo: string;
  created_at: string;
  updated_at: string;
}

export interface ITodoResponse {
  data: ITodoData[];
}

export interface ITodoFormInput {
  todo: string;
}
