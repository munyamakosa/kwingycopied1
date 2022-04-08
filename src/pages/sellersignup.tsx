import React from "react";
import FlexBox from "../components/FlexBox";
import SellerSignup from "../components/sessions/SellerSignup";

const SignUpPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <SellerSignup />
    </FlexBox>
  );
};

export default SignUpPage;
