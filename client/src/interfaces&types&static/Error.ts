export interface AuthError {
  response?: {
    data?: {
      msg?: string;
    };
  };
}
