import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

import ImageZoom from "js-image-zoom";
import { useEffect, useState, useRef } from "react";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent"
import { useParams } from "react-router-dom";

const FoodItemDetailComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getFoodItemDetails,
  writeReviewApiRequest,
  discount
}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productReviewed, setProductReviewed] = useState(false);
  const [size, setSize] = useState()
  const [addOnAmount, setAddOnAmount] = useState(0)
  const [instructions, setInstructions] = useState([])
  const [addOns, setAddOns] = useState([])
  const [selectedAddOns, setSelectedAddOns] = useState([])
  const messagesEndRef = useRef(null);
  const myRefs = useRef([]);


  const addToCartHandler = () => {
    const sameProduct = false
    if (discount.figure > 0 && product.category !== "Deals") {
      size.price = Math.ceil((Number(size.price)) - (((Number(size.price)) * discount.figure) / 100) + (Number(addOnAmount)))
    }
    else {
      size.price = ((Number(size.price)) + (Number(addOnAmount)))
    }
    console.log(size.price)
    reduxDispatch(addToCartReduxAction({ id, quantity, size, instructions, sameProduct, selectedAddOns }))
    setShowCartMessage(true)
    setSize(product.size[0])
    setSelectedAddOns([])
    setQuantity(1)

  };

  const selectAddOn = (e, addOn, idx) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedAddOns([...selectedAddOns, addOn])
      setAddOnAmount((amount) => amount + addOn.price)
    }
    else {
      selectedAddOns.splice(idx, 1)
      setSelectedAddOns(selectedAddOns)
      setAddOnAmount((amount) => amount - addOn.price)

    }

    // let sum=0
    // let amount=0
    // console.log(selectedAddOns)
    // console.log(selectedAddOns.length)
    // if(selectedAddOns.length>0){
    //   console.log("hi")
    //   amount=selectedAddOns.forEach(addOn=>sum+=addOn.price)
    // }
    // size.price=size.price+amount
    // console.log(amount)

    // console.log(addOn.price)

    // console.log(size.price)
  };

  useEffect(() => {
    if (productReviewed) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 200)
    }
  }, [productReviewed])


  useEffect(() => {
    getFoodItemDetails(id)
      .then((data) => {
        setSize(data.size[0]);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
    if (product.category === "Deals") {
      discount = 0
    }
  }, [showCartMessage]);

  useEffect(() => {
    getFoodItemDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id, productReviewed, size]);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    }
    if (e.currentTarget.checkValidity() === true) {
      writeReviewApiRequest(product._id, formInputs)
        .then(data => {
          if (data === "review created") {
            setProductReviewed("You successfuly reviewed the page!");
          }
        })
        .catch((er) => setProductReviewed(er.response.data.message ? er.response.data.message : er.response.data));
    }
  }

  return (
    <>
      <Container>
        <AddedToCartMessageComponent
          showCartMessage={showCartMessage}
          setShowCartMessage={setShowCartMessage}
        />
        <Row className="mt-5">
          {loading ? (
            (<Col style={{textAlign:"center", justifyContent:"center"}}><h1 className="loader"></h1></Col>)
          ) : error ? (
            <h2>{error}</h2>
          ) : (
            <>
              <Col style={{ zIndex: 1 }} md={4}>
                {product.image ?

                  <Image
                    crossOrigin="anonymous"
                    fluid width={"100%"}
                    src={`${product.image.path ?? null}`} />

                  : null}
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={6}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h4>{product.name}</h4>
                      </ListGroup.Item>
                      {/* <ListGroup.Item>
                        <Rating
                          readonly
                          size={20}
                          initialValue={product.rating}
                        />{" "}
                        ({product.reviewsNumber})
                      </ListGroup.Item> */}
                      {(discount.figure > 0) && (product.category !== "Deals") ? (
                        <>
                          <ListGroup.Item>
                            Price:  <span className="fw-bold">Rs{Math.ceil((Number(size.price) - (Number(size.price) * Number(discount.figure)) / 100) + Number(addOnAmount))}/-</span>
                          </ListGroup.Item>
                        </>
                      ) : (
                        <ListGroup.Item>
                          Price:  <span className="fw-bold">Rs{Number(Number(size.price) + Number(addOnAmount))}/-</span>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item>
                        {product.size.length>1?(
                          <DropdownButton id="dropdown-basic-button" title={size.value} value={size.value} defaultValue={product.size[0]}>
                          {product.size.map((values, idx) => (
                            <Dropdown.Item key={idx} onClick={() => setSize(values)}>{values.value}</Dropdown.Item>
                          ))}
                        </DropdownButton>
                        ):(
                          ""
                        )}
                        
                      </ListGroup.Item>
                      {product.addOns.length > 0 ? (
                        <ListGroup.Item>
                          <span className="fw-bold">Add Ons</span>
                          <Form>
                            {product.addOns.map((addOn, idx) => (
                              <div key={idx}>
                                <Form.Check type="checkbox">
                                  <Form.Check.Input
                                    type="checkbox"
                                    onChange={(e) => selectAddOn(e, addOn, idx)}
                                  />
                                  <Form.Check.Label style={{ cursor: "pointer" }}>
                                    {addOn.name}
                                  </Form.Check.Label>
                                </Form.Check>                              </div>
                            ))}
                          </Form>
                        </ListGroup.Item>
                      ) : ("")}


                      <ListGroup.Item>{product.description}</ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <ListGroup>
                      {
                        (discount.figure > 0) && (product.category !== "Deals") ? (
                          <ListGroup.Item>
                            Total Discounted Price: <span className="fw-bold">Rs {size ? (((size.price) * quantity) - ((((size.price) * quantity) * (discount.figure)) / 100)) + (Number(addOnAmount) * quantity) : (0)}/-</span>
                          </ListGroup.Item>
                        ) : (
                          <ListGroup.Item>
                            Total Price: <span className="fw-bold">Rs {size ? ((((size.price) * quantity)) + Number(addOnAmount)) : (0)}/-</span>
                          </ListGroup.Item>
                        )
                      }
                      <ListGroup.Item>
                        Quantity:
                        <Button disabled={quantity === 1} onClick={() => setQuantity((value) => value - 1)}>-</Button>
                        <input type="number" min={1} className="w-25" value={quantity} onChange={(event) => {
                          setQuantity(event.target.value)
                          return (event.target.value)
                        }}></input>
                        <Button onClick={() => setQuantity((value) => value + 1)}>+</Button>

                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button onClick={addToCartHandler} variant="danger">
                          Add to cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
                {product.reviews.length>0?(
                  <Row>
                  <Col className="mt-5">
                    <h5>REVIEWS</h5>
                    <ListGroup variant="flush">
                      {product.reviews &&
                        product.reviews.map((review, idx) => (
                          <ListGroup.Item key={idx}>
                            {review.user.name} <br />
                            <Rating readonly size={20} initialValue={review.rating} />
                            <br />
                            {review.createdAt.substring(0, 10)} <br />
                            {review.comment}
                          </ListGroup.Item>
                        ))}
                      <div ref={messagesEndRef} />
                    </ListGroup>                 </Col>
                </Row>
                ):("")}
                
                <hr />
                {/* {!userInfo.name && <Alert variant="danger">Login first to write a review</Alert>} */}

                {/* <Form onSubmit={sendReviewHandler}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Write a review</Form.Label>
                    <Form.Control name="comment" required as="textarea" disabled={!userInfo.name} rows={3} />
                  </Form.Group>
                  <Form.Select name="rating" required disabled={!userInfo.name} aria-label="Default select example">
                    <option value="">Your rating</option>
                    <option value="5">5 (very good)</option>
                    <option value="4">4 (good)</option>
                    <option value="3">3 (average)</option>
                    <option value="2">2 (bad)</option>
                    <option value="1">1 (awful)</option>
                  </Form.Select>
                  <Button disabled={!userInfo.name} type="submit" className="mb-3 mt-3" variant="primary">
                    Submit
                  </Button>{" "}
                  {productReviewed}
                </Form> */}
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>

  );
};

export default FoodItemDetailComponent;
