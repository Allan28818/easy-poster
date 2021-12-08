import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, firestore } from "../services/config/firebase";
import { UserLogin, UserSignUp } from "../models/UserModel";
import {
  FunctionMessage,
  popUpFunctionMessage,
} from "../models/FunctionMessage";

interface AuthContextProps {
  children: ReactNode;
}

interface AuthenticationUser {
  email: string | null | undefined;
  uid: string | null | undefined;
  photoURL?: string | null;
  displayName?: string | null;
}

interface AuthContextInt {
  user: AuthenticationUser;
  setUser: Dispatch<SetStateAction<AuthenticationUser>>;
  signUpWithEmailAndPassword: (props: UserSignUp) => Promise<FunctionMessage>;
  loginWithEmailAndPassword: (props: UserLogin) => Promise<FunctionMessage>;
  resetPassword: (email: string) => Promise<FunctionMessage>;
  logOut: () => Promise<FunctionMessage>;
  signInWithGoogle: () => Promise<popUpFunctionMessage>;
  signInWithFacebook: () => Promise<popUpFunctionMessage>;
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

  async function signInWithGoogle(): Promise<popUpFunctionMessage> {
    let result = {} as UserCredential;
    try {
      const provider = new GoogleAuthProvider();
      result = await signInWithPopup(auth, provider);

      if (result.user) {
        const { displayName, photoURL, uid, email } = result.user;

        if (!displayName || !photoURL) {
          throw new Error("Error! Missing Google account information!");
        }

        await setDoc(doc(firestore, "users", uid), {
          id: uid,
          displayName,
          email,
          photoURL,
        });

        setUser({
          uid,
          email,
          photoURL,
          displayName,
        });
      }
    } catch (error: any) {
      return {
        result: null,
        message: "It wasn't possible to finish the pop-up operation",
        error,
        errorCode: error.code,
        errorMessage: error.message,
      };
    }
    return {
      result,
      message: "The pop-up authetication was successfully finished!",
    };
  }

  async function signInWithFacebook(): Promise<popUpFunctionMessage> {
    let result = {} as UserCredential;

    try {
      const provider = new FacebookAuthProvider();

      result = await signInWithPopup(auth, provider);
      const { displayName, photoURL, email, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Error! Missing Facebook account information");
      }

      await setDoc(doc(firestore, "users", uid), {
        id: uid,
        displayName,
        email,
        photoURL,
      });

      setUser({
        uid,
        email,
        photoURL,
        displayName,
      });
    } catch (error: any) {
      return {
        result: null,
        message: "It wasn't possible to finish the pop-up operation",
        error,
        errorCode: error.code,
        errorMessage: error.message,
      };
    }

    return {
      result,
      message: "The pop-up authetication was successfully finished!",
    };
  }

  async function signUpWithEmailAndPassword(
    props: UserSignUp
  ): Promise<FunctionMessage> {
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
        errorCode: error.code,
        errorMessage: error.message,
      };
    }

    return { message: "Welcome to Easy Poster!" };
  }

  async function loginWithEmailAndPassword({
    email,
    password,
  }: UserLogin): Promise<FunctionMessage> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      return {
        message: "It wasn't possible to login the user!",
        error: error,
        errorCode: error.code,
        errorMessage: error.message,
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
        errorCode: error.code,
        errorMessage: error.message,
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
        errorCode: error.code,
        errorMessage: error.message,
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
      value={{
        user,
        setUser,
        signUpWithEmailAndPassword,
        loginWithEmailAndPassword,
        resetPassword,
        logOut,
        signInWithGoogle,
        signInWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
