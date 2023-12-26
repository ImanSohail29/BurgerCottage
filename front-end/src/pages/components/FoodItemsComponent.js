import { Button, Col, Container, ListGroup, Pagination, Row, Image } from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent";
import FoodItemForListComponent from "../../components/FoodItemForListComponent";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
const FoodItemsComponent = ({ getFoodItems, categories, addProductApiRequest }) => {
    const location = useLocation()
    const navigate = useNavigate();
    const { categoryName } = useParams() || ""
    const { pageNumParam } = useParams() || 1
    const [foodItems, setFoodItems] = useState([])
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [paginationLinksNumber, setPaginationLinksNumber] = useState(null)
    const [pageNum, setPageNum] = useState(null)


    useEffect(() => {
        if (categoryName) {
            setCategory(categoryName)
        }
    }, [categoryName])

    useEffect(() => {
        getFoodItems(categoryName, pageNumParam)
            .then(data => {
                setFoodItems(data.foodItems)
                setPaginationLinksNumber(foodItems.paginationLinksNumber)
                setPageNum(foodItems.pageNum)
                setLoading(false)
            })
            .catch((er) => setError(er.response.data.message ? er.response.data.message : er.response.data))
    }, [categoryName, pageNumParam])

    return (
        <Container fluid >
            <Row style={{ minHeight: "100vh" }}>
                <Col xs={3} className="bg-dark text-white bg-opacity-50">
                    <h3>
                        Categories{"  "}
                        <LinkContainer to={"/admin/create-new-category"}>
                            <Button variant="danger">Add new Category</Button>
                        </LinkContainer>
                    </h3>
                    <ListGroup variant="flush">
                        {
                            categories.map((categoryItem, idx) => {
                                return (
                                    <LinkContainer className="bg-dark text-white bg-opacity-50" key={idx} style={{ cursor: "pointer" }} to={`/foodItem-list/category/${categoryItem.name}`}>
                                        <ListGroup.Item key={idx}>
                                            <Image style={{ maxWidth: "50px", maxHeight: "50px" }} crossOrigin="anonymous" src={categoryItem.image}></Image>
                                            {categoryItem.name}
                                        </ListGroup.Item>
                                    </LinkContainer>
                                )

                            }
                            )
                        }
                    </ListGroup>
                </Col>
                <Col xs={8}>

                    {loading ? (<h1>Loading Items...</h1>) : error ? (<h1>Error while loading food Items...</h1>) : (
                        <>
                            {categoryName ? (
                                <Row className="mt-1">
                                    <Col><h1>{categoryName}</h1></Col>
                                    <Col>
                                        <LinkContainer to={"/admin/create-new-product"}>
                                            <Button className="float-right" variant="danger">Add new Product</Button>
                                        </LinkContainer>
                                    </Col>
                                </Row>

                            ) : (<Row className="mt-1">
                                <Col><h1>All Items</h1></Col>
                                <Col>
                                    <LinkContainer to={"/admin/create-new-product"}>
                                        <Button className="float-right" variant="danger">Add new Product</Button>
                                    </LinkContainer>
                                </Col>
                            </Row>)}
                            {
                                foodItems.map((foodItem) => {
                                    return (
                                        <Row key={foodItem._id} xs={1} md={2} className="g-4">
                                            <Col>

                                                <FoodItemForListComponent

                                                    foodItemId={foodItem._id}
                                                    image={foodItem.image}
                                                    name={foodItem.name}
                                                    description={foodItem.description}
                                                    size={foodItem.size}
                                                >
                                                </FoodItemForListComponent>
                                            </Col></Row>
                                    )
                                }
                                )
                            }
                        </>)}
                    {paginationLinksNumber > 1 ? (

                        <PaginationComponent
                            categoryName={categoryName}
                            paginationLinksNumber={paginationLinksNumber}
                            pageNum={pageNum}
                        ></PaginationComponent>

                    ) : null}

                </Col>
            </Row>
        </Container>
    );
}
export default FoodItemsComponent;