import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Box from "../Box";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import CheckBox from "../CheckBox";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan, Span } from "../Typography";
import { StyledSessionCard } from "./SessionStyle";

const UserSignup: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  if (typeof window !== "undefined") {
    // Perform localStorage action
    const token = localStorage.getItem("customerAuthToken");
    if (token) {
      // navigate("/login");
      router.push("/dashboard");
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://backendkwingy.online/api/auth/sellerregister",
        {
          firstname,
          surname,
          phonenumber,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        console.log(response.data.customerAuthToken);
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
      <form className="content" onSubmit={handleFormSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Create Your Account
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="0.55rem"
        >
          Please fill all forms to signup
        </H5>

        <H5 textAlign="center" color="red" mb="0.5rem">
          {error}
        </H5>

        <TextField
          mb="0.75rem"
          name="firstname"
          label="Firstname"
          placeholder="Your Firstname"
          fullwidth
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />

        <TextField
          mb="0.75rem"
          name="surname"
          label="Surname"
          placeholder="Surname"
          fullwidth
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <TextField
          mb="0.75rem"
          name="phonenumber"
          placeholder="eg 0773468496"
          label="customer Phone Number"
          fullwidth
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
        />

        <TextField
          mb="0.75rem"
          name="password"
          placeholder="*********"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <TextField
          mb="1rem"
          name="re_password"
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          label="Confirm Password"
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
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password || ""}
          errorText={touched.re_password && errors.re_password}
        /> */}

        <CheckBox
          mb="1.75rem"
          name="agreement"
          color="secondary"
          label={
            <FlexBox>
              <SemiSpan>By signing up, you agree to</SemiSpan>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Terms & Condtion
                </H6>
              </a>
            </FlexBox>
          }
        />

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Create Account
        </Button>

        <Box mb="1rem">
          <Divider width="200px" mx="auto" />
          <FlexBox justifyContent="center" mt="-14px">
            <Span color="text.muted" bg="body.paper" px="1rem">
              on
            </Span>
          </FlexBox>
        </Box>
      </form>
      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Already have account?</SemiSpan>
        <Link href="/userlogin">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Log in
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

export default UserSignup;
