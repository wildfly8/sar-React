import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const SARNavBarWithRouter = ({ userInfo, authState, authService }) => {
  // const login = async () => authService.login('/')
  const logout = async () => authService.logout('/')

  return (
        <Navbar expand="lg" bg="dark" variant="dark" className="SARNavBar" sticky="top">
          <Navbar.Brand className="SARNavBar"><img alt="" src="/favicon.ico" width="20" height="20" className="d-inline-block align-top" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/" exact={true} className="nav-link SARNavBar">WatchList</NavLink>
              <NavLink to="/macro-econ" className="nav-link SARNavBar">MacroEcon</NavLink>
              <NavLink to="/company-scan" className="nav-link SARNavBar">CompanyScan</NavLink>
              <NavLink to="/rating-enforce" className="nav-link SARNavBar">RatingEnforce</NavLink>
              <NavLink to="/screening" className="nav-link SARNavBar">Screening</NavLink>
              <NavLink to="/valuation" className="nav-link SARNavBar">Valuation</NavLink>
              <NavLink to="/px-target" className="nav-link SARNavBar">PxTarget</NavLink>
              <NavLink to="/security-rank" className="nav-link SARNavBar">SecurityRank</NavLink>
            </Nav>
            <Nav>
              {!authState.isPending && !authState.isAuthenticated && <Navbar.Text className="nav-text SARNavBar">Welcome Visitor!</Navbar.Text>}
              {!authState.isPending && !authState.isAuthenticated && <NavLink to="/login" className="nav-link SARNavBar">Login</NavLink>}
              {authState.isAuthenticated && userInfo && <Navbar.Text className="nav-text SARNavBar">Welcome {userInfo.name}!</Navbar.Text>}
              {authState.isAuthenticated && userInfo && <NavLink to="/profile" className="nav-link SARNavBar">Profile</NavLink>}
              {authState.isAuthenticated && userInfo && <Nav.Link onClick={logout} className="nav-link SARNavBar">Logout</Nav.Link>} 
            </Nav> 
          </Navbar.Collapse>
        </Navbar>
  )
}

export default React.memo(SARNavBarWithRouter)
