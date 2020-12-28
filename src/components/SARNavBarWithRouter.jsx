import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { withRouter } from 'react-router'

const SARNavBarWithRouter = ({ location, userInfo, authState, authService }) => {
  // const login = async () => authService.login('/')
  const logout = async () => authService.logout('/')

  return (
        <Navbar expand="lg" bg="dark" variant="dark" className="SARNavBar" sticky="top">
          <Navbar.Brand as={Link} to="/" className="SARNavBar"><img alt="" src="/favicon.ico" width="20" height="20" className="d-inline-block align-top" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" activeKey={location.pathname}>
              <Nav.Link as={Link} to="/" className="nav-link SARNavBar">WatchList</Nav.Link>
              <Nav.Link as={Link} to="/macro-econ" className="nav-link SARNavBar">MacroEcon</Nav.Link>
              <Nav.Link as={Link} to="/company-scan" className="nav-link SARNavBar">CompanyScan</Nav.Link>
              <Nav.Link as={Link} to="/rating-enforce" className="nav-link SARNavBar">RatingEnforce</Nav.Link>
              <Nav.Link as={Link} to="/screening" className="nav-link SARNavBar">Screening</Nav.Link>
              <Nav.Link as={Link} to="/valuation" className="nav-link SARNavBar">Valuation</Nav.Link>
              <Nav.Link as={Link} to="/px-target" className="nav-link SARNavBar">PxTarget</Nav.Link>
              <Nav.Link as={Link} to="/security-rank" className="nav-link SARNavBar">SecurityRank</Nav.Link>
            </Nav>
            <Nav activeKey={location.pathname}>
              {!authState.isPending && !authState.isAuthenticated && <Navbar.Text className="nav-text SARNavBar">Welcome Visitor!</Navbar.Text>}
              {!authState.isPending && !authState.isAuthenticated && <Nav.Link as={Link} to="/login" className="nav-link SARNavBar">Login</Nav.Link>}
              {authState.isAuthenticated && userInfo && <Navbar.Text className="nav-text SARNavBar">Welcome {userInfo.name}!</Navbar.Text>}
              {authState.isAuthenticated && userInfo && <Nav.Link as={Link} to="/profile" className="nav-link SARNavBar">Profile</Nav.Link>}
              {authState.isAuthenticated && userInfo && <Nav.Link onClick={logout} className="nav-link SARNavBar">Logout</Nav.Link>} 
            </Nav> 
          </Navbar.Collapse>
        </Navbar>
  )
}

const areLocationsEqual = (prevProps, nextProps) => {
  return prevProps.location.pathname === nextProps.location.pathname 
    && prevProps.userInfo === nextProps.userInfo
    && prevProps.authState === nextProps.authState
    && prevProps.authService === nextProps.authService
}

export default withRouter(React.memo(SARNavBarWithRouter, areLocationsEqual))
