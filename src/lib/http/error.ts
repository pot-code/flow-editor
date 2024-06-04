import axios from "axios"

export function extractErrorMessage(error: Error) {
  if (!axios.isAxiosError<HttpErrorData>(error)) {
    return error.message
  }

  if (error.response) {
    return error.response.data.message
  }

  return error.message
}
