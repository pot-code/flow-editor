import axios from "axios"
import mitt from "mitt"

export function extractErrorMessage(error: Error) {
  if (!axios.isAxiosError<HttpErrorData>(error)) {
    return error.message
  }

  if (error.response) {
    return error.response.data.message
  }

  return error.message
}

export const errorEvent = mitt<{ error: Error }>()
