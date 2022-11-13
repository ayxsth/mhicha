interface ImportMetaEnv {
  readonly REACT_APP_NAME: string;
  readonly REACT_APP_PORT: string;
  readonly REACT_APP_VERSION: string;
  readonly REACT_APP_API_BASE_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
