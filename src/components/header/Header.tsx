import IconButton from "@component/buttons/IconButton";
import Image from "@component/Image";
import { useAppContext } from "@context/app/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import Box from "../Box";
import Categories from "../categories/Categories";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import MiniCart from "../mini-cart/MiniCart";
import SearchBox from "../search-box/SearchBox";
import UserLogin from "../sessions/UserLogin";
import Sidenav from "../sidenav/Sidenav";
import { Tiny } from "../Typography";
import StyledHeader from "./HeaderStyle";
import UserLoginDialog from "./UserLoginDialog";

type HeaderProps = {
  isFixed?: boolean;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ isFixed, className }) => {
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const { state } = useAppContext();
  const { cartList } = state.cart;
  const [loggedin, setloggedin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      var token = JSON.parse(
        localStorage.getItem("customerAuthToken") as string
      );
      if (!token) {
        setloggedin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      localStorage.removeItem("customerId");
      localStorage.removeItem("customerAuthToken");
      router.push("/userlogin");
    }
  };
  const cartHandle = (
    <FlexBox ml="20px" alignItems="flex-start">
      <IconButton bg="gray.200" p="12px">
        <i>
          <FiShoppingCart />
        </i>
      </IconButton>

      {!!cartList.length && (
        <FlexBox
          borderRadius="300px"
          bg="error.main"
          px="5px"
          py="2px"
          alignItems="center"
          justifyContent="center"
          ml="-1rem"
          mt="-9px"
        >
          <Tiny color="white" fontWeight="600">
            {cartList.length}
          </Tiny>
        </FlexBox>
      )}
    </FlexBox>
  );

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              <Image
                className="logoImage"
                src="/assets/images/logo.png"
                alt="logo"
              />
            </a>
          </Link>

          {isFixed && (
            <div className="category-holder">
              <Categories>
                <FlexBox color="text.hint" alignItems="center" ml="1rem">
                  <Icon>categories</Icon>
                  <Icon>arrow-down-filled</Icon>
                </FlexBox>
              </Categories>
            </div>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchBox />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {loggedin && (
            <UserLoginDialog
              handle={
                <IconButton ml="1rem" bg="gray.200" p="8px">
                  <Icon size="28px">user</Icon>
                </IconButton>
              }
            >
              <Box>
                <UserLogin />
              </Box>
            </UserLoginDialog>
          )}
          {!loggedin && (
            <IconButton ml="1rem" bg="gray.200" p="8px" onClick={handleLogout}>
              <i>
                <FiLogOut />
              </i>
            </IconButton>
          )}

          <Sidenav
            handle={cartHandle}
            position="right"
            open={open}
            width={380}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
