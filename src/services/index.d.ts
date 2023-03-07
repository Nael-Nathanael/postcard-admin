/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestTransformer, AxiosResponseTransformer, AxiosResponse } from "axios";

export type ServiceConfigImportantProps<Data = undefined> = {
  method: "GET" | "PATCH" | "POST" | "UPDATE" | "DELETE" | "PUT",
  url: string,
  data?: Data,
  headers?: AxiosRequestHeaders, 
  signal?: AbortSignal,
  transformResponse?: AxiosResponseTransformer,
  transformRequest?: AxiosRequestTransformer,
}


export type ServiceConfigBaseProps = Record<string, {
  queryParams?: object,
  pathVariables?: object,
  body?: any
}>

export type ServiceSWRDataResponse<Data> = {
  data: Data | undefined,
  isEmpty: boolean,
  isLoading: boolean,
  isValidating: boolean,
  isError: boolean,
  isReady: boolean,
  mutate: KeyedMutator<Data | undefined>
}

// export interface ServiceResponseBaseApi<T> {
//   statusCode: number,
//   message: string,
//   data: T,
//   data_detail?: {
//     total: number,
//     page_total: number,
//   }
// }

export type ServiceResponseFull<T> = AxiosResponse<T> | undefined