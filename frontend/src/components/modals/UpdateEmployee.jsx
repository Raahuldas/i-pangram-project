import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";

function UpdateEmployee(props) {
  const empId = props.selectedEmp._id;

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name?.value || props.selectedEmp.name;
    const location = e.target.elements.location?.value || props.selectedEmp.location;
    const email = e.target.elements.email?.value || props.selectedEmp.email;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/employees/update-emp/${empId}`,
        {name, email, location},
        {withCredentials:true}
      );
      console.log(res);
      
    } catch (error) {
      console.log(error, "Error while updating employee details");
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Employee Details
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={(e) => handleUpdateEmployee(e)}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Employee Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Employee Name"
              name="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Employee Email"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Employee Location"
              name="location"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button className="btn-danger" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default UpdateEmployee;
