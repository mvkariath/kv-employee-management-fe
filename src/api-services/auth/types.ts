type LoginResponse = {
  tokenType: string;
  accessToken: string;
};
type LoginPayload = {
  email: string;
  password: string;
};
export type { LoginPayload, LoginResponse };
