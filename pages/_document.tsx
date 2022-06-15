import createEmotionServer from '@emotion/server/create-instance';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import emotionCache from '@/emotion-cache';

export default class Document extends NextDocument {
  static async getInitialProps(ctx: any) {
    const originalRenderPage = ctx.renderPage;
    const { extractCriticalToChunks } = createEmotionServer(emotionCache);

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) =>
          function EnhanceApp(props: any) {
            return (
              <App
                emotionCache={emotionCache}
                {...props}
              />
            );
          },
      });

    const initialProps = await NextDocument.getInitialProps(ctx);
    const emotionStyles = extractCriticalToChunks(initialProps.html);

    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return { ...initialProps, emotionStyleTags };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
