import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

type OrderStatus = "packaging" | "shipping" | "delivering" | "complete";

const OrderDetails = () => {
  const [orderIdNumber, setorderIdNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [orderFullname, setOrderFullname] = useState("");
  const [orderPhonenumber, setOrderPhonenumber] = useState("");
  const [orderDeliverAddress, setorderDeliverAddress] = useState("");
  const [orderStatuses, setorderStatuses] = useState("");

  const [deliveryfee, setdeliveryfee] = useState("");
  const [deliverylocation, setdeliverylocation] = useState("");
  const [ordersList, setordersList] = useState([]);

  if (typeof window !== "undefined") {
    const queryParams = new URLSearchParams(window.location.search);
    var orderId = queryParams.get("order");
  }

  useEffect(() => {
    const api =
      "https://backendkwingy.online/api/products/orders/filter?_id=" + orderId;

    axios.get(api).then((res) => {
      setorderIdNumber(res.data.filteredOrders[0]._id);
      setOrderDate(res.data.filteredOrders[0].createdAt);
      setOrderFullname(res.data.filteredOrders[0].fullname);
      setOrderPhonenumber(res.data.filteredOrders[0].phonenumber);
      setorderDeliverAddress(res.data.filteredOrders[0].deliveryaddress);
      setorderStatuses(res.data.filteredOrders[0].orderstatus);
      setordersList(res.data.filteredOrders[0].ordersList);
      setdeliveryfee(res.data.filteredOrders[0].deliveryfee);
      setdeliverylocation(res.data.filteredOrders[0].deliverylocation);
    });
  });

  const orderStatus: OrderStatus = "shipping";
  const orderStatusList = ["packaging", "shipping", "delivering", "complete"];
  const stepIconList = ["package-box", "truck-1", "delivery"];

  const statusIndex = orderStatusList.indexOf(orderStatus);
  const width = useWindowSize();
  const breakpoint = 350;
  const router = useRouter();
  if (typeof window !== "undefined") {
    // Perform localStorage action
    var token = JSON.parse(localStorage.getItem("customerAuthToken") as string);
    // var customerId = JSON.parse(localStorage.getItem("customerId") as string);

    if (!token) {
      // navigate("/login");
      router.push("/userlogin");
    }
  }
  return (
    <div>
      <DashboardPageHeader
        title="Order Details"
        iconName="bag_filled"
        button={
          <Button color="primary" bg="primary.light" px="2rem">
            Order Again
          </Button>
        }
      />

      <Card p="2rem 1.5rem" mb="30px">
        <FlexBox
          flexDirection={width < breakpoint ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          my="2rem"
        >
          {stepIconList.map((item, ind) => (
            <Fragment key={item}>
              <Box position="relative">
                <Avatar
                  size={64}
                  bg={ind <= statusIndex ? "primary.main" : "gray.300"}
                  color={ind <= statusIndex ? "gray.white" : "primary.main"}
                >
                  <Icon size="32px" defaultcolor="currentColor">
                    {item}
                  </Icon>
                </Avatar>
                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar size={22} bg="gray.200" color="success.main">
                      <Icon size="12px" defaultcolor="currentColor">
                        done
                      </Icon>
                    </Avatar>
                  </Box>
                )}
              </Box>
              {ind < stepIconList.length - 1 && (
                <Box
                  flex={width < breakpoint ? "unset" : "1 1 0"}
                  height={width < breakpoint ? 50 : 4}
                  minWidth={width < breakpoint ? 4 : 50}
                  bg={ind < statusIndex ? "primary.main" : "gray.300"}
                />
              )}
            </Fragment>
          ))}
        </FlexBox>

        <FlexBox justifyContent={width < breakpoint ? "center" : "flex-end"}>
          <Typography
            p="0.5rem 1rem"
            borderRadius="300px"
            bg="primary.light"
            color="primary.main"
            textAlign="center"
          >
            Order Status <b>{orderStatuses}</b>
          </Typography>
        </FlexBox>
      </Card>

      <Card p="0px" mb="30px" overflow="hidden">
        <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Order ID:
            </Typography>
            <Typography fontSize="14px">{orderIdNumber}</Typography>
          </FlexBox>

          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Delivery Fee:
            </Typography>
            <Typography fontSize="14px">{deliveryfee} USD</Typography>
          </FlexBox>

          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              To Location:
            </Typography>
            <Typography fontSize="14px">{deliverylocation}</Typography>
          </FlexBox>

          <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
              Placed on:
            </Typography>
            <Typography fontSize="14px">{orderDate}</Typography>
          </FlexBox>
        </TableRow>

        <Box py="0.5rem">
          {ordersList.map((item) => (
            <FlexBox
              px="1rem"
              py="0.5rem"
              flexWrap="wrap"
              alignItems="center"
              key={item.id}
            >
              <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar src={item.imgUrl} size={64} />
                <Box ml="20px">
                  <H6 my="0px">{item.name}</H6>
                  <Typography fontSize="14px" color="text.muted">
                    ${item.price} x {item.qty}
                  </Typography>
                </Box>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Ordered by: {orderFullname}
            </H5>
            <Paragraph fontSize="14px" mb="40px">
              {orderPhonenumber}
            </Paragraph>
            <H5 mt="0px" mb="14px">
              Order Delivery Address
            </H5>
            <Paragraph fontSize="14px" mb="40px">
              {orderDeliverAddress}
            </Paragraph>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

OrderDetails.layout = DashboardLayout;

export default OrderDetails;
