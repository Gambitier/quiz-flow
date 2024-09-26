export type ApiResponseStatus = 'Suceess' | 'Failuare';

export type APIResponse<dataType = any> = {
  message: string;
  data: dataType;
};

export type ExceptionResponseBody = {
  path: string;
  message: string;
  response: any;
};
