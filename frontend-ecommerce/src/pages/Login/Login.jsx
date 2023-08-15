import * as React from "react";
import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Box, Checkbox } from "@mui/material";
import { Btn, Login_Register, SignInBtn, Span } from "./Styled";
import { FlexDirCol, FlexRow } from "../../components/StyledMain";
import TextField from "@mui/material/TextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";

export default function LoginDrawer() {
  const [haveAccount, setHaveAccount] = useState(true);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 400,
        overflow: "hidden",
      }}
      role="presentation"
    >
      <List style={{ paddingTop: "0" }}>
        <FlexRow style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
          <Login_Register
            onClick={() => setHaveAccount(true)}
            Page={haveAccount}
          >
            Iniciar Sesión
          </Login_Register>
          <Login_Register
            onClick={() => setHaveAccount(false)}
            Page={haveAccount}
          >
            Registarse
          </Login_Register>
        </FlexRow>
        {haveAccount ? <Login /> : <Register />}
      </List>
    </Box>
  );
  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function BasicTextFields({ Placeholder, onChange, value }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "35ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id={Placeholder}
        label={Placeholder}
        onChange={onChange}
        value={value}
        variant="outlined"
      />
    </Box>
  );
}



const Login = () => {
  
  

  const [users, setUsers] = useState({
    user: '',
    password: '',
  });
  
  const handleInputJoin = (campo, valor) => {
    users((datosPrevios) => ({ ...datosPrevios, [campo]: valor }));
  };

  const conx = async(event) => { 
    event.preventDefault();
    try {
      const response = await axios.get("http://localhost:3000/login",{
          ...users
      });
      console.log(response);
  } catch (error) {
      console.log(error);
  }
   }
  
  return (
    <FlexDirCol style={{ gap: ".5rem" }}>

      <form onSubmit={conx}>

      <input
          className="controls"
          type="text"
          name="nombre"
          placeholder="Ingrese su correo"
          required
          onChange={(event) => {
            handleInputJoin("email",event.target.value);
          }}
        />
        <input
          className="controls"
          type="text"
          name="nombre"
          placeholder="Ingrese su contraseña"
          required
          onChange={(event) => {
            handleInputJoin("email",event.target.value);
          }}
        />
      </form>
      
      <BasicTextFields Placeholder={"E-mail"} />
      <BasicTextFields Placeholder={"Contraseña"} />
      <FlexRow style={{ justifyContent: "space-between" }}>
        <Span>
          <Checkbox {...label} style={{ color: "black" }} /> Recordar contraseña
        </Span>
        <Span>¿Olvidaste tu contraseña?</Span>
      </FlexRow>
      <Btn type="submit" value="registrar">Iniciar Sesión</Btn>
      <FlexDirCol style={{ gap: ".5rem" }}>
        <SignInBtn bgcolor="#003aaf">
          <FacebookIcon /> Continuar con Facebook
        </SignInBtn>
        <SignInBtn bgcolor="#fff">
          <GoogleIcon /> Continuar con Google
        </SignInBtn>
      </FlexDirCol>
    </FlexDirCol>
  );
};

export const Register = () => {

  const [Propiedaddes,setpropieda] = useState({
    email: "",
    password_hash: "",
    first_name: "",
    last_name: "",
    address: "",
    phone_number: ""
  })
  const handleInputChange = (campo, valor) => {
    setpropieda((datosPrevios) => ({ ...datosPrevios, [campo]: valor }));
  };
  console.log(Propiedaddes)
  
  const add = async (event) =>{
    event.preventDefault();
    try {
        const response = await axios.post("http://localhost:3000/users/register",{
            ...Propiedaddes
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

  return (
    <form onSubmit={add} >
        <input
          className="controls"
          type="text"
          name="nombre"
          placeholder="Ingrese su correo"
          required
          onChange={(event) => {
            handleInputChange("email",event.target.value);
          }}
        />
        <input
          className="controls"
          type="password"
          name="email"
          id="email"
          placeholder="Ingrese su contraseña"
          required
          onChange={(event) => {
            handleInputChange("password_hash",event.target.value);
          }}
        />
        <input
          className="controls"
          type="text"
          name="contraseña"
          id="contraseña"
          placeholder="Ingrese su nombre"
          required
          onChange={(event) => {
            handleInputChange("first_name",event.target.value);
          }}
        />
        <input
          className="controls"
          type="text"
          name="contraseña"
          id="contraseña"
          placeholder="ingrese su apellido"
          required
          onChange={(event) => {
            handleInputChange("last_name",event.target.value);
          }}
        />
        <input
          className="controls"
          type="text"
          name="contraseña"
          id="contraseña"
          placeholder="Ingrese su dirrecion"
          required
          onChange={(event) => {
            handleInputChange("address",event.target.value);
          }}
        />
        <input
          className="controls"
          type="text"
          name="contraseña"
          id="contraseña"
          placeholder="Ingrse su numero de telefono"
          required
          onChange={(event) => {
            handleInputChange("phone_number",event.target.value);
          }}
        />
        <button type="submit" value="registrar" />

      </form>
  );
};
