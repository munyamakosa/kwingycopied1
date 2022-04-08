import CustomerDashboardLayout from "@component/layout/CustomerDashboardLayout";
import CustomerOrderList from "@component/orders/CustomerOrderList";
import { useRouter } from "next/router";
import React from "react";

const Orders = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    // Perform localStorage action
    var token = JSON.parse(localStorage.getItem("customerAuthToken") as string);
    if (!token) {
      // navigate("/login");
      router.push("/userlogin");
    }
  }

  return <CustomerOrderList />;
};

Orders.layout = CustomerDashboardLayout;

export default Orders;
