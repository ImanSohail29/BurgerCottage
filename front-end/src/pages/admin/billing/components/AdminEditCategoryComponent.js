import { useEffect, useState } from "react";
import { Button, CloseButton, Col, Container, Form, Row, Table, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const AdminEditCategoryComponent = ({ fetchProduct, updateProductApiRequest, imageDeleteHandler, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest }) => {
    const [validated, setValidated] = useState(false);
    const [product, setProduct] = useState({})
    const [updateProductResponseState, setUpdateProductResponseState] = useState({ message: '', error: '' })
    const [imageRemoved, setImageRemoved] = useState(false)
    const [isUploading, setIsUploading] = useState("")
    const [imageUploaded, setImageUploaded] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetchProduct(id)
            .then((data) => {
                setProduct(data)
                console.log(data)
            })
            .catch((er) => console.log(er))
            console.log("imageRemoved:"+imageRemoved)
    }, [id, imageRemoved, imageUploaded])
  
    const onHover = {
        cursor: "pointer",
        position: "absolute",
        left: "5px",
        top: "-10px",
        transform: "scale(2.3)"
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            description: form.description.value,
        }
        if (event.currentTarget.checkValidity() === true) {
            updateProductApiRequest(id, formInputs)
                .then(data => {
                    if (data.message === "category updated") navigate("/admin/products")
                })
                .catch((er) => setUpdateProductResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
        }
        setValidated(true);
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/admin/products" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>Edit product</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicNae">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text" defaultValue={product.name}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" as="textarea" defaultValue={product.description} rows={3}></Form.Control>
                        </Form.Group>                    
                         <Form.Group className="mb-3" controlId="formBasicImages">
                            <Form.Label>Images</Form.Label>
                            <Row className="mb-2">
                                {product.image ? (
                                    <Col style={{ position: "relative" }} xs={3}>
                                        <Image
                                            crossOrigin="anonymous"
                                            src={product.image ?? null}
                                            fluid>
                                        </Image>
                                        <i style={onHover} onClick={
                                            () => imageDeleteHandler(product.image, id).then(setImageRemoved(!imageRemoved))
                                        } className="bi bi-x text-danger"></i>
                                    </Col>
                                ):("")}
                            </Row>
                            <Form.Control disabled={product.image && product.image.length >= 1} required={product.images && product.images.length === 0} name="image" type="file" multiple
                                onChange={e => {
                                    setIsUploading("upload files in progress ... ")
                                    if (process.env.NODE_ENV !== "production") {
                                        // uploadImagesApiRequest(e.target.files, id)
                                        //     .then(data => {
                                        //         setIsUploading("upload file completed ")
                                        //         setImageUploaded(!imageUploaded)
                                        //     })
                                        console.log("id:" + id)
                                        uploadImagesCloudinaryApiRequest(e.target.files, id)
                                        setTimeout(() => {
                                            setImageUploaded(!imageUploaded)
                                            setIsUploading("upload file completed. ")
                                        }, 5000)
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
                        <Button type="submit">UPDATE</Button>
                        {updateProductResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminEditCategoryComponent;