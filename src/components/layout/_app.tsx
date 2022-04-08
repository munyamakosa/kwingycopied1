import { AppProvider } from "contexts/app/AppContext";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import React, { Fragment } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "utils/globalStyles";
import { theme } from "utils/theme";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

const App = ({ Component, pageProps }: any) => {
  let Layout = Component.layout || Fragment;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        {/* <!-- Primary Meta Tags --> */}
        <title>Kwingy - Living in Abundance</title>
        <meta name="title" content="Kwingy - Living in Abundance" />
        <meta
          name="description"
          content="With Kwingy you can search and order products delivered to your door at an affordable price. Access for free on Econet."
        />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kwingy.com/" />
        <meta property="og:title" content="Kwingy - Living in Abundance" />
        <meta
          property="og:description"
          content="With Kwingy you can search and order products delivered to your door at an affordable price. Access for free on Econet."
        />
        <meta
          property="og:image"
          content="/assets/images/landing/preview.jpg"
        />
        {/* 
<!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kwingy.com/" />
        <meta property="twitter:title" content="Kwingy - Living in Abundance" />
        <meta
          property="twitter:description"
          content="With Kwingy you can search and order products delivered to your door at an affordable price. Access for free on Econet."
        />
        <meta
          property="twitter:image"
          content="/assets/images/landing/preview.jpg"
        />
        ======= // primary meta tags
        <title>Kwingy - Living in Abundance</title>
        <meta name="title" content="Kwingy - Living in Abundance" />
        <meta
          name="description"
          content="With Kwingy you can search and order products delivered to your door at an affordable price. Access for free on Econet."
        />
        // open graph facebook
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kwingy.com/" />
        <meta property="og:title" content="Kwingy - Living in Abundance" />
        <meta
          property="og:description"
          content="With Kwingy you can search and order products delivered to your door at an affordable price. Access for free on Econet."
        />
        <meta
          property="og:image"
          content="/assets/images/landing/preview.jpg"
        />
        // twitter
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://kwingy.com/" />
        <meta property="twitter:title" content="Kwingy - Living in Abundance" />
        <meta
          property="twitter:description"
          content="With Kwingy you can search and order products delivered to your door at an affordable price. Access for free on Econet."
        />
        <meta
          property="twitter:image"
          content="/assets/images/landing/preview.jpg"
        />
      </Head>
      <GlobalStyles />
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </ThemeProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
