export type ApiResponseStatus = 'Suceess' | 'Failuare';

export type APIResponse<dataType = any> = {
  data: dataType;
};

export type ExceptionResponseBody = {
  path: string;
  message: string;
  response: any;
};
