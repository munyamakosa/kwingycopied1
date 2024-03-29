import productDatabase from "@data/product-database";
import NextImage from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Card from "../Card";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import Typography from "../Typography";

const StyledImage = styled(NextImage)`
  border-radius: 8px;
`;

const Section10: React.FC = () => {
  return (
    <Container mb="70px">
      <CategorySectionHeader
        title="Latest Categories"
        iconName="categories"
        seeMoreLink="#"
      />

      <Grid container spacing={6}>
        {categoryList.map((item, ind) => (
          <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
            <Link href="/">
              <a>
                <Card
                  display="flex"
                  alignItems="center"
                  p="0.75rem"
                  boxShadow="small"
                  borderRadius={8}
                  hoverEffect
                >
                  <StyledImage
                    src={productDatabase[ind * 13 + 100].imgUrl}
                    alt="fashion"
                    height="52px"
                    width="52px"
                    objectFit="contain"
                  />
                  <Typography fontWeight="600" fontSize="14px" ml="10px">
                    {item}
                  </Typography>
                </Card>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const categoryList = [
  "Computers and Electronics",
  "Automatives and Spare Parts",
  "Fashion and Clothes",
  "Gifts and Presents",
  "Health and Beauty",
  "Home, Kitchen and Garden",
];

export default Section10;
