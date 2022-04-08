import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";

const Section11: React.FC = () => {
  const [productsList, setproductsList] = useState([]);

  useEffect(() => {
    // get products from DB
    var config: AxiosRequestConfig = {
      method: "get",
      url: "https://backendkwingy.online/api/products/filter?category=fashion",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setproductsList(response.data.filteredProducts);
      })
      .catch(function (error) {
        console.log(error);
      });
  });

  return (
    <Container mb="70px">
      <CategorySectionHeader title="Latest Products" seeMoreLink="#" />
      <Grid container spacing={6}>
        {productsList.map((item, ind) => (
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
