import productDatabase from "@data/product-database";
import NextImage from "next/image";
import React, { useEffect, useState } from "react";
import Box from "../Box";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Hidden from "../hidden/Hidden";
import ProductCard1 from "../product-cards/ProductCard1";
import Typography from "../Typography";
import StyledProductCategory from "./ProductCategoryStyle";

const Section7: React.FC = () => {
  const [type, setType] = useState("brands");
  const [selected, setSelected] = useState("");
  const [list, setList] = useState([]);

  const handleCategoryClick = (brand) => {
    if (selected.match(brand)) {
      setSelected("");
    } else setSelected(brand);
  };

  useEffect(() => {
    if (type === "brands") setList(brandList);
  }, [type]);

  return (
    <Container mb="70px">
      <FlexBox>
        <Hidden down={768} mr="1.75rem">
          <Box shadow={6} borderRadius={10} padding="1.25rem" bg="white">
            <FlexBox mt="-0.5rem" mb="0.5rem">
              <Typography
                fontWeight="600"
                fontSize="20px"
                padding="0.5rem 1rem"
                style={{ cursor: "pointer" }}
                color={type === "brands" ? "gray.900" : "gray.600"}
                onClick={() => setType("brands")}
              >
                Categories
              </Typography>
              <Typography
                fontWeight="600"
                fontSize="20px"
                paddingTop="0.5rem"
                lineHeight="1.3"
                color="gray.400"
              ></Typography>
            </FlexBox>

            {list.map((brand, ind) => (
              <StyledProductCategory
                key={brand}
                mb="0.75rem"
                bg={selected.match(brand) ? "white" : "gray.100"}
                shadow={selected.match(brand) ? 4 : null}
                onClick={() => handleCategoryClick(brand)}
              >
                <NextImage
                  height={20}
                  width={20}
                  objectFit="contain"
                  alt={brand}
                  src={`/assets/images/logos/${ind % 2 === 0 ? "v" : "u"}.png`}
                />
                <span className="product-category-title">{brand}</span>
              </StyledProductCategory>
            ))}

            <StyledProductCategory
              mt="4rem"
              bg={selected.match(`all-${type}`) ? "white" : "gray.100"}
              shadow={selected.match(`all-${type}`) ? 4 : null}
              onClick={() => handleCategoryClick(`all-${type}`)}
            >
              <span className="product-category-title show-all">
                View All {type}
              </span>
            </StyledProductCategory>
          </Box>
        </Hidden>

        <Box flex="1 1 0" minWidth="0px">
          <CategorySectionHeader
            title="Browse By Category"
            seeMoreLink="/shop"
          />

          <Grid container spacing={6}>
            {productDatabase.slice(81, 90).map((item, ind) => (
              <Grid item lg={4} sm={6} xs={12} key={ind}>
                <ProductCard1 price={23} off={25} hoverEffect {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FlexBox>
    </Container>
  );
};

const brandList = [
  "Fashion and Clothing",
  "Computers and Electronics",
  "Home, Kitchen and Garden",
  "Gifts and Presents",
  "Music and Accessories",
  "Health and Beauty",
  "Pets",
  "Babies and Toys",
  "Automative and Spare Parts",
  "Office and Stationery",
  "Liquor and Alcohol",
];

export default Section7;
