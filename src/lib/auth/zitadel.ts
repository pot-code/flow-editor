import { createZitadelAuth } from "@zitadel/react"

export default createZitadelAuth({
  project_resource_id: "269378284486131714",
  client_id: "269378374865059842@react",
  redirect_uri: "http://localhost:5173/callback",
  authority: "http://localhost:8080",
})
