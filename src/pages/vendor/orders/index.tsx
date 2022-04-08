import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import VendorOrderList from "@component/orders/VendorOrderList";
import { useRouter } from "next/router";
import React from "react";

const Orders = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    // Perform localStorage action
    const token = localStorage.getItem("adminAuthToken");
    if (!token) {
      // navigate("/login");
      router.push("/sellerlogin");
    }
  }

  return (
    <div>
      <DashboardPageHeader title="Orders" iconName="bag_filled" />
      <VendorOrderList />
    </div>
  );
};

Orders.layout = VendorDashboardLayout;

export default Orders;
