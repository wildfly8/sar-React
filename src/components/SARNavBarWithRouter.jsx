import React, { useContext } from 'react'
import { MyContext } from '../MyContext'
import { Navbar, Nav } from 'react-bootstrap'
import { withRouter } from 'react-router'


const SARNavBarWithRouter = ({ location }) => {
  const {user, auth} = useContext(MyContext)
  const [userInfo, ] = user
  const [authState, authService] = auth


  // const login = async () => authService.login('/')
  const logout = async () => authService.logout('/')

  return (
        <Navbar expand="lg" bg="dark" variant="dark" className="SARNavBar" sticky="top">
          <Navbar.Brand href="/" className="SARNavBar"><img alt="" src="/favicon.ico" width="20" height="20" className="d-inline-block align-top" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto" activeKey={location.pathname}>
              <Nav.Link href="/" className="nav-link SARNavBar">WatchList</Nav.Link>
              <Nav.Link href="/macro-econ" className="nav-link SARNavBar">MacroEcon</Nav.Link>
              <Nav.Link href="/company-scan" className="nav-link SARNavBar">CompanyScan</Nav.Link>
              <Nav.Link href="/rating-enforce" className="nav-link SARNavBar">RatingEnforce</Nav.Link>
              <Nav.Link href="/screening" className="nav-link SARNavBar">Screening</Nav.Link>
              <Nav.Link href="/valuation" className="nav-link SARNavBar">Valuation</Nav.Link>
              <Nav.Link href="/px-target" className="nav-link SARNavBar">PxTarget</Nav.Link>
              <Nav.Link href="/security-rank" className="nav-link SARNavBar">SecurityRank</Nav.Link>
            </Nav>
            <Nav activeKey={location.pathname}>
              {!authState.isPending && !authState.isAuthenticated && <Navbar.Text className="nav-text SARNavBar">Welcome Visitor!</Navbar.Text>}
              {!authState.isPending && !authState.isAuthenticated && <Nav.Link href="/login" className="nav-link SARNavBar">Login</Nav.Link>}
              {authState.isAuthenticated && userInfo && <Navbar.Text className="nav-text SARNavBar">Welcome {userInfo.name}!</Navbar.Text>}
              {authState.isAuthenticated && userInfo && <Nav.Link href="/profile" className="nav-link SARNavBar">Profile</Nav.Link>}
              {authState.isAuthenticated && userInfo && <Nav.Link onClick={logout} className="nav-link SARNavBar">Logout</Nav.Link>} 
            </Nav> 
          </Navbar.Collapse>
        </Navbar>
  )
}

export default withRouter(SARNavBarWithRouter)
