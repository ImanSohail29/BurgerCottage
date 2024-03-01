import { Button, Col, Container, ListGroup, Pagination, Row, Image } from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent";
import FoodItemForListComponent from "../../components/FoodItemForListComponent";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import MetaComponent from "../../components/MetaComponent";


const FoodItemsComponent = ({ getFoodItems, categories, addProductApiRequest, discount, userInfo, dispatch, addToCartReduxAction }) => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation()
    const navigate = useNavigate();
    const [categoryName,setCategoryName] = useState('')
    const { pageNumParam } = useParams() || 1
    const [foodItems, setFoodItems] = useState([])
    const [category, setCategory] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [paginationLinksNumber, setPaginationLinksNumber] = useState(null)
    const [pageNum, setPageNum] = useState(null)
    const [admin, setAdmin] = useState(false)


    useEffect(() => {
        if (categoryName) {
            setCategory(categoryName)
        }
        if (userInfo.isAdmin === true) {
            setAdmin(true)
        }
    }, [categoryName, userInfo])

    // useEffect(() => {
    //     getFoodItems(categoryName, pageNumParam)
    //         .then(data => {
    //             setFoodItems(data.foodItems)
    //             setPaginationLinksNumber(data.paginationLinksNumber)
    //             setPageNum(data.pageNum)
    //             setIsLoading(false)
    //             setLoaded(true)
    //         })
    //         .catch((er) => setError(er.response.data.message ? er.response.data.message : er.response.data))
    // }, [categoryName, pageNumParam])
    useEffect(() => {
        getFoodItems()
            .then(data => {
                setFoodItems(data.foodItems)
                setPaginationLinksNumber(data.paginationLinksNumber)
                setPageNum(data.pageNum)
                setIsLoading(false)
                setLoaded(true)
            })
            .catch((er) => setError(er.response.data.message ? er.response.data.message : er.response.data))
    }, [])

    return (
        <>
            <MetaComponent></MetaComponent>
            {loaded && discount && (discount.figure !== 0 || discount.image !== null) ? (
                <Popup open={true}
                    position="center"
                    modal nested>
                    {
                        close => (
                            <>
                                <Button className="position-absolute top-0 end-0" style={{ position: "absolute" }} onClick=
                                    {() => close()}>
                                    x
                                </Button>
                                <Image crossOrigin="anonymous" src={discount.image}></Image>
                            </>
                        )
                    }

                </Popup>
            ) : (""
            )}

            <Container fluid >
                <Row style={{ minHeight: "100vh" }}>
                    <Col md={3} xs={4} className="bg-dark text-white bg-opacity-50">
                        <h3>
                            Categories{"  "}
                            {admin ? (
                                <LinkContainer to={"/admin/create-new-category"}>
                                    <Button variant="danger">Add new Category</Button>
                                </LinkContainer>
                            ) : ("")}

                        </h3>
                        <ListGroup variant="flush">
                            {
                                categories.map((categoryItem, idx) => {
                                    return (
                                        <ListGroup className="bg-dark text-white bg-opacity-50" key={idx} style={{ minHeight: "100px", minWidth: "100px", cursor: "pointer" }}>
                                            <ListGroup.Item  key={idx}  onClick={()=>setCategoryName(categoryItem.name)} >
                                                <Image style={{ maxWidth: "100px", maxHeight: "100px" }} crossOrigin="anonymous" src={categoryItem.image}></Image>
                                                {" "}{categoryItem.name}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    )

                                }
                                )
                            }
                        </ListGroup>
                    </Col>
                    <Col md={9} xs={8} className="mb-5">

                        {isLoading ? (<Col style={{ textAlign: "center", justifyContent: "center" }}><h1 className="loader"></h1></Col>) : error ? (<h1>Error while loading food Items...</h1>) : (
                            <>
                                {categoryName ? (
                                    <Row className="mt-1">
                                        <Col><h1>{categoryName}</h1></Col>
                                        <Col>{admin ? (
                                            <LinkContainer to={"/admin/create-new-product"}>
                                                <Button className="float-right" variant="danger">Add new Product</Button>
                                            </LinkContainer>
                                        ) : ("")}

                                        </Col>
                                    </Row>

                                ) : (<Row className="mt-1">
                                    <Col><h1>All Items</h1></Col>
                                    {admin ? (<Col>
                                        <LinkContainer to={"/admin/create-new-product"}>
                                            <Button className="float-right" variant="danger">Add new Product</Button>
                                        </LinkContainer>
                                    </Col>) : ("")}
                                    {admin ? (<Col>
                                        <LinkContainer to={`/admin/discount/${'658d33e46aa2c1dd62a384ea'}`}>
                                            <Button className="float-right" variant="danger">Discount</Button>
                                        </LinkContainer>
                                    </Col>) : ("")}

                                </Row>)}

                                <Row sm={2} md={3} lg={4} className="m-1">
                                    {foodItems.filter((fooditem) => {
                                        return (categoryName === '')
                                            ? true
                                            : (categoryName !== '')
                                                ? fooditem.category === categoryName
                                                : null
                                    }).map((foodItem) => {
                                        let discountFigure = discount
                                        if (foodItem.category === "Deals") {
                                            discountFigure = 0
                                        }
                                        return (


                                            <FoodItemForListComponent
                                                foodItemId={foodItem._id}
                                                image={foodItem.image}
                                                name={foodItem.name}
                                                description={foodItem.description}
                                                size={foodItem.size}
                                                discount={discountFigure}
                                                category={foodItem.category}
                                                dispatch={dispatch}
                                                addToCartReduxAction={addToCartReduxAction}
                                            >
                                            </FoodItemForListComponent>

                                        )
                                    }
                                    )}
                                </Row>


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
        </>
    );
}
export default FoodItemsComponent;