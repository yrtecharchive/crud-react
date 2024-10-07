import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    country: "",
    account_type: "",
    username: "",
    lastname: "",
    firstname: "",
    email_address: "",
    contact_number: "",
    photo: null,
    existingPhoto: "", 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`);
        setEmployee({ ...response.data, existingPhoto: response.data.photo });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setEmployee((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setEmployee((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(employee).forEach((key) => {
      formData.append(key, employee[key]);
    });

    try {
      await axios.put(`http://localhost:5000/api/employee/${id}`, formData);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Employee updated successfully.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/employee-list");
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update employee.",
        confirmButtonText: "Try Again",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container className="mt-5">
      <p className="text-start">
        Account: <span className="text-warning">Edit Record</span>
      </p>

      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit} className="form-horizontal" style={{ width: '600px' }}>
          <Form.Group controlId="formCountry" className="mb-3 row">
            <Form.Label column sm={4}>Country</Form.Label>
            <div className="col-sm-8">
              <Form.Select
                name="country"
                value={employee.country}
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
                name="account_type"
                value={employee.account_type}
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
                value={employee.username}
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
                name="lastname"
                value={employee.lastname}
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
                name="firstname"
                value={employee.firstname}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="formEmailAddress" className="mb-3 row">
            <Form.Label column sm={4}>Email Address</Form.Label>
            <div className="col-sm-8">
              <Form.Control
                type="email"
                name="email_address"
                value={employee.email_address}
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
                type="text"
                name="contact_number"
                value={employee.contact_number}
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
                {employee.photo ? (
                  typeof employee.photo === 'string' ? (
                    <img
                      src={`http://localhost:5000/${employee.photo}`}
                      alt="Employee"
                      style={{ maxWidth: "100px", marginBottom: "10px" }}
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(employee.photo)}
                      alt="Preview"
                      style={{ maxWidth: "100px", marginBottom: "10px" }}
                    />
                  )
                ) : (
                  <p className="text-start text-primary">No Photo Uploaded</p>
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

export default UpdateForm;
