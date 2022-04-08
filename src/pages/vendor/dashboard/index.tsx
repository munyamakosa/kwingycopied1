import Card from "@component/Card";
import VendorAnalyticsChart from "@component/dashboard/VendorAnalyticsChart";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import Typography, { H1, H5, Paragraph } from "@component/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VendorDashboard = () => {
  const [fullname, setFullname] = useState("");
  const [sellerbalance, setSellerbalance] = useState("");

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const router = useRouter();

  if (typeof window !== "undefined") {
    // Perform localStorage action
    var token = JSON.parse(localStorage.getItem("adminAuthToken") as string);
    if (!token) {
      // navigate("/login");
      router.push("/sellerlogin");
    }
  }

  useEffect(() => {
    const api = "https://backendkwingy.online/api/auth/seller";

    axios.get(api, { headers: { adminAuthToken: token } }).then((res) => {
      console.log(res.data.seller[0]);
      setFullname(
        res.data.seller[0].firstname + " " + res.data.seller[0].surname
      );

      setSellerbalance(res.data.seller[0].balance);
    });
  });

  return (
    <div>
      <DashboardPageHeader title="Dashboard" iconName="bag_filled" />

      <Grid container spacing={6}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
            <H5 color="text.muted" mb="8px">
              Hello,
            </H5>
            <H1 color="gray.700" mb="4px" lineHeight="1.3">
              {fullname}
            </H1>
            <Paragraph color="text.muted">Welcome</Paragraph>
          </Typography>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
            <H5 color="text.muted" mb="8px">
              Balance
            </H5>
            <H1 color="gray.700" mb="4px" lineHeight="1.3">
              {sellerbalance}
            </H1>
            <Paragraph color="text.muted">USD </Paragraph>
          </Typography>
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Typography as={Card} textAlign="center" py="1.5rem" height="100%">
            <H5 color="text.muted" mb="8px">
              Today
            </H5>
            <H1 color="gray.700" mb="4px" lineHeight="1.3">
              {date}
            </H1>
            <Paragraph color="text.muted">Happy Shopping!</Paragraph>
          </Typography>
        </Grid>

        <Grid item lg={8} xs={12}>
          <Card p="20px 30px">
            <H5 mb="1.5rem">Sales</H5>
            <VendorAnalyticsChart />
          </Card>
        </Grid>

        <Grid item lg={4} xs={12}>
          <Card p="20px 30px">
            <H5>Top Products</H5>
            {topCountryList.map((item, ind) => (
              <FlexBox
                alignItems="center"
                justifyContent="space-between"
                my="1rem"
                key={ind}
              >
                <FlexBox alignItems="center">
                  {/* <Avatar src={item.flagUrl} size={30} mr="8px" /> */}
                  <span>{item.name}</span>
                </FlexBox>
                <H5>${item.amount}</H5>
              </FlexBox>
            ))}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

// USE COUNTRY CODE TO FETCH FLAG
const topCountryList = [
  {
    name: "Iphone 8",
    amount: 130,
    flagUrl:
      "http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg",
  },
  {
    name: "Dell Laptop",
    amount: 110,
    flagUrl:
      "http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg",
  },
  {
    name: "Speaker",
    amount: 100,
    flagUrl:
      "http://purecatamphetamine.github.io/country-flag-icons/3x2/CA.svg",
  },
];

VendorDashboard.layout = VendorDashboardLayout;

export default VendorDashboard;
