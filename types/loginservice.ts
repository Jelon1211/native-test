export interface IGetUser {
  accessToken: string;
  id: string;
  email: string;
}

export interface ICreateUserResponse {
  data: ICreateUser;
  status: number;
}

export interface ICreateUser {
  message?: string;
  name: string | undefined;
  email: string;
  password: string;
  isActive: boolean;
}
export interface ILoginUser {
  email: string;
  password: string;
}
