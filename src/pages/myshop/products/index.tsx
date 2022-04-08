import IconButton from "@component/buttons/IconButton";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Products = () => {
  const router = useRouter();

  const [sellerProducts, setsellerProducts] = useState([]);

  if (typeof window !== "undefined") {
    // Perform localStorage action
    var token = JSON.parse(localStorage.getItem("customerAuthToken") as string);
    var customerId = JSON.parse(localStorage.getItem("customerId") as string);

    if (!token) {
      // navigate("/login");
      router.push("/sellerlogin");
    }
  }

  useEffect(() => {
    const api =
      "https://backendkwingy.online/api/products/filter?createdby=" +
      customerId;

    axios.get(api, { headers: { adminAuthToken: token } }).then((res) => {
      setsellerProducts(res.data.filteredProducts);
      console.log(sellerProducts);
    });
  });

  return (
    <div>
      <DashboardPageHeader title="Your Products" iconName="delivery-box" />
      <Hidden down={769}>
        <TableRow padding="0px 18px" mb="-0.125rem" boxShadow="none" bg="none">
          <FlexBox my="0px" mx="6px" flex="2 2 220px !important">
            <H5 ml="18px" color="text.muted" textAlign="left">
              Name
            </H5>
          </FlexBox>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Brand
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Stock
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            New price
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Old Price
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {sellerProducts.map((filteredProducts, _id) => (
        <Link href="/myshop/products/edit" key={_id}>
          <TableRow
            as="a"
            href="/myshop/products/edit"
            my="1rem"
            padding="6px 18px"
          >
            <FlexBox alignItems="center" m="6px" flex="2 2 220px !important">
              {/* <Avatar src="/assets/images/products/imageshoes.png" size={36} /> */}
              <Typography textAlign="left" ml="20px">
                {filteredProducts.title}
              </Typography>
            </FlexBox>
            <H5 m="6px" textAlign="left" fontWeight="400">
              {filteredProducts.brand}
            </H5>
            <H5 m="6px" textAlign="left" fontWeight="600">
              {filteredProducts.quantity.toString().padStart(2, "0")}
            </H5>
            <H5 m="6px" textAlign="left" fontWeight="400">
              ${filteredProducts.price.toFixed(2)}
            </H5>
            <H5 m="6px" textAlign="left" fontWeight="400">
              ${filteredProducts.oldprice.toFixed(2)}
            </H5>

            <Hidden flex="0 0 0 !important" down={769}>
              <Typography textAlign="center" color="text.muted">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton>
              </Typography>
            </Hidden>
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

Products.layout = DashboardLayout;

export default Products;
