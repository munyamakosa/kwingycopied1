import Footer from "@component/footer/Footer";
import Header from "@component/header/Header";
import MobileNavigationBar from "@component/mobile-navigation/MobileNavigationBar";
import Sticky from "@component/sticky/Sticky";
import Topbar from "@component/topbar/Topbar";
import Head from "next/head";
import React from "react";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
  navbar?: React.ReactChild;
};

const AppLayout: React.FC<Props> = ({ children, navbar }) => (
  <StyledAppLayout>
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
      <meta property="og:image" content="/assets/images/landing/preview.jpg" />
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
      <meta property="og:image" content="/assets/images/landing/preview.jpg" />
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

    <Topbar />

    <Sticky fixedOn={0}>
      <Header />
    </Sticky>

    {navbar && <div className="section-after-sticky">{navbar}</div>}
    {!navbar ? (
      <div className="section-after-sticky">{children}</div>
    ) : (
      children
    )}

    <MobileNavigationBar />
    <Footer />
  </StyledAppLayout>
);

export default AppLayout;
