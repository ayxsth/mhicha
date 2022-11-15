export interface AuthConfig {
  secret: string;
  signOptions: {
    expiresIn: string;
  };
}
