import { UserManager } from "oidc-client-ts"

export default new UserManager({
  authority: import.meta.env.VITE_LOGTO_ENDPOINT,
  client_id: import.meta.env.VITE_LOGTO_APP_ID,
  redirect_uri: new URL("/callback", window.origin).toString(),
  post_logout_redirect_uri: new URL("/logout", window.origin).toString(),
})
