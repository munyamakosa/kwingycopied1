import Head from "next/head";
import React from "react";
import Divider from "../Divider";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MobileNavigationBar from "../mobile-navigation/MobileNavigationBar";
import SaleNavbar from "../navbar/SaleNavbar";
import Sticky from "../sticky/Sticky";
import Topbar from "../topbar/Topbar";
import StyledAppLayout from "./AppLayoutStyle";

type Props = {
  title?: string;
};

const SaleLayout2: React.FC<Props> = ({
  children,
  title = "Shop | Living in Abundance",
}) => {
  return (
    <StyledAppLayout>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar />
      <Header />
      <Divider />
      <Sticky fixedOn={0}>
        <SaleNavbar saleCategoryList={saleCategoryList} />
      </Sticky>
      <div className="section-after-sticky">{children}</div>
      <MobileNavigationBar />
      <Footer />
    </StyledAppLayout>
  );
};

const saleCategoryList = [
  {
    icon: "t-shirt",
    title: "Fashion Wear",
  },
  {
    icon: "laptop",
    title: "Computers & Electronics",
  },
  {
    icon: "plant-pot",
    title: "Home, Kitchen & Garden",
  },
  {
    icon: "gift-1",
    title: "Gifts",
  },
  {
    icon: "voice-recorder",
    title: "Music",
  },
  {
    icon: "beauty-products",
    title: "Health & Beauty",
  },
  {
    icon: "shop",
    title: "Hardware",
  },
  {
    icon: "voice-recorder",
    title: "Entertainment",
  },
  {
    icon: "bottle",
    title: "Liquor",
  },
  {
    icon: "wheel",
    title: "Automative & Spare Parts",
  },
];

export default SaleLayout2;
