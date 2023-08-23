import { Div } from "./styled";
import Footer from "../footer/Footer";
import DemoAutoPlay from "./carrusel/DemoAutoPlay";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { ProductList } from "./products/ProductList";
import "../header/styled.css";
import "../../../car.css";
import SectionsBody from "./Sections/SectionsBody";
import Header from "../header/Header";

export default function Body() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: "#ffffff" }}>
        <Header
          products={allProducts}
          newProducts={setAllProducts}
          inTotal={total}
          newTotal={setTotal}
          cantProducts={countProducts}
          newCantProducts={setCountProducts}
        />
        <Div>
          <DemoAutoPlay />

          <ProductList
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />
          <SectionsBody />
          <Footer />
        </Div>
      </AppBar>
    </>
  );
}
