/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string
  readonly VITE_WDYR_ENABLED: string
  readonly VITE_MOCK_ENABLED: string
  readonly VITE_ZITADEL_AUTHORITY: string
  readonly VITE_ZITADEL_CLIENT_ID: string
  readonly VITE_ZITADEL_API_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
