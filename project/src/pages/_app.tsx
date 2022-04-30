import React, { Component, ReactNode } from "react";
import { AppProps } from "next/app";
import { AuthContextProvider } from "../contexts/AuthContext";

import "../styles/general.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
