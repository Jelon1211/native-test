import { ChangeEvent } from "react";

export interface IGetUser {
  accessToken: string;
  id: string;
  email: string;
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

export interface IInputField {
  name: string;
  type?: string;
  value: string;
  divClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface IButton {
  placeHolderValue: string;
  isDisabled?: boolean;
}

export interface ErrorResponse {
  message: string;
}
