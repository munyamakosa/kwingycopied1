import axios from "axios";
import React, { useEffect, useState } from "react";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";

const Section11: React.FC = () => {
  const [searchResults, setsearchResults] = useState([]);

  if (typeof window !== "undefined") {
    const queryParams = new URLSearchParams(window.location.search);
    var searchtext = queryParams.get("search");
  }

  useEffect(() => {
    axios
      .post(
        "https://backendkwingy.online/api/products/search",
        {
          searchtext,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        setsearchResults(response.data);
      });
  });

  return (
    <Container mb="70px">
      <CategorySectionHeader title={searchtext} seeMoreLink="#" />
      <Grid container spacing={6}>
        {searchResults.map((item, ind) => (
          <Grid item lg={4} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1
              id={item._id}
              imgUrl={item.mainimage}
              title={item.title}
              rating={4}
              price={item.price}
              off={item.oldprice}
              key={item._id}
              hoverEffect
              {...item}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section11;
