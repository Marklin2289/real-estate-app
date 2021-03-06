import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { menuData } from "../data/MenuData";
import { Button } from "./Button";
import { FaBars } from "react-icons/fa";

const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;

  padding: 1rem 2rem;
  z-index: 999;
  position: fixed;
  width: 100%;
`;

const NavLink = css`
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`;

const Logo = styled(Link)`
  ${NavLink}
  font-style: italic;
`;

const MenuBars = styled(FaBars)`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-50%, 25%);
    color: white;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -48px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavMenuLink = styled(Link)`
  ${NavLink}
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navbar = ({ toggle }) => {
  const [navbar, setNavbar] = useState(false);
  const location = useLocation();

  const changeBackground = () => {
    if (window.pageYOffset >= 60) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener("scroll", changeBackground);
    };
    watchScroll();
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  let style = {
    backgroundColor:
      navbar || location.pathname !== "/" ? "#CD853F" : "transparent",
    transition: "0.5s",
  };

  return (
    <Nav style={style}>
      <Logo to="/">Mkln.net</Logo>
      <MenuBars onClick={toggle} />
      <NavMenu>
        {menuData.map((item, index) => (
          <NavMenuLink to={item.link} key={index}>
            {item.title}
          </NavMenuLink>
        ))}
      </NavMenu>
      <NavBtn>
        <Button to="/contact" primary="true">
          Contact Us
        </Button>
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
