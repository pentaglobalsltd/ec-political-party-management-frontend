export interface ReduxRequest<T> {
  request: boolean;
  data?: T;
  success?: boolean;
  failed?: boolean;
}
