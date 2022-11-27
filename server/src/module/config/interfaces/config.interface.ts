export interface AppConfig {
  name: string;
  port: number;
  version: string;
}

export interface DatabaseConfig {
  client: string;
  host: string;
  name: string;
  password: string;
  port: number;
  user: string;
  timezone: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

export interface MailerConfig {
  host: string;
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}
