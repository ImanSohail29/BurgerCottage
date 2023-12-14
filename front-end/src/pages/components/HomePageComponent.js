import { Button, Card, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

const HomePageComponent = () => {
    useEffect(() => {       
    },[])
    return (
        <div className="bg" >
            <Container>
              <Row xs={1} md={2} className="g-4 p-1 m-1">
              <Link to={"/foodItem-list"} style={{textDecoration:'none', textAlign:"center"}}>   
                <Card className="bg-danger text-white p-5 m-4 bg-opacity-50 border-start" >
                <Card.Body>
                    <Card.Title style={{fontSize:"2em"}}>Billing</Card.Title>      
                </Card.Body>
            </Card>
            </Link>
            <Link to={"/"} style={{textDecoration:'none', textAlign:"center"}} >   
              <Card className="bg-danger text-white p-5 m-4 bg-opacity-50 border-start" >
              <Card.Body>
                  <Card.Title style={{fontSize:"2em"}}>Inventory</Card.Title>
                  
              </Card.Body>
          </Card>
          </Link>
          <Link to={"/admin/vendors"} style={{textDecoration:'none', textAlign:"center"}}>
            <Card className="bg-danger text-white p-5 m-4 bg-opacity-50 border-start" >
            <Card.Body>
                <Card.Title style={{fontSize:"2em"}}>Vendor</Card.Title>
               
            </Card.Body>
        </Card>
        </Link>
        <Link to={"/"} style={{textDecoration:'none', textAlign:"center"}}>
          <Card className="bg-danger text-white p-5 m-4 bg-opacity-50 border-start"  >
          <Card.Body>
              <Card.Title style={{fontSize:"2em" }}>Report</Card.Title>
             
          </Card.Body>
      </Card>
      </Link>
      </Row>
  </Container>
        </div>

    )
};
export default HomePageComponent;