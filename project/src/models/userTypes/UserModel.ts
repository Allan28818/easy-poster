export interface UserSignUp {
  firstName: string | string[] | undefined;
  lastName: string | string[] | undefined;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
