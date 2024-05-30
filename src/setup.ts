import { isNil } from "lodash-es"
import React from "react"
import useAuthStore from "./features/auth/useAuthStore"
import zitadel from "./lib/auth/zitadel"

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
      trackHooks: true,
      trackAllPureComponents: true,
    })
  }
}

async function configOpenApi() {
  // OpenAPI.BASE = import.meta.env.VITE_API_PREFIX
}

async function initAuth() {
  const user = await zitadel.userManager.getUser()
  console.log("🚀 ~ initAuth ~ user:", user)
  useAuthStore.getState().setIsAuthenticated(!isNil(user))
}

export default async function setup() {
  await installWdyr()
  await installMockService()
  await configOpenApi()
  await initAuth()
}
