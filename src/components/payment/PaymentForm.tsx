import Link from "next/link";
import React, { Fragment, useState } from "react";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import Grid from "../grid/Grid";
import Radio from "../radio/Radio";
import Typography from "../Typography";

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  // const handleFormSubmit = async (values) => {
  //   console.log(values);
  //   router.push("/payment");
  // };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Card1 mb="2rem">
        {/* <Radio
          name="paypal"
          mb="1.5rem"
          color="secondary"
          checked={paymentMethod === "paypal"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Pay with Paypal
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        />
        <Divider mb="1.5rem" mx="-2rem" /> */}

        {/* {paymentMethod === "paypal" && (
          <Fragment>
            <FlexBox alignItems="flex-end" mb="30px">
              <TextField
                name="email"
                label="Paypal Email"
                type="email"
                mr={isMobile ? "1rem" : "30px"}
                fullwidth
              />
              <Button variant="outlined" color="primary" type="button">
                Submit
              </Button>
            </FlexBox>

            <Divider mb="1.5rem" mx="-2rem" />
          </Fragment>
        )} */}

        <Radio
          name="cod"
          color="secondary"
          checked={paymentMethod === "cod"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Cash On Delivery
            </Typography>
          }
          onChange={handlePaymentMethodChange}
        />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Link href="/orders">
            <Button variant="contained" color="primary" type="submit" fullwidth>
              Reviews
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PaymentForm;
