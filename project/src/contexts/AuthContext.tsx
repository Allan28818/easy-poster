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
  updateProfile,
} from "firebase/auth";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, firestore } from "../services/config/firebase";
import { UserLogin, UserSignUp } from "../models/userTypes/UserModel";
import {
  FunctionMessage,
  popUpFunctionMessage,
} from "../models/FunctionMessage";

import { getUserByField } from "../services/users/getUserByField";

import DefaultLoader from "../components/Loaders/DefaultLoader";

interface AuthContextProps {
  children: ReactNode;
}

export interface AuthenticationUser {
  email: string | null | undefined;
  id: string | null | undefined;
  followers: string[];
  following: string[];
  photoURL?: string | null;
  displayName?: string | null;
}

interface AuthContextInt {
  user: AuthenticationUser | null;
  setUser: Dispatch<SetStateAction<AuthenticationUser | null>>;
  signUpWithEmailAndPassword: (props: UserSignUp) => Promise<FunctionMessage>;
  loginWithEmailAndPassword: (props: UserLogin) => Promise<FunctionMessage>;
  resetPassword: (email: string) => Promise<FunctionMessage>;
  logOut: () => Promise<FunctionMessage>;
  signInWithGoogle: () => Promise<popUpFunctionMessage>;
  signInWithFacebook: () => Promise<popUpFunctionMessage>;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext({} as AuthContextInt);

export function AuthContextProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<AuthenticationUser | null>(
    {} as AuthenticationUser
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onIdTokenChanged(async (authenticatedUser) => {
      if (!authenticatedUser) {
        setUser(null);
      } else {
        const { data } = await getUserByField({
          fieldToGet: "id",
          fieldValue: authenticatedUser?.uid,
        });

        if (data) {
          setUser({
            photoURL: data.photoURL,
            displayName: data?.displayName,
            email: data?.email,
            followers: data?.followers,
            following: data?.following,
            id: data?.id,
          });
        }
      }
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
        const createdAt = serverTimestamp();

        if (!displayName || !photoURL) {
          throw new Error("Error! Missing Google account information!");
        }

        await setDoc(doc(firestore, "users", uid), {
          id: uid,
          displayName,
          email,
          photoURL,
          followers: [],
          following: [],
          createdAt,
        });

        await setDoc(doc(firestore, "feeds", uid), {
          id: uid,
          posts: [],
          createdAt,
        });

        // setUser({
        //   uid,
        //   email,
        //   photoURL,
        //   displayName,
        // });
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
      const createdAt = serverTimestamp();

      if (!displayName || !photoURL) {
        throw new Error("Error! Missing Facebook account information");
      }

      await setDoc(doc(firestore, "users", uid), {
        id: uid,
        displayName,
        email,
        photoURL,
        followers: [],
        following: [],
        createdAt,
      });

      await setDoc(doc(firestore, "feeds", uid), {
        id: uid,
        posts: [],
        createdAt,
      });

      // setUser({
      //   uid,
      //   email,
      //   photoURL,
      //   displayName,
      // });
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

      updateProfile(user, { displayName: `${firstName} ${lastName}` });
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
    return <DefaultLoader />;
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
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
