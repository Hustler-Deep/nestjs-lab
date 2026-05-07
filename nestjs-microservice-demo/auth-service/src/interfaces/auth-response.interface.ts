export interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    user: {
      id: number;
      email: string;
      name: string;
      role: string;
    };
  };
}
