import Box from "@component/Box";
import Card from "@component/Card";
import Carousel from "@component/carousel/Carousel";
import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import { H4 } from "@component/Typography";
import useWindowSize from "@hook/useWindowSize";
import axios, { AxiosRequestConfig } from "axios";
import NextImage from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";

const Section13: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();

  const [productsList, setproductsList] = useState([]);

  useEffect(() => {
    if (width < 370) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(4);
    else setVisibleSlides(6);

    // get products from DB
    var config: AxiosRequestConfig = {
      method: "get",
      url: "https://backendkwingy.online/api/products",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setproductsList(response.data.allProducts);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [width]);

  const productsLists = productsList.sort(() => Math.random() - Math.random());

  return (
    <CategorySectionCreator
      iconName="gift"
      title="Big Discounts"
      seeMoreLink="#"
    >
      <Box my="-0.25rem">
        <Carousel totalSlides={9} visibleSlides={visibleSlides}>
          {productsLists.slice(4, 12).map((item) => (
            <Box py="0.25rem" key={item.id}>
              <Card p="1rem">
                <Link href={"/product/q?product=" + item._id}>
                  <a>
                    <HoverBox borderRadius={8} mb="0.5rem">
                      <NextImage
                        src={item.mainimage}
                        width={100}
                        height={100}
                        layout="responsive"
                        alt={item.title}
                      />
                    </HoverBox>
                    <H4 fontWeight="600" fontSize="14px" mb="0.25rem">
                      {item.title}
                    </H4>

                    <FlexBox>
                      <H4
                        fontWeight="600"
                        fontSize="14px"
                        color="primary.main"
                        mr="0.5rem"
                      >
                        ${Math.ceil(item.price).toLocaleString()}
                      </H4>

                      <H4 fontWeight="600" fontSize="14px" color="text.muted">
                        <del>${Math.ceil(item.oldprice).toLocaleString()}</del>
                      </H4>
                    </FlexBox>
                  </a>
                </Link>
              </Card>
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default Section13;
