import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Oi</title>
        <meta
          name="description"
          content="Fostering a global subculture community with fans of popular culture, animation, and comics at 'Cosmo Kyoto'."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
