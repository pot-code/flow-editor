import { createZitadelAuth } from "@zitadel/react"

export default createZitadelAuth({
  client_id: import.meta.env.VITE_ZITADEL_CLIENT_ID,
  project_resource_id: import.meta.env.VITE_ZITADEL_PROJECT_RESOURCE_ID,
  redirect_uri: new URL("/callback", window.origin).toString(),
  post_logout_redirect_uri: new URL("/login", window.origin).toString(),
  authority: import.meta.env.VITE_ZITADEL_AUTHORITY,
  scope: `openid profile offline_access urn:zitadel:iam:org:project:id:${import.meta.env.VITE_ZITADEL_PROJECT_RESOURCE_ID}:aud`,
})
