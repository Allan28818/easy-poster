import { ElementType, useEffect } from "react";
import { useRouter } from "next/router";

import { auth } from "../services/config/firebase";
import { useAuth } from "../hooks/useAuth";
import { getUserByField } from "../services/users/getUserByField";

export default function withAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { setUser } = useAuth();
    useEffect(() => {
      const handleUserChanged = () => {
        auth.onAuthStateChanged(async (user) => {
          if (user?.uid) {
            const { data } = await getUserByField({
              fieldToGet: "id",
              fieldValue: user?.uid,
            });
            setUser({
              id: data?.id,
              email: data?.email,
              displayName: data?.displayName,
              photoURL: data?.photoURL,
              followers: data?.followers,
              following: data?.following,
            });
          } else {
            router.replace("/authentication/login");
          }
        });
      };

      handleUserChanged();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
