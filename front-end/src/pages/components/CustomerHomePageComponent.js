import { Button, Container,Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import MetaComponent from "../../components/MetaComponent";

const CustomerHomePageComponent = () => {
    return (
        <>            <MetaComponent></MetaComponent>
            <div className="bg" >
                <Container>
                    <Row xs={1} md={2} className="g-4 p-1 m-1">
                        <LinkContainer to="/fooditem-list" className="btn btn-warning my-3">Order Online</LinkContainer>
                    </Row>
                </Container>
            </div>
        </>


    )
}
export default CustomerHomePageComponent;