import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default function MyDocument({ locale }: { locale: string }) {
  return (
    <Html lang={locale || "vi"}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, locale: ctx.locale };
};
