import { Button, Col, Row, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/slices/userSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
const AdminProductsComponent = ({ fetchProducts, deleteProducts, categories, deleteCategories }) => {
    const [products, setProducts] = useState([])
    // const [categories, setCategories] = useState([])

    const [productDeleted, setProductDeleted] = useState(false)
    const [categoryDeleted, setCategoryDeleted] = useState(false)
    const { categoryName } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const deleteHandler = async (productId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteProducts(productId)
            console.log(" data: " + data)
            if (data.message === 'food Item removed') {
                setProductDeleted(!productDeleted)
            }
        }
    }
    const deleteHandlerCategory = async (productId) => {
        if (window.confirm("Are you sure?")) {
            const data = await deleteCategories(productId)
            console.log(" data: " + data)
            if (data.message === 'category removed') {
                setCategoryDeleted(!categoryDeleted)
                navigate("/admin/products")
            }
        }
    }
    useEffect(() => {
        const abctrl = new AbortController()
        fetchProducts(abctrl, categoryName)
            .then((res) => setProducts(res))
            .catch(er => dispatch(logout()))
        return () => abctrl.abort()
    }, [productDeleted, categoryName, categoryDeleted])


    return (
        <Row className="m-5">
            <Col md={12}>
                <h1>Category List</h1>
                <LinkContainer to={"/admin/create-new-category"}>
                    <Button variant="primary" className="ms-2" size="lg">Create new Category</Button>
                </LinkContainer>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(products)}
                        {categories.map((category, idx) => {
                            return (
                                <LinkContainer to={`/admin/products/category/${category.name}`}>
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <LinkContainer to={`/admin/edit-category/${category._id}`}>
                                                <Button className="btn-sm"><i className="bi bi-pencil-square"></i></Button>
                                            </LinkContainer>{"/"}
                                            <Button variant="danger" className="btn-sm"
                                                onClick={() => deleteHandlerCategory(category._id)}>
                                                <i className="bi bi-x-circle"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                </LinkContainer>)
                        })}
                    </tbody>
                </Table>
                {products.length > 0 ? (<>
                    <h1>Product List</h1>
                    <LinkContainer to={"/admin/create-new-product"}>
                        <Button variant="primary" className="ms-2" size="lg">Create new FoodItem</Button>
                    </LinkContainer>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(products)}
                            {products.map((product, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td><LinkContainer to={`/admin/edit-product/${product._id}`}><Button className="btn-sm"><i className="bi bi-pencil-square"></i></Button></LinkContainer>{"/"}<Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}><i className="bi bi-x-circle"></i></Button></td>
                                    </tr>)
                            })}
                        </tbody>
                    </Table>
                </>) : (<>No Food Items in this category
                    <LinkContainer to={"/admin/create-new-product"}>
                        <Button variant="primary" className="ms-2" size="lg">Create new FoodItem</Button>
                    </LinkContainer></>)}

            </Col>
        </Row>
    )



};
export default AdminProductsComponent;