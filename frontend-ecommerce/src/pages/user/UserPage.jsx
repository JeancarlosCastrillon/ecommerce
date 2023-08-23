import { Div } from "./styled";
import { useState, useEffect } from 'react';
import Header from "../../components/Layout/header/Header";
import Footer from "../../components/Layout/footer/Footer";
import NavVertical from "./navs/NavVertical";

const UserPage = () => {
  const [userEnter, setUserEnter] = useState(false);

  const verifyEnter = () => {
    return true
  };

  useEffect(() => {
    const trueEnter = verifyEnter();
    setUserEnter(trueEnter);
    
    return () => {
      setUserEnter(false);
    };
  }, []);

  return ( 
    <Div>
        <Header isUsed={userEnter}/>
          <NavVertical/>
        <Footer/>
    </Div>
  );
}

export default UserPage;