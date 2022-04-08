import React from "react";
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import Typography from "../Typography";

const Footer: React.FC = () => {
  return (
    <footer>
      <Box bg="#0F3460">
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={3} md={6} sm={6} xs={12}>
                <Typography
                  fontSize="25px"
                  fontWeight="600"
                  mb="1.25rem"
                  lineHeight="1"
                >
                  Contact Us
                </Typography>
                <Typography py="0.3rem" color="gray.500">
                  171 King George Rd,Harare, Zimbabwe
                </Typography>
                <Typography py="0.3rem" color="gray.500">
                  Email: buy@kwingy.com
                </Typography>
                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Phone: +263712069958
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={item.iconName}
                    >
                      <Box
                        m="5px"
                        size="small"
                        p="10px"
                        bg="rgba(0,0,0,0.2)"
                        borderRadius="50%"
                      >
                        <Icon size="12px" defaultcolor="auto">
                          {item.iconName}
                        </Icon>
                      </Box>
                    </a>
                  ))}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const iconList = [
  { iconName: "facebook", url: "https://www.facebook.com/ShopKwingy" },
  { iconName: "twitter", url: "https://twitter.com/ShopKwingy" },
  {
    iconName: "youtube",
    url: "https://www.youtube.com/channel/UCS6GhDmhV8nP5iOHyFsWpEg",
  },
  {
    iconName: "google",
    url: "https://www.google.com/search?q=kwingy&rlz=1C1GCEA_enZW978ZW978&oq=kwingy+&aqs=chrome.0.69i59l2j69i60l6.1902j0j7&sourceid=chrome&ie=UTF-8",
  },
  { iconName: "instagram", url: "https://www.instagram.com/kwingy_/" },
];

export default Footer;
