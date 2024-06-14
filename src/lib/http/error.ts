import axios from "axios"
import { isEmpty } from "lodash-es"
import { Subject } from "rxjs"

export function extractErrorMessage(error: Error) {
  if (!axios.isAxiosError<HttpErrorData>(error)) {
    return error.message
  }

  if (!error.response) {
    return error.message
  }

  if (isEmpty(error.response.data)) {
    return error.message
  }

  return error.response.data.message
}

export const httpErrorStream = new Subject<Error>()
