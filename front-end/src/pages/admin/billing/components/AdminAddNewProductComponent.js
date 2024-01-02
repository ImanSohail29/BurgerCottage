import { useEffect, useRef, useState } from "react";
import { Alert, Button, CloseButton, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminCreateProductPageComponent = ({ categories, createProductApiRequest, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest, reduxDispatch,addOnsApiRequest }) => {
    const sizeRef = useRef()
    const priceRef = useRef()
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState(false)
    const [sizeTable, setSizeTable] = useState([])
    const [sizeTableSize, setSizeTableSize] = useState(0)
    const [isCreating, setIsCreating] = useState("")
    const [selectedAddOns, setSelectedAddOns] = useState([])
    const [addOns, setAddOns] = useState([])
    const [error, setError] = useState(false);
    const [createProductResponseState, setCreateProductResponseState] = useState({ message: "", error: "" })
    const navigate = useNavigate()
    const addSize = () => {
        const size = sizeRef.current.value;
        const price = priceRef.current.value;
        sizeRef.current.value = "";
        priceRef.current.value = "";

        sizeTable.push({
            value: size,
            price: price
        })
        console.log(sizeTable)
        setSizeTable(sizeTable)
        setSizeTableSize(sizeTable.length)
    }
    const deleteSize = (index) => {
        sizeTable.splice(index, 1)
        setSizeTableSize(sizeTable.length)
    }
    const selectAddOn = (e, addOn, idx) => {
        const isChecked=e.target.checked;
        if(isChecked){
          setSelectedAddOns([...selectedAddOns,addOn])
        }
        else{
          selectedAddOns.splice(idx,1)
          setSelectedAddOns(selectedAddOns)
    
        }
    }
    useEffect(() => {
        addOnsApiRequest()
          .then((data) => {
            setAddOns(data);
          })
          .catch((er) =>
            setError(
              er.response.data.message ? er.response.data.message : er.response.data
            )
          );
      }, []);
    
    useEffect(() => { }, [sizeTable])
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            description: form.description.value,
            category: form.category.value,
            size: sizeTable,
            addOns:selectedAddOns
        }
        if (event.currentTarget.checkValidity() === true) {
            if (images.length > 1) {
                setIsCreating("Too many files ! ")
                return
            }
            createProductApiRequest(formInputs)
                .then(data => {
                    if (images) {
                        if (process.env.NODE_ENV === "production") {
                            uploadImagesCloudinaryApiRequest(images, data.foodItemId)
                            console.log(images)
                        } else {
                            uploadImagesCloudinaryApiRequest(images, data.foodItemId)
                            console.log(images)
                        //     uploadImagesApiRequest(images, data.productId)
                        //         .then(res => { })
                        //         .catch((er) => setIsCreating(er.response.data.message ? er.response.data.message : er.response.data))
                        // 
                    }
                    }
                    if (data.message === "food Item created") navigate("/foodItem-list")
                }).catch((er) => setCreateProductResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
        }
        setValidated(true);
    }
    const uploadHandler = (images) => {
        setImages(images)
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/admin/products" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>Add Food Item</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicNae">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" required as="textarea" rows={3}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category
                                <CloseButton></CloseButton>(<small>remove selected</small>)
                            </Form.Label>
                            <Form.Select required name="category" aria-label="Default select example">
                                <option value="">Choose category</option>
                                {categories.map((category, idx) => {
                                    return (<option key={idx} value={category.name}>{category.name}</option>)
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Row>
                                <Col>
                                    <Form.Control className="mb-1" ref={sizeRef} placeholder="Size" type="text"></Form.Control>
                                </Col>
                                <Col>
                                    <Form.Control className="mb-1" ref={priceRef} placeholder="price" type="number"></Form.Control>
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={addSize}>Add</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                        {console.log(sizeTableSize)}
                        {
                            sizeTableSize > 0 ? (
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sizeTable.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{item.value}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <CloseButton onClick={() => deleteSize(idx)} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            ) : (<></>)}
                        
                        <Form.Label>Select Add ons</Form.Label>
                        <Form>
                          {addOns.map((addOn, idx) => (
                            <div key={idx}>
                              <Form.Check type="checkbox">
                                <Form.Check.Input
                                  type="checkbox"
                                  onChange={(e) => selectAddOn(e,addOn, idx)}
                                />
                                <Form.Check.Label style={{ cursor: "pointer" }}>
                                  {addOn.name}
                                </Form.Check.Label>
                              </Form.Check>
                            </div>
                          ))}
                        </Form>
                        
                        <Form.Group className="mb-3" controlId="formBasicImages">
                            <Form.Label>Images</Form.Label>
                            <Form.Control name="image" required type="file" multiple onChange={(e) => uploadHandler(e.target.files)}>
                            </Form.Control> {isCreating}
                        </Form.Group>
                        <Button type="submit">Create</Button>
                        {createProductResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminCreateProductPageComponent;