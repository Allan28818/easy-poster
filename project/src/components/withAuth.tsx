import { ElementType, useEffect } from "react";
import { useRouter } from "next/router";

import { auth } from "../services/config/firebase";

export default function withAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: unknown) => {
    const router = useRouter();

    useEffect(() => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        router.replace("/authentication/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}
