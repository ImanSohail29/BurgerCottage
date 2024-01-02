import { useEffect, useRef, useState } from "react";
import { Alert, Button, CloseButton, Col, Container, Form, Image, Row, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminCreateProductPageComponent = ({ fetchProduct, categories, updateProductApiRequest, imageDeleteHandler, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest, addOnsApiRequest }) => {
    const sizeRef = useRef()
    const priceRef = useRef()
    const [product, setProduct] = useState({})
    const [chosenCategory, setChosenCategory] = useState("Choose Category")
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState(false)
    const [error, setError] = useState(false);
    const [selectedAddOns, setSelectedAddOns] = useState([])
    const [addOns, setAddOns] = useState([])
    const [sizeTable, setSizeTable] = useState([])
    const [sizeTableSize, setSizeTableSize] = useState(0)
    const [isCreating, setIsCreating] = useState("")
    const [createProductResponseState, setCreateProductResponseState] = useState({ message: "", error: "" })
    const [imageRemoved, setImageRemoved] = useState(false)
    const [isUploading, setIsUploading] = useState("")
    const [imageUploaded, setImageUploaded] = useState(false)
    const { id } = useParams()
    const onHover = {
        cursor: "pointer",
        position: "absolute",
        left: "5px",
        top: "-10px",
        transform: "scale(2.3)"
    }
    useEffect(() => {
        fetchProduct(id)
            .then((data) => {
                setChosenCategory(data.category)
                setSizeTable(data.size)
                setSizeTableSize(data.size.length)
                setProduct(data)
                console.log(data)
            })
            .catch((er) => console.log(er))
        console.log("imageRemoved:" + imageRemoved)
    }, [id, imageRemoved, imageUploaded])
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
        const isChecked = e.target.checked;
        if (isChecked) {
            setSelectedAddOns([...selectedAddOns, addOn])
        }
        else {
            selectedAddOns.splice(idx, 1)
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
            addOns: selectedAddOns
        }
        if (event.currentTarget.checkValidity() === true) {
            if (images.length > 1) {
                setIsCreating("Too many files ! ")
                return
            }
            updateProductApiRequest(id, formInputs)
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
                    if (data.message === "food Item updated") navigate("/foodItem-list")
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
                    <h3>Edit Food Item</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text" defaultValue={product.name}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" required as="textarea" defaultValue={product.description} rows={3}></Form.Control>
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
                        <Form.Group className="mb-3" controlId="formBasicCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={(e) => setChosenCategory(e.target.value)} required name="category" aria-label="Default select example">
                                <option value="">Choose category</option>
                                {categories.map((category, idx) => {
                                    if (category.name === product.category) {
                                        return (
                                            <option selected key={idx} value={category.name}>
                                                {category.name}
                                            </option>
                                        )
                                    }
                                    else {
                                        return (
                                            <option key={idx} value={category.name}>
                                                {category.name}
                                            </option>
                                        )
                                    }
                                })}
                            </Form.Select>
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
                                            onChange={(e) => selectAddOn(e, addOn, idx)}
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
                            <Row className="mb-2">
                                {product.image ? (
                                    <Col style={{ position: "relative" }} xs={3}>
                                        <Image
                                            crossOrigin="anonymous"
                                            src={product.image.path ?? null}
                                            fluid>
                                        </Image>
                                        <i style={onHover} onClick={
                                            () => imageDeleteHandler(product.image.path, id).then(setImageRemoved(!imageRemoved))
                                        } className="bi bi-x text-primary"></i>
                                    </Col>
                                ) : ("")}
                            </Row>
                            <Form.Control disabled={product.image && product.image.length >= 1} required={product.image && product.image.length === 0} name="image" type="file" multiple
                                onChange={e => {
                                    setIsUploading("upload files in progress ... ")
                                    if (process.env.NODE_ENV !== "production") {
                                        console.log("id:" + id)
                                        uploadImagesCloudinaryApiRequest(e.target.files, id)
                                        setTimeout(() => {
                                            setImageUploaded(!imageUploaded)
                                            setIsUploading("upload file completed. ")
                                        }, 5000)
                                        // uploadImagesApiRequest(e.target.files, id)
                                        //     .then(data => {
                                        //         setIsUploading("upload file completed ")
                                        //         setImageUploaded(!imageUploaded)
                                        //     })
                                    }
                                    else {
                                        console.log("id:" + id)
                                        uploadImagesCloudinaryApiRequest(e.target.files, id)
                                        setTimeout(() => {
                                            setImageUploaded(!imageUploaded)
                                            setIsUploading("upload file completed. ")
                                        }, 5000)

                                    }
                                }
                                }></Form.Control>
                            {isUploading}
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