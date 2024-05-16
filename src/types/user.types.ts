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

export interface UserResponse {
  success: boolean;
  data: UserData;
}

export interface UserData {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  role: string;
  updatedAt: string;
}
