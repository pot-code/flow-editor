/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_PREFIX: string
  readonly VITE_WDYR_ENABLED: string
  readonly VITE_MOCK_ENABLED: string
  readonly VITE_LOGTO_ENDPOINT: string
  readonly VITE_LOGTO_APP_ID: string
  readonly VITE_LOGTO_API_RESOURCE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
