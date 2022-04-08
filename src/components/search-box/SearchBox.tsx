import Card from "@component/Card";
import { Span } from "@component/Typography";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import Box from "../Box";
import Icon from "../icon/Icon";
import MenuItem from "../MenuItem";
import TextField from "../text-field/TextField";
import StyledSearchBox from "./SearchBoxStyle";

export interface SearchBoxProps {}

const SearchBox: React.FC<SearchBoxProps> = () => {
  const [resultList, setResultList] = useState([]);

  const [searchText, setsearchText] = useState("");

  const handleSearch = useCallback((event) => {
    event.persist();
    setsearchText(event.target.value);
  }, []);

  const handleDocumentClick = () => {
    setResultList([]);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>
        <TextField
          className="search-field"
          placeholder="Search and hit enter..."
          fullwidth
          onChange={handleSearch}
        />
        {/* <button type="submit">
          <Link href={`/product/search/q?search=${searchText}`}>
            <a>Search</a>
          </Link>
        </button> */}
        <Button
          className="button-link"
          variant="contained"
          color="primary"
          p="1rem 1.5rem"
        >
          <Link href={`/product/search/q?search=${searchText}`}>
            <a>Search</a>
          </Link>
        </Button>
      </StyledSearchBox>

      {!!resultList.length && (
        <Card
          position="absolute"
          top="100%"
          py="0.5rem"
          width="100%"
          boxShadow="large"
          zIndex={99}
        >
          {resultList.map((item) => (
            <Link href={`/product/search/${item}`} key={item}>
              <MenuItem key={item}>
                <Span fontSize="14px">{item}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default SearchBox;
