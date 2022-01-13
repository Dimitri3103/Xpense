import type { AppProps } from "next/app";
import { AuthProvider } from "../utils/firebase/auth";
import React from "react";
import Head from "next/head";
import "../assets/styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <AuthProvider>
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Xpense App</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    </AuthProvider>
  );
}
export default MyApp;
