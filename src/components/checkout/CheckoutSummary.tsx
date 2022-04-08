import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import React from "react";
import { Card1 } from "../Card1";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Typography from "../Typography";

const CheckoutSummary: React.FC = () => {
  const { state } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList;

  const getTotalPrice = () => {
    return (
      cartList.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      ) || 0
    );
  };

  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            ${getTotalPrice().toFixed(2)}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        mb="0.5rem"
      ></FlexBox>

      <Divider mb="1rem" />

      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint"></Typography>
        <FlexBox alignItems="flex-end">
          <Typography
            fontSize="25px"
            fontWeight="600"
            lineHeight="1"
            textAlign="right"
            mb="1.5rem"
          >
            ${getTotalPrice().toFixed(2)}
          </Typography>
        </FlexBox>
      </FlexBox>
    </Card1>
  );
};

export default CheckoutSummary;
