import axios from "axios"
import { Subject } from "rxjs"

export function extractErrorMessage(error: Error) {
  if (!axios.isAxiosError<HttpErrorData>(error)) {
    return error.message
  }

  if (error.response) {
    return error.response.data.message
  }

  return error.message
}

export const httpErrorStream = new Subject<Error>()
