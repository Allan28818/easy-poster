import { UserCredential } from "@firebase/auth";

export interface FunctionMessage {
  message: string;
  error?: Error;
  errorCode?: string;
  errorMessage?: string;
}

export interface popUpFunctionMessage {
  result: UserCredential | null;
  message: string;
  error?: Error;
  errorCode?: string;
  errorMessage?: string;
}
