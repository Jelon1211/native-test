import axios, { AxiosResponse } from "axios";
import { IGetUser, ICreateUser, ILoginUser } from "../types/loginservice";

export default class LoginService {
  static async loginAuth(userData: ILoginUser): Promise<IGetUser> {
    try {
      const response: AxiosResponse<IGetUser> = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ADRESS}/auth`,
        userData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message || "An unexpected error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  }

  // static async getUser(id: string): Promise<IGetUser> {
  //   try {
  //     const response: AxiosResponse<IGetUser> = await axios.get(
  //       `${process.env.NEXT_PUBLIC_SERVER_ADRESS}/users/${id}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async createUser(
    userData: Partial<ICreateUser>
  ): Promise<ICreateUser> {
    try {
      const response: AxiosResponse<ICreateUser> = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ADRESS}/users`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async logOut(): Promise<Response> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADRESS}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
