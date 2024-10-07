import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import img from "../assets/image-placeholder.png";
import { Link } from "react-router-dom";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employee");
        setEmployees(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (!loading && employees.length > 0) {
      const table = $("#employeeTable").DataTable({
        destroy: true,
      });

      return () => {
        table.destroy();
      };
    }
  }, [loading, employees]);

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/employee/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
      Swal.fire(
        'Deleted!',
        'Employee has been deleted.',
        'success'
      );
    } catch (err) {
      console.error(err);
      Swal.fire(
        'Error!',
        'Error deleting employee: ' + (err.response?.data?.message || err.message),
        'error'
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <Card.Footer>
        <p className="text-start">
          Employee: <span className="text-primary">Records</span>
        </p>
      </Card.Footer>
      <div className="text-end p-3">
        <Link to="/add-employee" className="btn btn-primary mb-4">
        <FontAwesomeIcon icon={faPlus} /> ADD EMPLOYEE
        </Link>
      </div>

      <Card>
        <Card.Body>
          <table id="employeeTable" className="table table-striped">
            <thead>
              <tr>
                <th>PHOTO</th>
                <th>Country</th>
                <th>Account Type</th>
                <th>Username</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Email Address</th>
                <th>Contact Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                const imageUrl = employee.photo
                  ? `http://localhost:5000/${employee.photo}`
                  : img;
                return (
                  <tr key={employee.id}>
                    <td>
                      <img
                        className="img-fluid"
                        src={imageUrl}
                        alt="No image available"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>
                    <td>{employee.country}</td>
                    <td>{employee.account_type}</td>
                    <td>{employee.username}</td>
                    <td>{employee.lastname}</td>
                    <td>{employee.firstname}</td>
                    <td>{employee.email_address}</td>
                    <td>{employee.contact_number}</td>
                    <td>
                      <Link to={`/edit-employee/${employee.id}`}>
                        <Button variant="warning" className="me-2">
                            <FontAwesomeIcon icon={faEdit} />
                          
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EmployeeList;
