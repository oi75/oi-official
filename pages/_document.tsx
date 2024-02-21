import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Oi</title>
        <meta
          name="description"
          content="Fostering a global subculture community with fans of popular culture, animation, and comics at 'Cosmo Kyoto'."
        />
      </Head>
      <body
        style={{
          backgroundColor: "#000",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
