import { H5 } from "@component/Typography";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FlexBox from "../FlexBox";
import Hidden from "../hidden/Hidden";
import DashboardPageHeader from "../layout/DashboardPageHeader";
import Pagination from "../pagination/Pagination";
import TableRow from "../TableRow";

export interface CustomerOrderListProps {}

const CustomerOrderList: React.FC<CustomerOrderListProps> = () => {
  const router = useRouter();

  const [recentOrders, setrecentOrders] = useState([]);

  if (typeof window !== "undefined") {
    // Perform localStorage action
    var token = JSON.parse(localStorage.getItem("customerAuthToken") as string);
    var customerId = JSON.parse(localStorage.getItem("customerId") as string);

    if (!token) {
      // navigate("/login");
      router.push("/userlogin");
    }
  }

  useEffect(() => {
    const api =
      "https://backendkwingy.online/api/products/orders/filter?placedby=" +
      customerId;

    axios.get(api, { headers: { adminAuthToken: token } }).then((res) => {
      setrecentOrders(res.data.filteredOrders);
      console.log(recentOrders);
    });
  });

  return (
    <div>
      <DashboardPageHeader title="My Orders" iconName="bag_filled" />

      <Hidden down={769}>
        <TableRow padding="0px 18px" boxShadow="none" bg="none">
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Order #
          </H5>
          <H5 color="text.muted" ml="100px" textAlign="left">
            Status
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Payment Method
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Date purchased
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {recentOrders.map((filteredProducts, _id) => (
        <Link href={"orders/q?order=" + filteredProducts._id}>
          <TableRow
            as="a"
            href={"orders/q?order=" + filteredProducts._id}
            my="1rem"
            padding="6px 18px"
          >
            <FlexBox alignItems="center">
              {/* <Avatar src="/assets/images/products/imageshoes.png" size={36} /> */}
              <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
                {filteredProducts._id}
              </H5>
            </FlexBox>
            <H5 color="text.muted" ml="60px" textAlign="left">
              {filteredProducts.orderstatus}
            </H5>
            <H5 color="text.muted" my="0px" textAlign="left">
              {filteredProducts.paymentmethod}
            </H5>
            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              {filteredProducts.createdAt}
            </H5>
          </TableRow>
        </Link>
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox>
    </div>
  );
};

export default CustomerOrderList;
