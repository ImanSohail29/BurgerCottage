import { Button, Col, Container, ListGroup, Pagination, Row, Image } from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent";
import FoodItemForListComponent from "../../components/FoodItemForListComponent";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
const FoodItemsComponent = ({ getFoodItems, categories }) => {
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
            <Row style={{height:"100vh"}}>
                <Col xs={3} style={{ backgroundColor: " rgb(148, 30, 22)" }}>
                    <ListGroup variant="flush">
                        {
                            categories.map((categoryItem, idx) => {
                                return (
                                <LinkContainer style={{ cursor: "pointer" }} to={`/foodItem-list/category/${categoryItem.name}`}>
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
                    {loading ? (<h1>Loading Items...</h1>) : error ? (<h1>Error while loading food Items...</h1>) : (foodItems.map((foodItem) => {
                        return (
                            <Row key={foodItem._id} xs={1} md={2} className="g-4">
<Col>
                            <FoodItemForListComponent
                                
                                foodItemId={foodItem._id}
                                image={foodItem.image}
                                name={foodItem.name}
                                description={foodItem.description}
                                price={foodItem.price}
                            >
                            </FoodItemForListComponent>
</Col></Row>
                        )
                    }))}
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