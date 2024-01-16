import { Button, Col, Container, ListGroup, Pagination, Row, Image } from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent";
import FoodItemForListComponent from "../../components/FoodItemForListComponent";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import MetaComponent from "../../components/MetaComponent";
const FoodItemsComponent = ({ getFoodItems, categories, addProductApiRequest, discount,userInfo }) => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation()
    const navigate = useNavigate();
    const { categoryName } = useParams() || ""
    const { pageNumParam } = useParams() || 1
    const [foodItems, setFoodItems] = useState([])
    const [category, setCategory] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [paginationLinksNumber, setPaginationLinksNumber] = useState(null)
    const [pageNum, setPageNum] = useState(null)
    const [admin,setAdmin]=useState(false)
   

    useEffect(() => {
        if (categoryName) {
            setCategory(categoryName)
        }
        if(userInfo.isAdmin===true){
            setAdmin(true)
        }
    }, [categoryName,userInfo])

    useEffect(() => {
        getFoodItems(categoryName, pageNumParam)
            .then(data => {
                setFoodItems(data.foodItems)
                setPaginationLinksNumber(data.paginationLinksNumber)
                setPageNum(data.pageNum)
                setIsLoading(false)
                setLoaded(true)
            })
            .catch((er) => setError(er.response.data.message ? er.response.data.message : er.response.data))
    }, [categoryName, pageNumParam])

    return (
        <>
        <MetaComponent></MetaComponent>
        {loaded&&discount&&(discount.figure!==0||discount.image!==null)?(
            <Popup open={true}
            position="center"
            modal nested>
            {
                close => (
                    <>
                        <Button className="position-absolute top-0 end-0" style={{position:"absolute"}} onClick=
                                {() => close()}>
                                    x
                            </Button>
                        <Image crossOrigin="anonymous" src={discount.image}></Image>
                    </>
                )
            }

        </Popup>
        ):(""
        )}
            
            <Container fluid >
                <Row style={{ minHeight: "100vh" }}>
                    <Col xs={4} md={3} className="bg-dark text-white bg-opacity-50">
                        <h3>
                            Categories{"  "}
                            {admin?(
                                <LinkContainer to={"/admin/create-new-category"}>
                                <Button variant="danger">Add new Category</Button>
                            </LinkContainer>
                            ):("")}
                            
                        </h3>
                        <ListGroup variant="flush">
                            {
                                categories.map((categoryItem, idx) => {
                                    return (
                                        <LinkContainer className="bg-dark text-white bg-opacity-50" key={idx} style={{ minHeight: "100px", minWidth: "100px", cursor: "pointer" }} to={`/foodItem-list/category/${categoryItem.name}`}>
                                            <ListGroup.Item key={idx} >
                                                <Image style={{ maxWidth: "100px", maxHeight: "100px" }} crossOrigin="anonymous" src={categoryItem.image}></Image>
                                                {" "}{categoryItem.name}
                                            </ListGroup.Item>
                                        </LinkContainer>
                                    )

                                }
                                )
                            }
                        </ListGroup>
                    </Col>
                    <Col xs={8} className="mb-5">

                        {isLoading ? (<h1>Loading Items...</h1>) : error ? (<h1>Error while loading food Items...</h1>) : (
                            <>
                                {categoryName ? (
                                    <Row className="mt-1">
                                        <Col><h1>{categoryName}</h1></Col>
                                        <Col>{admin?(
                                            <LinkContainer to={"/admin/create-new-product"}>
                                            <Button className="float-right" variant="danger">Add new Product</Button>
                                        </LinkContainer>
                                        ):("")}
                                            
                                        </Col>
                                    </Row>

                                ) : (<Row className="mt-1">
                                    <Col><h1>All Items</h1></Col>
                                    {admin?( <Col>
                                        <LinkContainer to={"/admin/create-new-product"}>
                                            <Button className="float-right" variant="danger">Add new Product</Button>
                                        </LinkContainer>
                                    </Col>):("")}
                                   {admin?(<Col>
                                        <LinkContainer to={`/admin/discount/${'658d33e46aa2c1dd62a384ea'}`}>
                                            <Button className="float-right" variant="danger">Discount</Button>
                                        </LinkContainer>
                                    </Col>):("")}
                                    
                                </Row>)}
                                {
                                    foodItems.map((foodItem) => {
                                        let discountFigure=discount
                                        if(foodItem.category==="Deals"){
                                            discountFigure=0
                                        }
                                        return (


                                            <FoodItemForListComponent
                                                foodItemId={foodItem._id}
                                                image={foodItem.image}
                                                name={foodItem.name}
                                                description={foodItem.description}
                                                size={foodItem.size}
                                                discount={discountFigure}
                                            >
                                            </FoodItemForListComponent>

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
        </>
    );
}
export default FoodItemsComponent;