import axios from "axios"
import React from "react"

async function installMockService() {
  if (import.meta.env.VITE_MOCK_ENABLED === "true") {
    await import("../mock/browser")
      .then(({ createWorker }) => createWorker())
      .then((worker) =>
        worker.start({
          onUnhandledRequest: "bypass",
        }),
      )
  }
}

async function installWdyr() {
  if (import.meta.env.VITE_WDYR_ENABLED === "true") {
    const { default: wdyr } = await import("@welldone-software/why-did-you-render")
    wdyr(React, {
      exclude: [/^BrowserRouter/, /^Link/, /^Route/],
      trackAllPureComponents: true,
    })
  }
}

async function configOpenApi() {
  axios.defaults.baseURL = import.meta.env.VITE_API_PREFIX
}

export default async function setup() {
  await installWdyr()
  await installMockService()
  await configOpenApi()
}
