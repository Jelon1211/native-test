export interface IFormField {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: string;
}

export interface SignInFormState {
  email: string;
  password: string;
}
export interface SignUpFormState {
  username: string;
  email: string;
  password: string;
}
