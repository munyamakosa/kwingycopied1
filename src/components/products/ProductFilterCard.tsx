import React from "react";
import Card from "../Card";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import TextField from "../text-field/TextField";
import { H5, H6 } from "../Typography";

const ProductFilterCard = () => {
  return (
    <Card p="18px 27px" elevation={5}>
      <H6 mb="10px">Filter</H6>

      <Divider mt="18px" mb="24px" />

      <H6 mb="16px">Price Range</H6>
      <FlexBox justifyContent="space-between" alignItems="center">
        <TextField placeholder="0" type="number" fullwidth />
        <H5 color="text.muted" px="0.5rem">
          -
        </H5>
        <TextField placeholder="250" type="number" fullwidth />
      </FlexBox>
    </Card>
  );
};

export default ProductFilterCard;
