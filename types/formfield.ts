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
  name: string;
  email: string;
  password: string;
  isActive: boolean;
}
