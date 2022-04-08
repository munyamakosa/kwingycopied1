import React from "react";
import FlexBox from "../components/FlexBox";
import SellerLogin from "../components/sessions/SellerLogin";

const LoginPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <SellerLogin />
    </FlexBox>
  );
};

export default LoginPage;
