import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/styles.css";
import SweetAlert from "@sweetalert/with-react";
import { baseUrl } from "./../config/baseUrl";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      profile: "",
      file: "",
      firstNameLable: false,
      lastNameLable: false,
      emailLable: false,
      phoneLable: false,
      passwordLable: false,
      fileLable: false,
      fileErrorText: "",
      emailErrorText: "",
      passwordErrorText: "",
      phoneErrorText: "",
      firstNameErrorText: "First Name Is Required",
      lastNameErrorText: "Last Name Is Required",
    };
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
    this.handlephone = this.handlephone.bind(this);
  }
  handlephone = (value) => {
    console.log(value);
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
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
      passwordLable: false,
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
  //var regex = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
  //!regex.test($("#email").val())

  handleAddUser = (e) => {
    var regex = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
    e.preventDefault();
    console.log(this.state);
    const { firstName, lastName, email, phone, password, file } = this.state;
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
    } else if (password == "") {
      this.setState({
        passwordLable: true,
        passwordErrorText: "Please Provide A Password",
      });
      return false;
    } else if (password.length < 6) {
      this.setState({
        passwordLable: true,
        passwordErrorText: "Password Must Atleast 6 Characters Long",
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
    } else if (file == "") {
      this.setState({
        fileLable: true,
        fileErrorText: "Please Choose An Image To Upload",
      });
      return false;
    } else {
      //Calling APIs HERE
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
                // this.props.userSignupRequest(this.state);
                Axios.post(baseUrl + "/auth/register", this.state)

                  .then((response) => {
                    SweetAlert(
                      <div style={{ color: "green" }}>
                        <h1>
                          {" "}
                          <strong>Success!</strong>
                        </h1>
                        <p style={{ fontSize: "20px" }}>
                          Account Created Successfully
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
    }
  };
  render() {
    return (
      <>
        <Container className='margin-top '>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <h3 className='text-center'>Add User</h3>
              <Form onSubmit={this.handleAddUser}>
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

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handlePassword}
                  />
                  {this.state.passwordLable ? (
                    <Form.Text className='text-danger'>
                      {this.state.passwordErrorText}
                    </Form.Text>
                  ) : null}
                </Form.Group>

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

                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type='file'
                    onChange={this.handleFileUpload}
                    accept='image/*'
                  />
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
export default AddUser;
