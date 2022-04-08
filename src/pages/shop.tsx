import productDatabase from "@data/product-database";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import FlexBox from "../components/FlexBox";
import Grid from "../components/grid/Grid";
import SaleLayout2 from "../components/layout/SaleLayout2";
import Pagination from "../components/pagination/Pagination";
import ProductCard1 from "../components/product-cards/ProductCard1";
import { SemiSpan } from "../components/Typography";

const SalePage2 = () => {
  const productPerPage = 28;
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(0);

  const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
  };

  useEffect(() => {
    // get products from DB
    var config: AxiosRequestConfig = {
      method: "get",
      url: "https://backendkwingy.online/api/products/filter?category=automativeandspareparts",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setProductList(response.data.filteredProducts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [page]);

  const renderProductCount = () => {
    let startNumber = page * productPerPage;
    let endNumber = (page + 1) * productPerPage;
    let totalProduct = productDatabase.length;

    if (endNumber > totalProduct) endNumber = totalProduct;

    return `Showing ${
      startNumber + 1
    }-${endNumber} of ${totalProduct} products`;
  };

  return (
    <Container mt="2rem">
      <h3>HALALAL</h3>
      <Grid container spacing={6}>
        {productList.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1
              id={item._id}
              imgUrl={item.mainimage}
              title={item.title}
              rating={4}
              price={item.price}
              off={item.oldprice}
              key={item._id}
              hoverEffect
              {...item}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        my="4rem"
      >
        <SemiSpan>{renderProductCount()}</SemiSpan>
        <Pagination
          pageCount={Math.ceil(productDatabase.length / productPerPage)}
          onChange={handlePageChange}
        />
      </FlexBox>
    </Container>
  );
};

SalePage2.layout = SaleLayout2;

export default SalePage2;
