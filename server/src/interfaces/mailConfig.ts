interface userAuth {
  user: string;
  pass: string;
}

export interface mailConfig {
  service: string;
  auth: userAuth;
}
