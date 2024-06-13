import Axios, { AxiosError, AxiosRequestConfig } from "axios"
import { httpErrorStream } from "./error"

export const AXIOS_INSTANCE = Axios.create({ baseURL: import.meta.env.VITE_API_PREFIX }) // use your own URL here or environment variable

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error) => {
    httpErrorStream.next(error)
    return Promise.reject(error)
  },
)

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error add cancel to support orval
  promise.cancel = () => {
    source.cancel("Query was cancelled")
  }

  return promise
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData
