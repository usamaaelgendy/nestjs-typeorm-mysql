export class GenericResponseDto<T> {
  data: T;
  message: string;
  isSuccess: boolean;
  statusCode: number;
}
