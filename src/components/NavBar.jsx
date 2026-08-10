import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = () => (
  <Navbar expand="lg" bg="dark" variant="dark" className="SARNavBar" sticky="top">
    <Navbar.Brand className="SARNavBar">
      <img alt="" src="/favicon.ico" width="20" height="20" className="d-inline-block align-top" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink to="/" exact={true} className="nav-link SARNavBar">WatchList</NavLink>
        <NavLink to="/macro-econ" className="nav-link SARNavBar">MacroEcon</NavLink>
        <NavLink to="/company-analysis" className="nav-link SARNavBar">CompanyAnalysis</NavLink>
        <NavLink to="/rating-enforce" className="nav-link SARNavBar">RatingEnforce</NavLink>
        <NavLink to="/screening" className="nav-link SARNavBar">Screening</NavLink>
        <NavLink to="/valuation" className="nav-link SARNavBar">Valuation</NavLink>
        <NavLink to="/px-target" className="nav-link SARNavBar">PxTarget</NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default React.memo(NavBar)
