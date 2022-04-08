import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import { useRouter } from "next/router";
import React from "react";

const CustomersOrders = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    // Perform localStorage action
    var token = JSON.parse(localStorage.getItem("customerAuthToken") as string);
    if (!token) {
      // navigate("/login");
      router.push("/userlogin");
    }
  }

  return (
    <div>
      <DashboardPageHeader title="Track Purchases" />
    </div>
  );
};

CustomersOrders.layout = DashboardLayout;

export default CustomersOrders;
