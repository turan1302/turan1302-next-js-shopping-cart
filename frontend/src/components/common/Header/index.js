"use client"

import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import cartWrapper from "@/cartWrapper";
import Link from "next/link";

const Header = (props) => {
  const { cart } = props;
  const [totalUnique,setTotalUnique] = useState(0); 

  useEffect(() => {
    setTotalUnique(cart.totalUniqueItems);
  }, [cart]);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} href="/">mShop</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} href="/">Anasayfa</Nav.Link>
        <Nav.Link as={Link} href="/basket">Sepet ({totalUnique})</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default cartWrapper(Header);
