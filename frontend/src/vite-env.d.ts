/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_NODE_ENV: string
  readonly VITE_ENABLE_DEVTOOLS: string
  readonly VITE_ENABLE_MOCK_API: string
  readonly VITE_DEFAULT_LOCALE: string
  // Add other VITE_ prefixed env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
