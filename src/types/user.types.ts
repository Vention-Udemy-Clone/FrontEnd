export interface LoginResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  accessToken: string;
  id: string;
}

export interface Login {
  email: string;
  fullName: string;
  avatarUrl: string;
}
