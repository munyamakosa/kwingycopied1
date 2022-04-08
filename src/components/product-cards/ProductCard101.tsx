import ProductIntro from "@component/products/ProductIntro";
import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Col, Container, Row } from "react-grid-system";
import { CSSProperties } from "styled-components";
import Box from "../Box";
import Button from "../buttons/Button";
import Card, { CardProps } from "../Card";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Modal from "../modal/Modal";
import Rating from "../rating/Rating";
import { H3, SemiSpan } from "../Typography";

export interface ProductCard1Props extends CardProps {
  className?: string;
  style?: CSSProperties;
  imgUrl?: string;
  title?: string;
  price?: number;
  off?: number;
  description?: string;
  rating?: number;
  id?: string | number;
  // className?: string;
  // style?: CSSProperties;
  // imgUrl: string;
  // title: string;
  // price: number;
  // off: number;
  // rating?: number;
  // subcategories?: Array<{
  //   title: string;
  //   url: string;
  // }>;
}

const ProductCard1: React.FC<ProductCard1Props> = ({
  id,
  imgUrl,
  title,
  description,
  price,
  off,
  rating,
}) => {
  const [open, setOpen] = useState(false);

  const { state, dispatch } = useAppContext();
  const cartItem: CartItem = state.cart.cartList.find((item) => item.id === id);

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          name: title,
          qty: amount,
          price,
          imgUrl,
          id,
        },
      });
    },
    []
  );

  return (
    <div>
      <Container>
        <Row>
          <Col lg={6} sm={12}>
            <div className="image-holder">
              <Link href={`/product/q?product=${id}`}>
                <a>
                  <Image
                    src={imgUrl}
                    layout="responsive"
                    alt={title}
                    width={10000}
                    height={10000}
                  />
                </a>
              </Link>
            </div>
          </Col>

          <Col lg={6} sm={12}>
            <div className="details">
              <FlexBox>
                <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
                  <Link href={`/product/q?product=${id}`}>
                    <a>
                      <H3
                        className="title"
                        fontSize="24px"
                        textAlign="left"
                        fontWeight="800"
                        color="text.secondary"
                        mb="10px"
                        mt="90px"
                        title={title}
                      >
                        {title}
                      </H3>
                    </a>
                  </Link>
                  <Rating value={rating || 0} outof={5} color="warn" readonly />

                  <FlexBox alignItems="center" mt="10px">
                    <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                      ${price.toFixed(2)}
                    </SemiSpan>
                    {!!off && (
                      <SemiSpan color="text.muted" fontWeight="600">
                        <del>{off?.toFixed(2)}</del>
                      </SemiSpan>
                    )}
                  </FlexBox>

                  <H3
                    className="title"
                    fontSize="26px"
                    textAlign="left"
                    fontWeight="500"
                    color="text.secondary"
                    mb="20px"
                    mt="20px"
                    description={description}
                  >
                    {description}
                  </H3>
                  <Button
                    mb="1.65rem"
                    variant="contained"
                    color="primary"
                    onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
                  >
                    Add to Cart
                    <Button
                      onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
                    >
                      <Icon variant="small">plus</Icon>
                    </Button>
                  </Button>
                </Box>
              </FlexBox>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal open={open} onClose={toggleDialog}>
        <Card p="1rem" position="relative">
          <ProductIntro imgUrl={[imgUrl]} title={title} price={price} id={id} />
          <Box
            position="absolute"
            top="0.75rem"
            right="0.75rem"
            cursor="pointer"
          >
            <Icon
              className="close"
              color="primary"
              variant="small"
              onClick={toggleDialog}
            >
              close
            </Icon>
          </Box>
        </Card>
      </Modal>
    </div>
  );
};

ProductCard1.defaultProps = {
  imgUrl: "/assets/images/products/defaultproductimage.png",
};

export default ProductCard1;
