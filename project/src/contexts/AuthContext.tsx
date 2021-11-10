import { createContext, ReactNode, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, firestore } from "../services/config/firebase";
import { UserLogin, UserSignUp } from "../models/UserModel";
import { FunctionMessage } from "../models/FunctionMessage";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthenticationUser {
  email: string | null | undefined;
  uid: string | null | undefined;
}

interface AuthContextInt {
  user: AuthenticationUser;
  signIn: (props: UserSignUp) => Promise<FunctionMessage>;
  login: (props: UserLogin) => Promise<FunctionMessage>;
  resetPassword: (email: string) => Promise<FunctionMessage>;
  logOut: () => Promise<FunctionMessage>;
}

export const AuthContext = createContext({} as AuthContextInt);

export function AuthContextProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<AuthenticationUser>(
    {} as AuthenticationUser
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser({
        email: user?.email,
        uid: user?.uid,
      });
    });

    setLoading(false);
  }, []);

  async function signIn(props: UserSignUp): Promise<FunctionMessage> {
    const { firstName, lastName, email, password } = props;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(firestore, "users", user.uid), {
        id: user.uid,
        firstName,
        lastName,
        email,
      });
    } catch (error: any) {
      return {
        message: "It wasn't possible to sign the user up!",
        error: error,
        errorCode: error.errorCode,
        errorMessage: error.errorMessage,
      };
    }

    return { message: "Welcome to Easy Poster!" };
  }

  async function login({
    email,
    password,
  }: UserLogin): Promise<FunctionMessage> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      return {
        message: "It wasn't possible to login the user!",
        error: error,
        errorCode: error.errorCode,
        errorMessage: error.errorMessage,
      };
    }

    return { message: "The login was successfuly maden!" };
  }

  async function resetPassword(email: string): Promise<FunctionMessage> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      return {
        message: "It wasn't possible to send the reset password request!",
        error: error,
        errorCode: error.errorCode,
        errorMessage: error.errorMessage,
      };
    }

    return { message: "The reset password request was successfuly sent!" };
  }

  async function logOut(): Promise<FunctionMessage> {
    try {
      await signOut(auth);
    } catch (error: any) {
      return {
        message: "It wasn't possible to log the user out!",
        error: error,
        errorCode: error.errorCode,
        errorMessage: error.errorMessage,
      };
    }

    return { message: "The log out was successfuly maden!" };
  }

  if (loading) {
    return (
      <>
        <h1>Carregando</h1>
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, login, resetPassword, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
