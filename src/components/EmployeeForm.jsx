import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: "",
    accountType: "",
    username: "",
    lastName: "",
    firstName: "",
    email: "",
    contactNumber: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("country", formData.country);
    formDataToSend.append("account_type", formData.accountType);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("lastname", formData.lastName);
    formDataToSend.append("firstname", formData.firstName);
    formDataToSend.append("email_address", formData.email);
    formDataToSend.append("contact_number", formData.contactNumber);
    formDataToSend.append("photo", formData.photo);

    fetch('http://localhost:5000/api/employee/', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit the form");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Form submitted successfully", data);
        
        Swal.fire({
          title: 'Success!',
          text: 'Form submitted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate("/employee-list");
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        
        Swal.fire({
          title: 'Error!',
          text: 'Failed to submit the form. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <Container className="mt-5">
      <p className="text-start">
        Account: <span className="text-warning">Add Record</span>
      </p>

      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit} className="form-horizontal" style={{ width: '600px' }}>
          <Form.Group controlId="formCountry" className="mb-3 row">
            <Form.Label column sm={4}>Country</Form.Label>
            <div className="col-sm-8">
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Australia">Australia</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group controlId="formAccountType" className="mb-3 row">
            <Form.Label column sm={4}>Account Type</Form.Label>
            <div className="col-sm-8">
              <Form.Select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                required
              >
                <option value="">Select Account Type</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Intern">Intern</option>
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group controlId="formUsername" className="mb-3 row">
            <Form.Label column sm={4}>Username</Form.Label>
            <div className="col-sm-8">
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter Username"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formLastName" className="mb-3 row">
            <Form.Label column sm={4}>Last Name</Form.Label>
            <div className="col-sm-8">
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formFirstName" className="mb-3 row">
            <Form.Label column sm={4}>First Name</Form.Label>
            <div className="col-sm-8">
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3 row">
            <Form.Label column sm={4}>Email Address</Form.Label>
            <div className="col-sm-8">
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formContactNumber" className="mb-3 row">
            <Form.Label column sm={4}>Contact Number</Form.Label>
            <div className="col-sm-8">
              <Form.Control
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formPhoto" className="mb-3 row">
            <Form.Label column sm={4}>Photo</Form.Label>
            <div className="col-sm-8">
              <Form.Control
                type="file"
                name="photo"
                onChange={handleChange}
                accept="image/*"
              />
              <div className="mt-3">
                {formData.photo ? (
                  <img
                    src={URL.createObjectURL(formData.photo)}
                    alt="Selected"
                    style={{ width: '250px', height: '250px', objectFit: 'cover', border: '1px solid #ccc' }}
                  />
                ) : (
                  <p className="text-primary">No Photo Uploaded</p>
                )}
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3 row">
            <div className="col-sm-8 offset-sm-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default EmployeeForm;
