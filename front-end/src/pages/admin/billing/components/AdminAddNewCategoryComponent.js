import { useState } from "react";
import { Alert, Button, CloseButton, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const AdminAddNewCategoryComponent = ({ categories, createCategoryApiRequest, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest, reduxDispatch,insertCategory }) => {
    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState(false)
    const [isCreating, setIsCreating] = useState("")
    const [createCategoryResponseState, setCreateCategoryResponseState] = useState({ message: "", error: "" })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const formInputs = {
            name: form.name.value,
            description: form.description.value,
        }
        if (event.currentTarget.checkValidity() === true) {
            if (images.length > 1) {
                setIsCreating("Too many files, Select 1 ! ")
                return
            }
            createCategoryApiRequest(formInputs)
                .then(data => {
                    if (images) {
                        if (process.env.NODE_ENV === "production") {
                            uploadImagesCloudinaryApiRequest(images, data.categoryCreated._id)
                            console.log(images)
                        } else {
                            uploadImagesCloudinaryApiRequest(images, data.categoryCreated._id)
                            console.log(images)
                            //     uploadImagesApiRequest(images, data.productId)
                            //         .then(res => { })
                            //         .catch((er) => setIsCreating(er.response.data.message ? er.response.data.message : er.response.data))
                            // 
                        }
                    }
                    if (data.message === "category created"){ 
                        reduxDispatch(insertCategory(data))
                        navigate("/admin/products")}
                }).catch((er) => setCreateCategoryResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
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
                    <Link to="/foodItem-list" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>Add New Category</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" required type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicProductDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" as="textarea" rows={3}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicImages">
                            <Form.Label>Images</Form.Label>
                            <Form.Control name="image" required type="file" multiple onChange={(e) => uploadHandler(e.target.files)}>
                            </Form.Control> {isCreating}
                        </Form.Group>
                        <Button type="submit">Add</Button>
                        {createCategoryResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminAddNewCategoryComponent;