import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/styles.css";
import { baseUrl, baseFileUrl } from "./../config/baseUrl";

import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Axios from "axios";
class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  componentDidMount() {
    Axios.get(baseUrl + `/auth/getUserDetails?id=${this.props.match.params.id}`)
      .then((response) => {
        console.log("response", response.data.data);

        this.setState({
          user: response.data.data,
        });
      })

      .catch((error) => {});
  }
  render() {
    return (
      <>
        <Container className='margin-top '>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <h3 className='text-center'>User Details</h3>
              {this.state.user !== null ? (
                <Card style={{ width: "30rem" }}>
                  <Card.Img
                  style={{marginLeft:"30%",maxWidth:"191px",marginTop:"20px"}}
                    variant='top'
                    src={baseFileUrl + this.state.user.profile}
                  />
                  <Card.Body style={{textAlign:"center"}}>
                    <Card.Title>First Name :{this.state.user.firstName}</Card.Title>
                    <Card.Title>Last Name :{this.state.user.lastName}</Card.Title>
                    <Card.Title>Email : {this.state.user.email}</Card.Title>
                    <Card.Title>Phone :{this.state.user.phone}</Card.Title>
                  </Card.Body>
                </Card>
              ) : (
                <h6>Loading</h6>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default AllUsers;
