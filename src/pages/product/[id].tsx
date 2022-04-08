import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductReview from "@component/products/ProductReview";
import { H5 } from "@component/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import renderHTML from "react-render-html";
import Grid from "../../components/grid/Grid";
import ProductCard1 from "../../components/product-cards/ProductCard101";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);

  const [longdescription, setLongDescription] = useState("");
  console.log(longdescription);

  if (typeof window !== "undefined") {
    const queryParams = new URLSearchParams(window.location.search);
    var productId = queryParams.get("product");
  }

  useEffect(() => {
    const api =
      "https://backendkwingy.online/api/products/filter?_id=" + productId;

    axios.get(api).then((res) => {
      setProduct(res.data.filteredProducts);
      setLongDescription(res.data.filteredProducts[0].longdescription);
    });
  });

  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => {
    setSelectedOption(opt);
  };

  return (
    <div>
      <Grid container spacing={6} lg={4} md={4} sm={6} xs={12}>
        {product.map((item, ind) => (
          <Grid item lg={12} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1
              id={item._id}
              imgUrl={item.mainimage}
              title={item.title}
              rating={4}
              price={item.price}
              description={item.description}
              off={item.oldprice}
              key={item._id}
              hoverEffect
              {...item}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H5
          className="cursor-pointer"
          mr="25px"
          p="4px 10px"
          color={
            selectedOption === "description" ? "primary.main" : "text.muted"
          }
          borderBottom={selectedOption === "description" && "2px solid"}
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
        >
          Description
        </H5>
        <H5
          className="cursor-pointer"
          p="4px 10px"
          color={selectedOption === "review" ? "primary.main" : "text.muted"}
          onClick={handleOptionClick("review")}
          borderBottom={selectedOption === "review" && "2px solid"}
          borderColor="primary.main"
        >
          Review (3)
        </H5>
      </FlexBox>
      <Box mb="50px">
        {selectedOption === "description" && (
          <div>{renderHTML(longdescription)}</div>
        )}
        {selectedOption === "review" && <ProductReview />}
      </Box>
    </div>
  );
};

ProductDetails.layout = NavbarLayout;

export default ProductDetails;
