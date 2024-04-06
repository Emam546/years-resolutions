import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="icon"
                    href="https://emam546.github.io/logo.png"
                    type="image/png"
                />
                <meta
                    name="description"
                    content="Year's resolutions - Stay accountable and motivated towards achieving your goals for the year ahead with our simple yet effective tool. Crafted with Next.js and Tailwind CSS, this project seamlessly integrates with an API to dynamically fetch and display your resolutions in a clean and organized manner."
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
