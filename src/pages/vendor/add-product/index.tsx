import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const AddProduct = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [oldprice, setOldprice] = useState("");
  const [mainimage, setmainimage] = useState("");

  if (typeof window !== "undefined") {
    // Perform localStorage action
    var token = JSON.parse(localStorage.getItem("adminAuthToken") as string);
    if (!token) {
      // navigate("/login");
      router.push("/sellerlogin");
    }
  }

  // state variable to hold your values
  const [imgUrls] = useState([]);

  const multipleFilesUpload = async (files) => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "kwingy");

      axios
        .post("https://api.cloudinary.com/v1_1/kwingy/image/upload", formData)
        .then((response) => {
          console.log(response.data.secure_url);
          // add url to the array of urls
          imgUrls.push(response.data.secure_url);
          console.log(imgUrls);
        });
    }
  };

  const handleFileChange = async (files) => {
    console.log(files[0]);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "kwingy");

    axios
      .post("https://api.cloudinary.com/v1_1/kwingy/image/upload", formData)
      .then((response) => {
        setmainimage(response.data.secure_url);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "https://backendkwingy.online/api/products/addnew",
        {
          title,
          brand,
          condition,
          category,
          mainimage,
          description,
          quantity,
          imgUrls,
          subcategories,
          price,
          oldprice,
        },
        { headers: { adminAuthToken: token } }
      )
      .then(function (response) {
        console.log(response);
        router.push("/vendor/products");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <DashboardPageHeader
        title="Add New Product"
        iconName="delivery-box"
        button={
          <Link href="/vendor/products">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Product List
            </Button>
          </Link>
        }
      />

      <Card p="30px">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={6}>
            <Grid item sm={4} xs={12}>
              <input
                type="file"
                onChange={(e) => {
                  handleFileChange(e.target.files);
                }}
                className="app_uploadInput"
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                name="title"
                label="Title"
                placeholder="Title / Name"
                fullwidth
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                name="brand"
                label="Brand"
                placeholder="Brand"
                fullwidth
                onChange={(e) => setBrand(e.target.value)}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <select onChange={(e) => setCondition(e.target.value)}>
                <option>Choose Product Condition</option>
                <option value="new">New</option>
                <option value="newbutopened">New but Opened</option>
                <option value="newbutused">New but Used</option>
                <option value="goodsecondhand">Good Second Hand</option>
                <option value="Used">Used</option>
                <option value="Used Poor">Used Poor</option>
                <option value="Cracked">Cracked</option>
                <option value="notworking">Not Working</option>
              </select>
            </Grid>

            <Grid item sm={6} xs={12}>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option>Choose Product Category</option>
                <option value="fashion">Fashion</option>
                <option value="computersandelectronics">
                  Computers and Electronics
                </option>
                <option value="homeandgarden">Home, Kitchen and Garden</option>
                <option value="giftsandpresents">Gifts and Presents</option>
                <option value="musicandaccessories">Music</option>
                <option value="healthandbeauty">Health and Beauty</option>
                <option value="pets">Pets</option>
                <option value="babiesandtoys">Babies and Toys</option>
                <option value="automativeandspareparts">
                  Automative and Spareparts
                </option>
              </select>
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  multipleFilesUpload(e.target.files);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextArea
                name="description"
                label="Description"
                placeholder="Description"
                rows={6}
                fullwidth
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              {/* Conditional Render */}
              <div>
                {category === "fashion" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="womenwear">Fashion</option>
                      <option value="menwear">Men's Wear</option>
                      <option value="menshoes">Men Shoes</option>
                      <option value="womenshoes">Women Shoes</option>
                      <option value="manaccessories">Man Accessories</option>
                      <option value="watches">Watches</option>
                      <option value="fashionbundles">Fashion Bundles</option>
                      <option value="sunglasses">Sunglasses</option>
                      <option value="jewellery">Jewellery</option>
                      <option value="sneakers">Sneakers</option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "computersandelectronics" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="cellphoneandaccessories">
                        Cellphone and accessories
                      </option>
                      <option value="videogamesandconsole">
                        Video games and console
                      </option>
                      <option value="phonesandtablets">
                        Phones and tablets
                      </option>
                      <option value="gpsandtrackingdevices">
                        GPS and Tracking devices
                      </option>
                      <option value="computerandlaptops">
                        Computer and Laptops
                      </option>
                      <option value="camerasandphotos">
                        Cameras and photos
                      </option>
                      <option value=">tvdecodersanddvds">
                        TV, Decoders and DVDs
                      </option>
                      <option value="cameraanddrones">Camera and drones</option>
                      <option value="asianbrands">Asian brands</option>
                      <option value="smarthome">Smart home</option>
                      <option value="hometheatresandaudio">
                        Home theatres and audio
                      </option>
                      <option value="software">Software</option>
                      <option value="projectors">Projectors</option>
                      <option value="printersscannersandaccessories">
                        Printers scanners and accessories
                      </option>
                      <option value="wifiandandnetwork">
                        Wifi and and network
                      </option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "homeandgarden" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="largeappliances">Large Appliances</option>
                      <option value="furniture">Furniture</option>
                      <option value="kitchenanddining">
                        Kitchen and Dining
                      </option>
                      <option value="smallappliances">Small Appliances</option>
                      <option value="appliancesaccessories">
                        Appliances Accessories
                      </option>
                      <option value="workshoptoolsandequipments">
                        Workshop tools and equipments
                      </option>
                      <option value="patiogardenandoutdoor">
                        Patio,garden and outdoor
                      </option>
                      <option value="lampslightsandfans">
                        Lamps ,lights and fans
                      </option>
                      <option value="interiordecoration">
                        Interior decoration(jewellery and beads)
                      </option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "giftsandpresents" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="necklacesandpendants">
                        necklacesandpendants
                      </option>
                      <option value="formen">formen</option>
                      <option value="forwomen">forwomen</option>
                      <option value="formom">formom</option>
                      <option value="giftsbaskets">giftsbaskets</option>
                      <option value="christmas">christmas</option>
                      <option value="crystals">crystals</option>
                      <option value="tools">tools</option>
                      <option value="funnygifts">funnygifts</option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "musicandaccessories" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="speakers">Speakers</option>
                      <option value="audiobooks">Audio Books</option>
                      <option value="musicalinstrumentsandgear">
                        Musical Instruments and Gear
                      </option>
                      <option value="microphonesandheadphones">
                        Microphones and Headphones
                      </option>
                      <option value="amplifiersandmixers">
                        Amplifiers and mixers
                      </option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "healthandbeauty" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="beauty">Beauty</option>
                      <option value="makeup">Makeup</option>
                      <option value="health">Health</option>
                      <option value="kbeauty">K-Beauty</option>
                      <option value="manicureandpedicure">
                        Manicure and Pedicure
                      </option>
                      <option value="hairproducts">Hair Products</option>
                      <option value="skinproducts">Skin Products</option>
                      <option value="orthopedicproducts">
                        Orthopedic Products
                      </option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "pets" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="petstoys">Pets Toys</option>
                      <option value="petsupplies">Pet Supplies</option>
                      <option value="petclothes">Pet Clothes</option>
                      <option value="petsfood">Pets Food</option>
                      <option value="petsmedicine">Pets Medicine</option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "babiesandtoys" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="fashionforgirls">Fashion for girls</option>
                      <option value="fashionforboys">Fashion for boys</option>
                      <option value="babyessentials">Baby Essentials</option>
                      <option value="martenity">Martenity</option>
                      <option value="schoolwear">School wear</option>
                      <option value="travelandsafety">Travel and Safety</option>
                      <option value="diapersanddailycare">
                        Diapers and Dailycare
                      </option>
                      <option value="kidsbeddinganddecor">
                        Kids Bedding and Decor
                      </option>
                      <option value="toysandactivities">
                        Toys and Activities
                      </option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "automativeandspareparts" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="toolsandaccessories">
                        toolsandaccessories
                      </option>
                      <option value="safetyandsecurity">
                        Safety and Security
                      </option>
                      <option value="autocareandmaintainance">
                        Autocare and Maintainance
                      </option>
                      <option value="healthandbeauty">Health and Beauty</option>
                      <option value="tyresandbatteries">
                        Tyres and Batteries
                      </option>
                      <option value="replacementparts">
                        Replacement parts
                      </option>
                      <option value="bodykitsandspoilers">
                        Body kits and spoilers
                      </option>
                    </select>
                  </Grid>
                )}
              </div>
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                name="quantity"
                label="Stock Quantity"
                type="number"
                placeholder="Products Quantity in Stock"
                fullwidth
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                name="price"
                label="New Price"
                placeholder="New Price"
                type="number"
                fullwidth
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                name="oldprice"
                label="Old Price"
                placeholder="Old Price"
                type="number"
                fullwidth
                onChange={(e) => setOldprice(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button mt="25px" variant="contained" color="primary" type="submit">
            Save product
          </Button>
        </form>
      </Card>
    </div>
  );
};

AddProduct.layout = VendorDashboardLayout;

export default AddProduct;
