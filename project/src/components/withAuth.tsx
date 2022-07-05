import { ElementType, useEffect } from "react";
import { useRouter } from "next/router";

import { auth } from "../services/config/firebase";
import { useAuth } from "../hooks/useAuth";

export default function withAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { setUser } = useAuth();
    useEffect(() => {
      const currentUser = auth.currentUser;
      auth.onAuthStateChanged((user) => {
        if (user?.uid) {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          });
        } else {
          router.replace("/authentication/login");
        }
      });
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
