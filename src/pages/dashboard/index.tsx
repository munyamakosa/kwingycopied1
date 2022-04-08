import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Typography, { H5 } from "@component/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";

const Dashboard = () => {
  const [fullname, setFullname] = useState("");
  const [sellerbalance, setSellerbalance] = useState("");

  useEffect(() => {
    let abortController = new AbortController();
    // your async action is here
    if (typeof window !== "undefined") {
      // Perform localStorage action
      var token = JSON.parse(
        localStorage.getItem("customerAuthToken") as string
      );
      if (!token) {
        // navigate("/login");
        router.push("/userlogin");
      }
      if (token) {
        // navigate("/login");
        router.push("/dashboard");
      }
    }

    const api = "https://backendkwingy.online/api/auth/seller";

    axios.get(api, { headers: { adminAuthToken: token } }).then((res) => {
      console.log(res.data.seller[0]);
      setFullname(
        res.data.seller[0].firstname + " " + res.data.seller[0].surname
      );

      setSellerbalance(res.data.seller[0].balance);
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      localStorage.removeItem("customerId");
      localStorage.removeItem("customerAuthToken");
      router.push("/");
    }
  };

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const router = useRouter();

  useEffect(() => {});

  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="Welcome to Kwingy"
        button={
          <Button
            color="primary"
            bg="primary.light"
            px="2rem"
            onClick={handleLogout}
          >
            <i>
              <FiLogOut />
            </i>{" "}
            LOGOUT
          </Button>
        }
      />

      <Box mb="30px">
        <Grid container spacing={6}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FlexBox as={Card} p="14px 32px" height="100%" alignItems="center">
              {/* <Avatar src="/assets/images/faces/ralph.png" size={64} /> */}
              <Box ml="12px" flex="1 1 0">
                <FlexBox
                  flexWrap="wrap"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <H5 my="0px"> {fullname} </H5>
                    <FlexBox alignItems="center">
                      <Typography fontSize="14px" color="text.hint">
                        Balance:
                      </Typography>
                      <Typography ml="4px" fontSize="14px" color="primary.main">
                        {sellerbalance}
                      </Typography>
                    </FlexBox>
                  </div>
                </FlexBox>
                <h5>Date: {date}</h5>
              </Box>
            </FlexBox>
          </Grid>

          {/* <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <FlexBox
                    as={Card}
                    flexDirection="column"
                    alignItems="center"
                    height="100%"
                    p="1rem 1.25rem"
                  >
                    <H3 color="primary.main" my="0px" fontWeight="600">
                      {item.title}
                    </H3>
                    <Small color="text.muted" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </FlexBox>
                </Grid>
              ))}
            </Grid>
          </Grid> */}
        </Grid>
      </Box>
    </div>
  );
};

// const infoList = [
//   {
//     title: "0",
//     subtitle: "All Orders",
//   },
//   {
//     title: "0",
//     subtitle: "Awaiting Payments",
//   },
//   {
//     title: "00",
//     subtitle: "Awaiting Shipment",
//   },
//   {
//     title: "00",
//     subtitle: "Awaiting Delivery",
//   },
// ];

Dashboard.layout = DashboardLayout;

export default Dashboard;
