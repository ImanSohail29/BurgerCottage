import { useEffect, useState } from "react";
import { Button, CloseButton, Col, Container, Form, Row, Table, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateDiscount } from "../../../../redux/slices/discountSlice";

const AdminDiscountPageComponent = ({ fetchDiscount, updateDiscountApiRequest, imageDeleteHandler, uploadImagesApiRequest, uploadImagesCloudinaryApiRequest,reduxDispatch }) => {
    const [validated, setValidated] = useState(false);
    const [discount, setDiscount] = useState({})
    const [updateDiscountResponseState, setUpdateDiscountResponseState] = useState({ message: '', error: '' })
    const [imageRemoved, setImageRemoved] = useState(false)
    const [isUploading, setIsUploading] = useState("")
    const [imageUploaded, setImageUploaded] = useState(false)
    const { discountId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetchDiscount(discountId)
            .then((data) => {
                setDiscount(data)
                console.log(data)
            })
            .catch((er) => console.log(er))
            console.log("imageRemoved:"+imageRemoved)
    }, [discountId, imageRemoved, imageUploaded])
  
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
            figure: form.figure.value,
            description: form.description.value,
        }
        if (event.currentTarget.checkValidity() === true) {
            updateDiscountApiRequest(discountId, formInputs)
                .then(data => {
                    if (data.message === "discount updated")
                    {
                        console.log(data)
                        reduxDispatch(updateDiscount(data.data))
                        navigate("/admin/products")
                    } 
                })
                .catch((er) => setUpdateDiscountResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data }))
        }
        setValidated(true);
    }
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center mt-5">
                <Col md={1}>
                    <Link to="/foodItem-list" className="btn btn-warning my-3">Go Back</Link>
                </Col>
                <Col md={6} className="mb-3">
                    <h3>Edit discount</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicFigure">
                            <Form.Label>Discount Value</Form.Label>
                            <Form.Control name="figure" required type="text" defaultValue={discount.figure}></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDiscountDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" as="textarea" defaultValue={discount.description} rows={3}></Form.Control>
                        </Form.Group>                    
                         <Form.Group className="mb-3" controlId="formBasicImages">
                            <Form.Label>Image</Form.Label>
                            <Row className="mb-2">
                                {discount.image ? (
                                    <Col style={{ position: "relative" }} xs={3}>
                                        <Image
                                            crossOrigin="anonymous"
                                            src={discount.image ?? null}
                                            fluid>
                                        </Image>
                                        <i style={onHover} onClick={
                                            () => imageDeleteHandler(discount.image, discountId).then(setImageRemoved(!imageRemoved))
                                        } className="bi bi-x text-danger"></i>
                                    </Col>
                                ):("")}
                            </Row>
                            <Form.Control disabled={discount.image && discount.image.length >= 1} required={discount.images && discount.images.length === 0} name="image" type="file" multiple
                                onChange={e => {
                                    setIsUploading("upload files in progress ... ")
                                    if (process.env.NODE_ENV !== "production") {
                                        // uploadImagesApiRequest(e.target.files, id)
                                        //     .then(data => {
                                        //         setIsUploading("upload file completed ")
                                        //         setImageUploaded(!imageUploaded)
                                        //     })
                                        console.log("discountId:" + discountId)
                                        uploadImagesCloudinaryApiRequest(e.target.files, discountId)
                                        setTimeout(() => {
                                            setImageUploaded(!imageUploaded)
                                            setIsUploading("upload file completed. ")
                                        }, 5000)
                                    }
                                    else {
                                        console.log("discountId:" + discountId)
                                        uploadImagesCloudinaryApiRequest(e.target.files, discountId)
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
                        {updateDiscountResponseState.error ?? ""}
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};
export default AdminDiscountPageComponent;