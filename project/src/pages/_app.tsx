import { AppProps } from "next/app";
import { AuthContextProvider } from "../contexts/AuthContext";

import "../styles/general.scss";
import "../styles/login.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
