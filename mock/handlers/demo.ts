import { HttpResponse, delay, http } from "msw"

export const handlers = [
  http.get("/mock/demo", async () => {
    await delay(500)
    return HttpResponse.json({
      code: 200,
      msg: null,
      data: "hello world",
    })
  }),
]
