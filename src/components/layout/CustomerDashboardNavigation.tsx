import Box from "@component/Box";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";

const CustomerDashboardNavigation = () => {
  const { pathname } = useRouter();

  return (
    <div>
      <DashboardNavigationWrapper
        px="0px"
        pb="1.5rem"
        mb="1.5rem"
        color="gray.900"
      >
        {linkList.map((item) => (
          <Fragment>
            <Typography
              p="26px 30px 1rem"
              color="text.muted"
              fontSize="12px"
            ></Typography>
            {item.list.map((item) => (
              <StyledDashboardNav
                isCurrentPath={pathname.includes(item.href)}
                href={item.href}
                key={item.title}
                px="1.5rem"
                mb="1.25rem"
              >
                <FlexBox alignItems="center">
                  <Box className="dashboard-nav-icon-holder">
                    <Icon variant="small" defaultcolor="currentColor" mr="10px">
                      {item.iconName}
                    </Icon>
                  </Box>
                  <span>{item.title}</span>
                </FlexBox>
                {/* <span>{item.count}</span> */}
              </StyledDashboardNav>
            ))}
          </Fragment>
        ))}
        <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
          {shopList.map((item) => (
            <Fragment key={item.title}>
              <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
                {item.title}
              </Typography>
              {item.list.map((item) => (
                <StyledDashboardNav
                  isCurrentPath={pathname.includes(item.href)}
                  href={item.href}
                  key={item.title}
                  px="1.5rem"
                  mb="1.25rem"
                >
                  <FlexBox alignItems="center">
                    <Box className="dashboard-nav-icon-holder">
                      <Icon
                        variant="small"
                        defaultcolor="currentColor"
                        mr="10px"
                      >
                        {item.iconName}
                      </Icon>
                    </Box>
                    <span>{item.title}</span>
                  </FlexBox>
                  {/* <span>{item.count}</span> */}
                </StyledDashboardNav>
              ))}
            </Fragment>
          ))}
        </DashboardNavigationWrapper>
      </DashboardNavigationWrapper>
    </div>
  );
};

const linkList = [
  {
    list: [
      {
        href: "/dashboard",
        title: "Dashboard",
        iconName: "board",
      },
      {
        href: "/orders",
        title: "Recent Purchases",
        iconName: "bag",
      },
      // {
      //   href: "/support-tickets",
      //   title: "Chat",
      //   iconName: "customer-service",
      // },
    ],
  },
];

const shopList = [
  {
    title: "My Shop",
    list: [
      {
        href: "/myshop/products",
        title: "Products",
        iconName: "box",
      },
      {
        href: "/myshop/addnew",
        title: "Sell New Product",
        iconName: "upload",
      },
      {
        href: "/myshop/customerorders",
        title: "Customers Orders",
        iconName: "shopping-cart",
      },
      {
        href: "/myshop/account-settings",
        title: "My Shop Setup",
        iconName: "gear-2",
      },
    ],
  },
];
export default CustomerDashboardNavigation;
