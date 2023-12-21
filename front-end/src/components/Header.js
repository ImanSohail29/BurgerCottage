import { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom"
import { Dropdown, DropdownButton, InputGroup, Navbar, Container, NavDropdown, Nav, Badge } from 'react-bootstrap';
import { getCategories } from "../redux/slices/categorySlice";
import { logout } from "../redux/slices/userSlice";

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)
  const itemsCount = useSelector((state) => state.cart.itemsCount)
  const { categories } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  return (
    <Navbar collapseOnSelect expand="lg" style={{ background: "rgba(0, 0, 0, 0.3)" }} variant="dark">
      <Container>
      {userInfo.isAdmin ? ( <Navbar.Brand href="/home">
            <FontAwesomeIcon icon={faBurger} />
            BURGER COTTAGE</Navbar.Brand>):(
              <Navbar.Brand href="/">
              <FontAwesomeIcon icon={faBurger} />
              BURGER COTTAGE</Navbar.Brand>
            )}
         
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
            <LinkContainer to='/cart'>
              <Nav.Link >
                <Badge pill bg="danger">{itemsCount === 0 ? "" : itemsCount}</Badge>
                <i className="bi bi-cart2"></i>
                <span className="ms-1">Cart</span>
              </Nav.Link>
            </LinkContainer>

          </Nav>
          <Nav>


            {userInfo.isAdmin ? (
              <>
              <LinkContainer to='/admin/vendors'>
                <Nav.Link>Admin
                  <i className="bi bi-circle-fill text-danger"></i>
                </Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>

              </>
              
            ) : userInfo.name && !userInfo.isAdmin ? (<>
              <NavDropdown title={`${userInfo.name}`} id="collasible-nav-dropdown">
                <NavDropdown.Item eventKey="/user/my-orders" as={Link} to="/user/my-orders" >My orders</NavDropdown.Item>
                <NavDropdown.Item eventKey="/user" as={Link} to="/user" >My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => { dispatch(logout()) }} >Logout</NavDropdown.Item>
              </NavDropdown>
              
            </>

            ) : (<> <LinkContainer to='/login'>
              <Nav.Link >
                Login
              </Nav.Link>
            </LinkContainer>
              <LinkContainer to='/register'>
                <Nav.Link >
                  Register
                </Nav.Link>
              </LinkContainer></>)}



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default Header