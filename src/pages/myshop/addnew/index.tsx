import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const Products = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [subsubcategories, setSubsubcategories] = useState("");
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const [mainimage, setmainimage] = useState("");
  const [longdescription, setLongDescription] = useState("");
  const [ziprice, setziPrice] = useState("");
  const [zioldprice, setziOldprice] = useState("");

  const ziprice2 = Number(1.05) * Number(ziprice);
  const price = Math.ceil(ziprice2);

  const zioldprice2 = Number(1.05) * Number(zioldprice);
  const oldprice = Math.ceil(zioldprice2);

  if (typeof window !== "undefined") {
    // Perform localStorage action
    var token = JSON.parse(localStorage.getItem("customerAuthToken") as string);
    if (!token) {
      // navigate("/login");
      router.push("/userlogin");
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
  // const onChangeLongDescription = (value) => {
  //   setLongDescription(value);
  // };

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
          subsubcategories,
          category,
          mainimage,
          description,
          longdescription,
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
        router.push("/myshop/products");
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
              <p>Product Image</p>
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
            <Grid item sm={4} xs={12}>
              <select onChange={(e) => setCategory(e.target.value)}>
                <option>Choose Product Category</option>
                <option value="fashion">Fashion</option>
                <option value="computersandelectronics">
                  Computers and Electronics
                </option>
                <option value="homeandgarden">Home and Garden</option>
                <option value="gifts">Gifts</option>
                <option value="music">Music</option>
                <option value="healthandbeauty">Health and Beauty</option>
                <option value="hardware">Hardware</option>
                <option value="entertainment">Entertainent</option>
                <option value="liquorandbeverages">Liquor and Beverages</option>
                <option value="automativeandspareparts">
                  automativeandspareparts
                </option>
              </select>
            </Grid>

            {/* Conditionally render according to category */}
            {/* Conditionally render according to category */}
            {/* Conditionally render according to category */}
            {/* Conditionally render according to category */}

            <Grid item sm={4} xs={12}>
              {/* Conditional Render */}
              <div>
                {category === "fashion" && (
                  <Grid item sm={6} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Fashion Subcategory</option>
                      <option value="womenwear">Women Wear</option>
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
                  <Grid item sm={4} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="laptops">Laptops</option>
                      <option value="wearabletechnology">
                        Wearable Technology
                      </option>
                      <option value="cellphones">Cell Phones</option>
                      <option value="desktops">Desktops</option>
                      <option value="tablets">Tablets</option>
                      <option value="printersandscanners">
                        Printers and Scanners
                      </option>
                      <option value="wifiandnetwork">Wifi and Network</option>
                      <option value="projectors">Projectors</option>
                      <option value="software">Software</option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "homeandgarden" && (
                  <Grid item sm={4} xs={12}>
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
                {category === "gifts" && (
                  <Grid item sm={4} xs={12}>
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
                {category === "music" && (
                  <Grid item sm={4} xs={12}>
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
                  <Grid item sm={4} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="personalhygiene">Personal Hygiene</option>
                      <option value="pharmaceuticals">Pharmaceuticals</option>
                      <option value="herbs">Herbs</option>
                      <option value="contraceptives">Contraceptives</option>
                      <option value="hair">Hair</option>
                      <option value="skincare">Skin Care </option>
                      <option value="sexualwellness">Sexual Wellness</option>
                    </select>
                  </Grid>
                )}
              </div>
              <div>
                {category === "hardware" && (
                  <Grid item sm={4} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="chemicals">Chemicals</option>
                      <option value="constructionmaterials">
                        Construction Materials
                      </option>
                      <option value="Plumbing Materials">
                        {" "}
                        Plumbing Materials
                      </option>
                      <option value="tools">Tools</option>
                      <option value="electricalfittings">
                        Electrical Fittings
                      </option>
                      <option value="seeds">Seeds</option>
                      <option value="fertilizer">Fertilizer</option>
                      <option value="poultry">Poultry</option>
                      <option value="farmmachineryandequipment">
                        Farm Machinery and Equipment
                      </option>
                      <option value="paints">Paints</option>
                      <option value="handandpowertools">
                        Hand and Power Tools
                      </option>
                      <option value="timber">Timber</option>
                    </select>
                  </Grid>
                )}
              </div>
              <div>
                {category === "entertainment" && (
                  <Grid item sm={4} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="musicandmedia">Music and Media</option>
                      <option value="gaming">Gaming</option>
                      <option value="pcgaming">PC Gaming</option>
                      <option value="toys">Toys</option>
                      <option value="boardgames">Board games</option>
                    </select>
                  </Grid>
                )}
              </div>
              <div>
                {category === "liquorandbeverages" && (
                  <Grid item sm={4} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="spirits">spirits</option>
                      <option value="wines">Wines</option>
                      <option value="liquers">Liquers</option>
                      <option value="whiskey">Whiskey</option>
                      <option value="champagne">Champagne</option>
                      <option value="gin">Gin</option>
                      <option value="rum">Rum</option>
                      <option value="vodka">Vodka</option>
                      <option value="cognac">Cognac</option>
                      <option value="brandy">Brandy</option>
                    </select>
                  </Grid>
                )}
              </div>

              <div>
                {category === "automativeandspareparts" && (
                  <Grid item sm={4} xs={12}>
                    <select onChange={(e) => setSubcategories(e.target.value)}>
                      <option>Choose Subcategory</option>
                      <option value="accessories">Accessories</option>
                      <option value="automativeandspareparts">
                        automativeandspareparts
                      </option>
                      <option value="scania">Scania</option>
                      <option value="man">MAN</option>
                      <option value="isuzu">Isuzu</option>
                      <option value="chevrolet">Chevrolet</option>
                      <option value="porsche">Porsche</option>
                      <option value="mahindra">Mahindra</option>
                      <option value="kia">Kia</option>
                      <option value="nissan">Nissan</option>
                      <option value="haval">Haval</option>
                      <option value="hyundai">Hyundai</option>
                      <option value="bmw">BMW</option>
                      <option value="honda">Honda</option>
                      <option value="toyota">Toyota</option>
                      <option value="mercedesbenz">Benz</option>
                      <option value="volvo">Volvo</option>
                    </select>
                  </Grid>
                )}
              </div>
            </Grid>

            {/* sub sub categories */}
            {/* sub sub categories */}
            {/* sub sub categories */}
            {/* sub sub categories */}
            {/* sub sub categories */}

            <Grid item sm={4} xs={12}>
              {/* Conditional Render */}

              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "laptops" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value=" minilaptopsandnetbooks">
                          Mini Laptops and Netbooks
                        </option>
                        <option value="ultrabooks">Ultrabooks</option>
                        <option value="notebooks">Notebooks</option>
                        <option value="hybridpcs">Hybrid PCs</option>
                        <option value="macbooks">Macbooks</option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "printersandscanners" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="printers">printers</option>
                        <option value="scanners">scanners</option>
                        <option value="inks">inks</option>
                        <option value="toners">toners</option>
                        <option value="catridges">catridges</option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "cellphones" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="android">Android</option>
                        <option value="appleios">Apple ios</option>
                        <option value="twumbudzi">Twumbudzi</option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                <div>
                  {subcategories === "desktops" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="allinones"> All In Ones</option>
                        <option value="ups">UPS</option>
                        <option value="casing">Casing</option>
                        <option value="spares">Spares</option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "tablets" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="android">android</option>
                        <option value="ios">ios</option>
                        <option value="windows">windows</option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "wifiandnetwork" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="switches">switches</option>
                        <option value="routers">routers</option>
                        <option value="modems">modems</option>
                        <option value="networkingperipherals">
                          Networking Peripherals
                        </option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "projectors" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="conferencing">Conferencing</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "software" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="officeandbusiness">
                          Office and Business
                        </option>
                        <option value="securityandutilities">
                          Security and Utilities
                        </option>
                        <option value="operatingsystems">
                          Operating Systems
                        </option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "wearabletechnology" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="watches">Watches</option>
                        <option value="fitnesstrackers">
                          Fitness Trackers
                        </option>
                        <option value="smartclothing">Smart Clothing</option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>

              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "musicandmedia" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="stageandstudiorecordingequipment">
                          Stage and Studio Recording Equipment
                        </option>
                        <option value="instruments">Instruments</option>
                        <option value="hometheatreandaudiosystems">
                          Home Theatre and Audio Systems
                        </option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>
              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {subcategories === "gaming" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="xbox">X box</option>
                        <option value="playstation">Play Station</option>
                        <option value="consoles">Consoles</option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>
              <Grid item sm={4} xs={12}>
                {/* Sub sub categories Conditional Render */}
                <div>
                  {category === "automativeandspareparts" && (
                    <Grid item sm={4} xs={12}>
                      <select
                        onChange={(e) => setSubsubcategories(e.target.value)}
                      >
                        <option>Choose Sub sub category</option>
                        <option value="Service Kit">Service Kit</option>
                        <option value="playstation">Suspension</option>
                        <option value="consoles">Radiator</option>
                        <option value="accesories">Accesories</option>
                      </select>
                    </Grid>
                  )}
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                placeholder="Description"
                fullwidth
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <p>Long Description</p>
              <QuillNoSSRWrapper
                modules={modules}
                placeholder="compose here"
                value={longdescription}
                onChange={setLongDescription}
                formats={formats}
                theme="snow"
              />
            </Grid>

            <Grid item xs={12}>
              <p>Product Gallery Images (not more than 4)</p>
              <input
                type="file"
                multiple
                onChange={(e) => {
                  multipleFilesUpload(e.target.files);
                }}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <TextField
                name="quantity"
                label="Stock Quantity"
                type="number"
                placeholder="Products Quantity in Stock"
                fullwidth
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <TextField
                name="price"
                label="New Price"
                placeholder="New Price"
                type="number"
                fullwidth
                onChange={(e) => setziPrice(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                name="oldprice"
                label="Old Price"
                placeholder="Old Price"
                type="number"
                fullwidth
                onChange={(e) => setziOldprice(e.target.value)}
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

Products.layout = DashboardLayout;

export default Products;
