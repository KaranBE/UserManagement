import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/styles.css";
import SweetAlert from "@sweetalert/with-react";
import { baseUrl, baseFileUrl } from "./../config/baseUrl";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Axios from "axios";
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      profile: "",
      file: "",
      id: null,
      firstNameLable: false,
      lastNameLable: false,
      emailLable: false,
      phoneLable: false,
      firstNameErrorText: "First Name Is Required",
      lastNameErrorText: "Last Name Is Required",
      fileLable: false,
      fileErrorText: "",
      emailErrorText: "",

      phoneErrorText: "",
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.handlephone = this.handlephone.bind(this);
  }
  componentDidMount() {
    Axios.get(baseUrl + `/auth/getUserDetails?id=${this.props.match.params.id}`)
      .then((response) => {
        this.setState(
          {
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            email: response.data.data.email,
            id: response.data.data._id,
            phone: response.data.data.phone.toString(),
            profile: response.data.data.profile,
            user: response.data.data,
          },
          () => {
            console.log(this.state);
          }
        );
      })

      .catch((error) => {});
  }
  handlephone = (value) => {
    this.setState({
      phone: value,
      phoneLable: false,
    });
  };
  handleFileUpload = (e) => {
    this.setState({
      file: e.target.files[0],
      fileLable: false,
    });
  };
  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
      emailLable: false,
    });
  };

 handleFirstName = (e) => {
    this.setState({
      firstName: e.target.value,
      firstNameLable: false,
    });
  };
  handleLastName = (e) => {
    this.setState({
      lastName: e.target.value,
      lastNameLable: false,
    });
  };
  // regex = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;

  handleEditUser = (e) => {
    var regex = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
    e.preventDefault();
    console.log(this.state);
    const { firstName, lastName, email, phone, file } = this.state;
    if (firstName == "") {
      this.setState({
        firstNameLable: true,
      });
      return false;
    }
    if (lastName == "") {
      this.setState({
        lastNameLable: true,
      });
      return false;
    } else if (email == "") {
      this.setState({
        emailLable: true,
        emailErrorText: "Please Enter Email",
      });
      return false;
    } else if (!regex.test(email)) {
      this.setState({
        emailLable: true,
        emailErrorText: "Please Enter A Valid Email",
      });
      return false;
    } else if (phone == "") {
      this.setState({
        phoneLable: true,
        phoneErrorText: "Phone Number Is Required",
      });
      return false;
    } else if (phone.startsWith("+1") && phone.length !== 12) {
      this.setState({
        phoneLable: true,
        phoneErrorText: "US Phone Number Must Have 10 Digits Only",
      });
      return false;
    } else if (phone.startsWith("+61") && phone.length !== 12) {
      this.setState({
        phoneLable: true,
        phoneErrorText: "Austrlian Phone Number Must Have 9 Digits Only",
      });
      return false;
    } else if (phone.startsWith("+91") && phone.length !== 13) {
      this.setState({
        phoneLable: true,
        phoneErrorText: "Indian Phone Number Must Have 10 Digits Only",
      });
      return false;
    } else if (phone.startsWith("+44") && phone.length !== 13) {
      this.setState({
        phoneLable: true,
        phoneErrorText: "UK Phone Number Must Have 10 Digits Only",
      });
      return false;
    } else {
      //Calling APIs HERE
      //checking if there's a file uploaded by the user
      if (file !== "") {
        var formData = new FormData();
        formData.append("publicUpload", file);
        fetch(`${baseUrl}/uploads/publicUploads`, {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            if (json.success) {
              this.setState(
                {
                  profile: json.data,
                },
                () => {
                  Axios.post(baseUrl + "/auth/updateUser", this.state)

                    .then((response) => {
                      console.log("after update", response);
                      SweetAlert(
                        <div style={{ color: "green" }}>
                          <h1>
                            {" "}
                            <strong>Success!</strong>
                          </h1>
                          <p style={{ fontSize: "20px" }}>
                            User Updated Successfully
                          </p>
                        </div>
                      );
                      this.props.history.push("/");
                    })
                    .catch((error) => {
                      SweetAlert(
                        <div style={{ color: "red" }}>
                          <h1>
                            {" "}
                            <strong>Error!</strong>
                          </h1>
                          <p style={{ fontSize: "20px" }}>
                            {error.response.data.error}
                          </p>
                        </div>
                      );
                    });
                }
              );
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        //if there's no file uploaded
        Axios.post(baseUrl + "/auth/updateUser", this.state)

          .then((response) => {
            console.log("after update", response);
            SweetAlert(
              <div style={{ color: "green" }}>
                <h1>
                  {" "}
                  <strong>Success!</strong>
                </h1>
                <p style={{ fontSize: "20px" }}>User Updated Successfully</p>
              </div>
            );
            this.props.history.push("/");
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
      }
    }
  };
  render() {
    return (
      <>
        <Container className='margin-top '>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <h3 className='text-center'>Update User</h3>
              <Form onSubmit={this.handleEditUser}>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter First Name'
                    value={this.state.firstName}
                    onChange={this.handleFirstName}
                  />
                  {this.state.firstNameLable ? (
                    <Form.Text className='text-danger'>
                      {this.state.firstNameErrorText}
                    </Form.Text>
                  ) : null}
                </Form.Group>

                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Last Name'
                    value={this.state.lastName}
                    onChange={this.handleLastName}
                  />
                  {this.state.lastNameLable ? (
                    <Form.Text className='text-danger'>
                      {this.state.lastNameErrorText}
                    </Form.Text>
                  ) : null}
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={this.state.email}
                    onChange={this.handleEmail}
                  />
                  {this.state.emailLable ? (
                    <Form.Text className='text-danger'>
                      {this.state.emailErrorText}
                    </Form.Text>
                  ) : null}
                </Form.Group>
                 {
                   this.state.phone !=="" ?
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Phone</Form.Label>
                  <PhoneInput
                    placeholder='Enter phone number'
                    value={this.state.phone}
                    onChange={this.handlephone}
                  />
                  {this.state.phoneLable ? (
                    <Form.Text className='text-danger'>
                      {this.state.phoneErrorText}
                    </Form.Text>
                  ) : null}
                </Form.Group>
                :null
                 }     
                

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type='file'
                    onChange={this.handleFileUpload}
                    accept='image/*'
                  />
                  <Card style={{ width: "20rem",marginTop:"20px" }}>
                    <Card.Img
                    style={{
                      maxWidth: "100px",maxHeight: "120px",marginLeft: "34%"
                    }}
                      variant='top'
                      src={baseFileUrl + this.state.profile}
                    />
                  </Card>
                  {this.state.fileLable ? (
                    <Form.Text className='text-danger'>
                      {this.state.fileErrorText}
                    </Form.Text>
                  ) : null}
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
export default EditUser;
