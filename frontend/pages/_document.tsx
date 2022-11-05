import * as React from "react";
import Document, {Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import createEmotionCache from "../utils/theme.utils";

type NewDocumentInitialProps = DocumentInitialProps & {
    emotionStyleTags?: any;
};

export default class MyDocument extends Document {
    static async getInitialProps(ctx:DocumentContext): Promise<NewDocumentInitialProps> {
        const originalRenderPage = ctx.renderPage;

        const cache = createEmotionCache();
        const { extractCriticalToChunks } = createEmotionServer(cache);

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App:any) =>
                    function EnhanceApp(props) {
                        return <App emotionCache={cache} {...props} />;
                    },
            });

        const initialProps = await Document.getInitialProps(ctx);

        const emotionStyles = extractCriticalToChunks(initialProps.html);
        const emotionStyleTags = emotionStyles.styles.map((style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(" ")}`}
                key={style.key}
                dangerouslySetInnerHTML={{ __html: style.css }}
            />
        ));

        return {
            ...initialProps,
            emotionStyleTags,
        };
    }

    render() {
        const {emotionStyleTags} = this.props as NewDocumentInitialProps;
        return (
            <Html lang="en">
                <Head>
                    {emotionStyleTags}
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}