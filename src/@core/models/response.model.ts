export interface IResponseList<T> {
  data: T[];
  count: number;
}

export interface IResponsePost {
  message: string | any;
  error: boolean;
}
