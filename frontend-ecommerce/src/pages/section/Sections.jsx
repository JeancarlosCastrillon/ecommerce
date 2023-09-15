/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
/* Components */
import Header, { pages } from "../../components/Layout/header/Header.jsx";
import { useCart } from "../../components/Layout/body/products/CardContext.jsx";
import { Price } from "../infoProducts/styleProducts.jsx";
import { Categories } from "../../components/Layout/body/Category/IndexCategory.jsx";
import FooterUser from '../../components/Layout/footer/FooterUser.jsx';
/* Modules */
import jwt_decode from "jwt-decode";
import axios from "axios";
/* Styles */
import { ContainerCard, Tiltle } from "../../components/Layout/body/products/StyledProductList.jsx";
import { Card, CardContent, Pagination, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import { GiShoppingBag } from "react-icons/gi";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <FlexDirCol>{children}</FlexDirCol>
        </Box>
      )}
    </div>
  );
}


export default function Sections() {
  const { page } = useParams();
  const { cart, updateCart } = useCart();
  const [products, setProducts] = useState([]);
  const [userEnterUser, setUserEnterUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);


  const token = localStorage.getItem("accessToken");
  let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const verifyEnter = () => {
    return true;
  };

  let sectionProducts;
  let filterCategories;
  if (page === 'Hombre' || page === 'Mujer') {
    sectionProducts = products.filter((product) => product.section.section === page);
    filterCategories = sectionProducts.filter((products) => products.category.category === 'Camisetas');
  } else {
    sectionProducts = products.filter((product) => product.category.category === page);
  }

  const onAddProduct = (product) => {
    const updatedCart = Array.isArray(cart) ? [...cart] : [];
    const existingProduct = updatedCart.find(
      (item) => item.product_id === product.product_id
    );

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    updateCart(updatedCart);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      console.log(jwt_decode(localStorage.getItem("accessToken")), "❤❤❤❤");
      setLoading(false);
    } else {
      navigate("/");
    }

    const trueEnter = verifyEnter();
    setUserEnterUser(trueEnter);
    return () => {
      setUserEnterUser(false);
    };
  }, []);


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/product/");
        setProducts(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100vh", overflowY: "scroll" }}>
      <Header isUsedUser={userEnterUser} />
      <h1 style={{ marginTop: "120px", textAlign: "center" }}>{page}</h1>
      {page === 'Mujer' || page === 'Hombre' ?

        <Box sx={{ width: '100%', bgcolor: 'background.paper', display: "flex", justifyContent: "center" }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example" >
            <Tab label='productos' index={0} />
            {Categories.map((item, index) => (
              <Tab label={item.name} key={index} />
            ))}
          </Tabs>
        </Box>

        : ""}
      <Div>
        <CustomTabPanel value={value} index={0}>
          <FlexRow style={{ flexWrap: "wrap", marginTop:"0px" }}>
            <>
              {sectionProducts.map((item) => (
                <ContainerCard key={item.id} style={{ width: "19.5%",  marginTop: "0px"  }}>
                  <Card>
                    <Link to={`/InfoProducts/${item.name}`}>
                      <Imagen src={item.img_video} alt={item.name} style={{ width: "100%", objectFit: "cover" }} />
                    </Link>
                    <CardContent>
                      <Tiltle>{item.name}</Tiltle>
                      <Price style={{ justifyContent: "space-between", display: "flex" }}>
                        ${item.price}
                        <GiShoppingBag
                          onClick={() => onAddProduct(item)}
                          size={"10%"}
                        />
                      </Price>
                    </CardContent>
                  </Card>
                </ContainerCard>
              ))}
            </>
          </FlexRow>
        </CustomTabPanel>

        {Categories.map((item, index) => (
          <CustomTabPanel value={value} index={index + 1} key={index}>
            <FlexRow style={{ flexWrap: "wrap" }}>
              {page === 'Mujer' || page === 'Hombre' ?
                <>
                  <FilterSections category={item.name} sectionProducts={sectionProducts} />
                </>
                :
                <></>
              }
            </FlexRow>
          </CustomTabPanel>
        ))}
      </Div>
      <FooterUser />
    </Box>
  );
}

import styled from "styled-components";
import { FlexDirCol, FlexRow } from "../../components/StyledMain.jsx";
import { Div } from "../user/styled.jsx";
import FilterSections from "./FilterSections.jsx";

export const Imagen = styled.img`
  width: 300px;
  height: 450px;
`;
