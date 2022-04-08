import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

const UserLogin: React.FC = () => {
  const router = useRouter();

  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://backendkwingy.online/api/auth/sellerlogin",
        {
          phonenumber,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        console.log(response.data);
        // Perform localStorage action
        localStorage.setItem(
          "customerAuthToken",
          JSON.stringify(response.data.customerAuthToken)
        );

        // Perform localStorage action
        localStorage.setItem(
          "customerId",
          JSON.stringify(response.data.customerId)
        );
        router.push("/dashboard");
      })

      .catch(function (error) {
        console.log(error.response.data.message);
        setError(error.response.data.message);
      });
  };

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <Link href="/">
        <Button color="primary" bg="primary.light" px="2rem">
          Back to Home
        </Button>
      </Link>
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Hello
        </H3>
        <H3 textAlign="center" mb="0.5rem">
          Welcome To Kwingy
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="0.75rem"
        >
          Log in with Phone & password
        </H5>
        <H5 textAlign="center" color="red" mb="1.2rem">
          {error}
        </H5>
        <TextField
          mb="0.75rem"
          name="email"
          placeholder="+26377111111"
          label="Phone Number"
          type=""
          fullwidth
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <TextField
          mb="1rem"
          name="password"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? "text" : "password"}
          label="Password"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Login
        </Button>

        <Box mb="1rem">
          <FlexBox justifyContent="center" mb="1.25rem">
            <SemiSpan>Don’t have an account yet?</SemiSpan>
            <Link href="/usersignup">
              <a>
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Sign Up Now
                </H6>
              </a>
            </Link>
          </FlexBox>

          <Divider width="200px" mx="auto" />
          <FlexBox justifyContent="center" mt="-14px">
            <Span color="text.muted" bg="body.paper" px="1rem">
              or
            </Span>
          </FlexBox>
        </Box>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Forgot your password?</SemiSpan>
        <Link href="/">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Recover
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

export default UserLogin;
