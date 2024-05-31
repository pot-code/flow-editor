import { createZitadelAuth } from "@zitadel/react"

export default createZitadelAuth({
  client_id: import.meta.env.VITE_ZITADEL_CLIENT_ID,
  redirect_uri: new URL("/callback", window.origin).toString(),
  authority: import.meta.env.VITE_ZITADEL_AUTHORITY,
})
