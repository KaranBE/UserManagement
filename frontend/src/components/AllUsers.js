import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/styles.css";
import { baseUrl, baseFileUrl } from "./../config/baseUrl";
import SweetAlert from "@sweetalert/with-react";
import { Button, Container, Row, Col, Table, Image } from "react-bootstrap";
import Axios from "axios";
class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete = (user) => (e) => {
    e.preventDefault();

    Axios.post(baseUrl + "/auth/deleteUser", user)

      .then((response) => {
        console.log(response);
        SweetAlert(
          <div style={{ color: "green" }}>
            <h1>
              {" "}
              <strong>Success!</strong>
            </h1>
            <p style={{ fontSize: "20px" }}>User Deleted Successfully</p>
          </div>
        );
        window.location="/";
      })
      .catch((error) => {
        SweetAlert(
          <div style={{ color: "red" }}>
            <h1>
              {" "}
              <strong>Error!</strong>
            </h1>
            <p style={{ fontSize: "20px" }}>{error.response.data.error}</p>
          </div>
        );
      });
  };
  componentDidMount() {
    Axios.get(baseUrl + "/auth/getAllUsers")
      .then((response) => {
        console.log("response", response);
        this.setState({
          users: response.data.data,
        });
      })

      .catch((error) => {});
  }
  render() {
    return (
      <>
        <Container className='margin-top '>
          <Row>
            <Col md={1}></Col>
            <Col md={10}>
              <h3 className='text-center'>All Users </h3>
              <Button
                href={`/addUser`}
                variant='primary'
                className='float-right mb-2'
              >
                Add User
              </Button>{" "}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.length > 0 ? (
                    this.state.users.map((user) => {
                      return (
                        <tr key={user._id}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>
                            <Image style={{maxWidth: "107px",maxHeight: "108px"}} src={baseFileUrl + user.profile} thumbnail />{" "}
                          </td>
                          <td>

                            <Button
                              href={`/user/${user._id}`}
                              variant='primary'
                            >
                              Details
                            </Button>
                            <Button
                              href={`/edit/${user._id}`}
                              variant='warning'
                            >
                              Update
                            </Button>
                            <Button
                              onClick={this.handleDelete(user)}
                              variant='danger'
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan='6'>No User</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default AllUsers;
