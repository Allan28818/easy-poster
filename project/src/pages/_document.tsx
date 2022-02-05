import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="An easy way to post your ideas!" />
          <meta name="keywords" content="Easy Poster" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Baloo Bhaijaan 2+Bhaijaan+2:wght@400;500;700&family=Fira+Sans:wght@200;300;400;500;900&family=Roboto+Mono:wght@200;300;400;600&family=Roboto:wght@100;300;500;700;900&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#317EFB" />

          <link
            rel="apple-touch-icon"
            href="/assets/icons/icon-152x152.png"
            type="image/png"
          />

          <link
            rel="shortcut icon"
            href="/assets/icons/icon-48x48.png"
            type="image/png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
