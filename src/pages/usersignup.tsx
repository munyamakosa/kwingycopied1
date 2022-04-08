import React from "react";
import FlexBox from "../components/FlexBox";
import UserSignup from "../components/sessions/UserSignup";

const SignUpPage = () => {
  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <UserSignup />
    </FlexBox>
  );
};

export default SignUpPage;
