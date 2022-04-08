import productDatabase from "@data/product-database";
import React from "react";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Pagination from "../pagination/Pagination";
import ProductCard1 from "../product-cards/ProductCard1";
import { SemiSpan } from "../Typography";

export interface FashionProductsListProps {}

const FashionProductsList: React.FC<FashionProductsListProps> = () => {
  return (
    <div>
      <Grid container spacing={6}>
        {productDatabase.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            <ProductCard1 {...item} />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>Showing Products</SemiSpan>
        <Pagination pageCount={8} />
      </FlexBox>
    </div>
  );
};

export default FashionProductsList;
