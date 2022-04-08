import Box from "@component/Box";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Carousel from "../carousel/Carousel";
import CategorySectionCreator from "../CategorySectionCreator";
import ProductCard1 from "../product-cards/ProductCard1";

const Section2: React.FC = () => {
  const [visibleSlides, setVisibleSlides] = useState(4);
  const width = useWindowSize();
  const [productsList, setproductsList] = useState([]);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);

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
      iconName="light"
      title="Trending Products"
      seeMoreLink="#"
    >
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel totalSlides={10} visibleSlides={visibleSlides}>
          {productsLists.slice(1, 13).map((item, ind) => (
            <Box py="0.25rem" key={ind}>
              <ProductCard1
                id={item._id}
                imgUrl={item.mainimage}
                title={item.title}
                rating={4}
                price={item.price}
                off={item.oldprice}
                key={item._id}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default Section2;
