import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import CheckBox from "../CheckBox";
import Grid from "../grid/Grid";
import TextField from "../text-field/TextField";
import Typography from "../Typography";

const CheckoutForm = () => {
  const router = useRouter();

  const { state } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList;

  const ordersList = cartList;

  console.log(ordersList);
  const [fullname, setFullname] = useState("");
  const [deliveryaddress, setDeliveryAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [whatsappphonenumber, setWhatsappphonenumber] = useState("");
  const [deliverykms, setDeliverykms] = useState("");
  const [deliverylocation, setDeliverylocation] = useState("");

  const charge = Number(0.2) * Number(deliverykms);
  const deliveryfee = Math.ceil(charge);
  console.log(deliveryfee);

  if (typeof window !== "undefined") {
    // Perform localStorage action
    var token = JSON.parse(localStorage.getItem("customerAuthToken") as string);
    if (!token) {
      // navigate("/login");
      router.push("/userlogin");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://backendkwingy.online/api/products/neworder",
        {
          ordersList,
          fullname,
          deliveryaddress,
          deliveryfee,
          deliverylocation,
          phonenumber,
          whatsappphonenumber,
        },
        { headers: { adminAuthToken: token } }
      )
      .then(function (response) {
        console.log(response.data);
        // Perform localStorage action
        router.push("/orders");
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card1 mb="2rem">
        <Typography fontWeight="600" mb="1rem">
          Delivery Details
        </Typography>

        <Grid container spacing={7}>
          <Grid item sm={6} xs={12}>
            <TextField
              name="fullname"
              label="Full Name"
              fullwidth
              mb="1rem"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />

            <TextField
              name="phonenumber"
              label="Phone Number"
              fullwidth
              mb="1rem"
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <p>Delivery Feee Is Charged Depending on your location!</p>
            <select onChange={(e) => setDeliverykms(e.target.value)}>
              <option>Choose Delivery Location</option>
              <option value="13.8">Adylinn Park</option>

              <option value="7.8">Alexandra Park</option>

              <option value="26">Amby</option>
              <option value="15.8">Arcadia</option>
              <option value="23.4">Ardbennie</option>

              <option value="32">Arlington</option>
              <option value="6.4">Arundel</option>

              <option value="6.8">Ashbrittle</option>
              <option value="32">Aspindale</option>

              <option value="10.4">Avenues</option>
              <option value="9.8">Avonlea</option>

              <option value="17.8">Ballantyne Park</option>
              <option value="5.4">Belgravia</option>

              <option value="12.2">Belvedere north</option>
              <option value="13.4">Belvedere south</option>
              <option value="49.2">Beverly West</option>
              <option value="12.2">Bluffhill</option>

              <option value="35.2">Borrowdale</option>
              <option value="13.4">Borrowdale west</option>

              <option value="9.4">Bromley</option>

              <option value="58">Budiriro 1</option>

              <option value="44">Budiriro 2</option>

              <option value="46">Budiriro 3</option>

              <option value="52.6">Budiriro 4</option>

              <option value="50">Budiriro 5</option>

              <option value="11.4">Carrick creagh</option>

              <option value="28">Chadcombe</option>

              <option value="32">Chikurubi</option>
              <option value="32.4">Chiremba Park</option>

              <option value="26">Chisipite</option>

              <option value="30">Cold comfort</option>

              <option value="29.6">Cold comfort</option>
              <option value="28">Coronation Park</option>

              <option value="12">Cotswold Hills</option>
              <option value="26">Cranborne</option>
              <option value="26">Criston Bank</option>
              <option value="26">Crowborough</option>
              <option value="34">Crowhill</option>

              <option value="58">Damafalls</option>

              <option value="28">Dawnview</option>
              <option value="58">Domboshava Mverechena</option>

              <option value="12.6">Donation</option>
              <option value="40">Donnybrook</option>
              <option value="30.4">Dzivarasekwa</option>

              <option value="32">Dzivarasekwa 1</option>
              <option value="34">Dzivarasekwa 2</option>
              <option value="36">Dzivarasekwa 3</option>

              <option value="32">Dzivarasekwa 5</option>
              <option value="36">Dzivarasekwa Extension</option>

              <option value="16.4">Eastlea</option>
              <option value="16.4">Eastlea North</option>
              <option value="19.6">Eastlea South</option>

              <option value="65.8">Eastview</option>
              <option value="4.2">Emerald Hill</option>
              <option value="44">Epworth</option>
              <option value="52">Fidelity life park</option>

              <option value="41.6">Fidelity life Park Manresa</option>
              <option value="39.4">Fidelity life Park Southview</option>
              <option value="30">Gevstein Park</option>
              <option value="38">Glaudina</option>
              <option value="34">Glen Lorne</option>

              <option value="42">Glen Norah A</option>
              <option value="29">Glen Norah B</option>
              <option value="37">Glen Norah C</option>
              <option value="39.4">Glen View 1</option>
              <option value="40">Glen View 2</option>
              <option value="40">Glen View 4</option>
              <option value="38">Glen View 5</option>

              <option value="52">Glen View 6</option>
              <option value="48">Glen View 7</option>
              <option value="47">Glen View 8</option>
              <option value="49.2">Glenforest</option>
              <option value="34.5">Glenwood</option>

              <option value="22">Good Hope</option>
              <option value="34">Grange</option>
              <option value="17.6">Graniteside</option>
              <option value="7">Greencroft</option>

              <option value="8">Greendale</option>
              <option value="27.6">GreenGrove</option>
              <option value="12">Greenwood Park</option>
              <option value="32">Greystone Park</option>
              <option value="11">Gunhill</option>
              <option value="12.2">Haig Park</option>
              <option value="36">Hatcliffe</option>

              <option value="32">Hatfield</option>
              <option value="40">Helensvale</option>
              <option value="32">Highfield</option>
              <option value="18.2">Highlands</option>
              <option value="20">Hillside</option>

              <option value="40">Hogerty Hill</option>
              <option value="38">Hopley</option>
              <option value="26">Kambanje</option>
              <option value="26">Kambuzuma</option>
              <option value="5.2">Kensington</option>

              <option value="6.6">Kingfisher Park</option>
              <option value="30.8">Kuwadzana 1</option>
              <option value="31.5">Kuwadzana 2</option>
              <option value="32">Kuwadzana 3</option>
              <option value="34.5">Kuwadzana 4</option>
              <option value="36.2">Kuwadzana 5</option>

              <option value="36">Kuwadzana 6</option>
              <option value="38">Kuwadzana 7</option>
              <option value="42.2">Kuwadzana Extension</option>
              <option value="26">Letombo Park</option>
              <option value="22">Lewisam</option>
              <option value="30">Lichendale</option>
              <option value="4.2">Lincoln green</option>

              <option value="30">Lochinvar</option>
              <option value="28">Logan park</option>
              <option value="11.2">Mabelreign</option>
              <option value="60">Mabvazuva Estates</option>
              <option value="50">Mabvuku</option>
              <option value="30">Machipisa</option>
              <option value="22">Madokero Estates</option>

              <option value="30">Mandara</option>
              <option value="44">Mandresa</option>
              <option value="38">Manresa Park</option>
              <option value="56">Manyame</option>
              <option value="40">Marimba Park</option>

              <option value="14.6">Marlborough</option>
              <option value="34.2">Matidoda</option>
              <option value="18.6">Mbare</option>
              <option value="38">Mbare west</option>
              <option value="11.8">Meyrick Park</option>
              <option value="7">Milton Park</option>
              <option value="7">Milton park</option>
              <option value="9.4">Monavale</option>
              <option value="12.6">Morris Depot</option>
              <option value="7">Mount Pleasant</option>
              <option value="16.2">Mount Pleasant Heights</option>
              <option value="28">Msasa</option>
              <option value="32">Msasa Park</option>
              <option value="32">Msasa Park Extension</option>
              <option value="42">Mufakose</option>
              <option value="45">Mufakose Mhishi</option>
              <option value="56">New Zengeza 3</option>
              <option value="16">Newlands</option>
              <option value="11.2">Northwood</option>
              <option value="58">Nyatsime</option>

              <option value="28">Parktown</option>
              <option value="34">Philadelphia</option>
              <option value="28">Pomona</option>
              <option value="26">Queensdale</option>
              <option value="32">Qunnington</option>
              <option value="24">Rhodesville</option>

              <option value="15.6">Ridgeview</option>
              <option value="54">Rockview</option>
              <option value="26">Rolf Valley</option>
              <option value="12">Rotten Row</option>
              <option value="26">Rugare</option>
              <option value="60">Ruwa</option>
              <option value="53">Sally Mugabe Heights</option>
              <option value="27.8">Sandton</option>
              <option value="66">Seke L</option>
              <option value="64">Seke Makoni</option>
              <option value="68">Seke P</option>

              <option value="60">Seke Unit B</option>
              <option value="62">Seke Unit C</option>
              <option value="48">Seke Unit D</option>
              <option value="66">Seke Unit J</option>
              <option value="66">Seke Unit L</option>
              <option value="8">Sentosa</option>

              <option value="40.6">Shawasha Hills</option>
              <option value="38">Snake Park</option>
              <option value="60">Solomio</option>
              <option value="20">Southerton</option>

              <option value="45">Southlands</option>
              <option value="40">Southlea Park</option>
              <option value="20.8">St Martins</option>
              <option value="56">St Mary's</option>
              <option value="40">Stapleford</option>
              <option value="51.4">Stoneridge</option>
              <option value="7">Strathaven</option>
              <option value="46">Sunway City</option>
              <option value="32">Support Unit</option>

              <option value="60">Town center</option>
              <option value="30">Tynwald south</option>

              <option value="26">Tynward north</option>
              <option value="42">Umwinsidale</option>
              <option value="13.4">Vainona</option>

              <option value="22">Warren Park</option>
              <option value="22">Warren park 1</option>
              <option value="24">Warren park 2</option>

              <option value="22">Warren park D</option>
              <option value="34">Waterfalls</option>
              <option value="32.8">Waterfalls cheviot</option>
              <option value="35">Waterfalls Derbyshire</option>
              <option value="33.4">Waterfalls mainway meadows</option>
              <option value="30">Waterfalls Park town</option>
              <option value="31">Waterfalls Prospect</option>
              <option value="33.2">Waterfalls Uplands</option>
              <option value="16.2">Westgate</option>
              <option value="24">Westlea</option>
              <option value="20">Westwood</option>
              <option value="32">Willowvale</option>
              <option value="60">Windsor</option>
              <option value="16">Workington</option>
              <option value="56">Zengeza 1</option>
              <option value="56">Zengeza 2</option>
              <option value="56">Zengeza 3</option>
              <option value="58">Zengeza 4</option>
              <option value="58.4">Zengeza 4 extension</option>
              <option value="62">Ziko</option>
              <option value="48">Zimre Park</option>
            </select>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              name="deliveryaddress"
              label="Delivery Address"
              fullwidth
              mb="1rem"
              value={deliveryaddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
            <TextField
              name="whatsappphonenumber"
              label="Whatsapp Phone Number"
              fullwidth
              mb="1rem"
              value={whatsappphonenumber}
              onChange={(e) => setWhatsappphonenumber(e.target.value)}
            />
            <TextField
              onChange={(e) => setDeliverylocation(e.target.value)}
              name="whatsappphonenumber"
              label="Confirm Location"
              fullwidth
              mb="1rem"
              // value={whatsappphonenumber}
              // onChange={(e) => setWhatsappphonenumber(e.target.value)}
            />
          </Grid>
          <p>Your delivery fee is {deliveryfee} USD</p>
        </Grid>
      </Card1>

      <Card1 mb="2rem">
        <Grid container spacing={7}>
          <h3>Payment Method</h3>
        </Grid>

        <CheckBox label="Cash on Delivery" color="secondary" mt={20} />
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/cart">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Back to Cart
            </Button>
          </Link>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button variant="contained" color="primary" type="submit" fullwidth>
            Place Order
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CheckoutForm;
