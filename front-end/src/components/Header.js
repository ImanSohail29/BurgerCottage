import { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { Link,useNavigate } from "react-router-dom"
import { Dropdown, DropdownButton, InputGroup,Navbar,Container, NavDropdown, Nav, Badge } from 'react-bootstrap';
import { getCategories } from "../redux/slices/categorySlice";

const Header=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()

    useEffect(()=>{
dispatch(getCategories())
    },[dispatch])
    return(
        <Navbar collapseOnSelect expand="lg" style={{background: "rgba(0, 0, 0, 0.3)"}} variant="dark">
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faBurger}  />
            BURGER COTTAGE</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <InputGroup>
              <DropdownButton id="dropdown-basic-button" title={""}>
              <Dropdown.Item onClick={()=>{}}>All</Dropdown.Item>
                {
                
                 <Dropdown.Item key={""}></Dropdown.Item>
                }
              </DropdownButton>

            </InputGroup> */}

          </Nav>
          <Nav>


            
              <LinkContainer to='/admin/orders'>
                <Nav.Link>Admin
                  <i className="bi bi-circle-fill text-danger"></i>
                </Nav.Link>
              </LinkContainer>
            
              <NavDropdown title={""} id="collasible-nav-dropdown">
                <NavDropdown.Item eventKey="/" as={Link} to="/" >My orders</NavDropdown.Item>
                <NavDropdown.Item eventKey="/" as={Link} to="/" >My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => {}} >Logout</NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to='/cart'>
              <Nav.Link >
                <Badge pill bg="danger">{1}</Badge>
                <i className="bi bi-cart2"></i>
                <span className="ms-1">Cart</span>
              </Nav.Link>
            </LinkContainer>
              <LinkContainer to='/login'>
              <Nav.Link >
                Login
              </Nav.Link>
            </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link >
                  Register
                </Nav.Link>
              </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default Header