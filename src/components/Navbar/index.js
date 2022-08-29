import React from "react";
import { IconContext } from "react-icons/lib";

import { Nav, NavbarContainer, NavLogo } from "./NavbarElements";

function Navbar() {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/">Pockies</NavLogo>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
