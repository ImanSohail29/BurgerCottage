import { useEffect, useState } from "react"
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const AdminEditVendorComponent = ({ updateVendorApiRequest, fetchVendor }) => {
    const [validated, setValidated] = useState(false);
    const [vendor, setVendor] = useState([])
    const [updateVendorResponseState, setUpdateVendorResponseState] = useState({ message: "", error: "" });

    const { id } = useParams()
    const navigate = useNavigate();
    function replaceCharacter(str, replacement) {
        let strLength=str.length
        str=str.slice(1, strLength)
        return (
          replacement+str
        );
      }
      
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget.elements;
        const name = form.name.value;
        let phoneNumberString = form.phoneNumber.value;
    var phoneNumber=phoneNumberString.split(" ").join("")
    if(phoneNumber[0]!=="+")
    {
    phoneNumber=replaceCharacter(phoneNumber, '+92');
    }

        const email = form.email.value;
        const idCardNumber = form.idCardNumber.value;

        if (event.currentTarget.checkValidity() === true) {
            updateVendorApiRequest(id,name,phoneNumber,email,idCardNumber)
                .then(data => {
                    if (data === "vendor updated") {
                        navigate("/admin/vendors");
                    }
                }).catch(er => {
                    setUpdateVendorResponseState({ error: er.response.data.message ? er.response.data.message : er.response.data });
                })
        }

        setValidated(true)
    }
    useEffect(() => {
        fetchVendor(id).then(data => {
            console.log("Vendor Name: " + data.name)
            setVendor(data)
        })
            .catch((er) => {
                setUpdateVendorResponseState(
                    {
                        error: er.response.data.message ?
                            er.response.data.message : er.response.data
                    });
            })
    }, [id]
    )
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6} className="mb-3">
                    <h3>Edit Vendor</h3>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" defaultValue={vendor.name} required type="text"></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control name="phoneNumber" defaultValue={vendor.phoneNumber} required type="tel" maxLength="11"
                                placeholder="+923XXXXXXXXX"></Form.Control>
                            <Form.Control.Feedback type="invalid">Please enter a valid phone Number</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                defaultValue={vendor.email}
                                name="email"
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicIdCardNumber">
                            <Form.Label>ID Card Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter ID Card Number"
                                name="idCardNumber"
                                defaultValue={vendor.idCardNumber}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid ID Card Number</Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit">Update</Button>
                        {updateVendorResponseState.error}
                        </Form>
                </Col>
            </Row>
        </Container>
    )

}
  export default AdminEditVendorComponent