import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";

function CreateDepartment(props) {
    const handleCreateDepartment = async (e) => {
        e.preventDefault();
        const departmentName = e.target.elements.departmentName?.value;
        if (!departmentName) {
            alert("Please enter Department name");
        }
        try {
          const res = await axios.post(
            "http://localhost:8000/api/department/create",
            {departmentName},
            {
              withCredentials: true,
            }
          );
          console.log(res.data);
          alert("Department Created Successfully");
          props.onHide();
        } catch (error) {
          console.log( error?.response?.data || "Error while creating department");
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
          Create Department
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={(e)=>handleCreateDepartment(e)}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="dname" className="form-label">
              Department Name
            </label>
            <input
              type="text"
              className="form-control"
              id="dname"
              placeholder="Department Name"
              name="departmentName"
            />
          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button className="btn-danger" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CreateDepartment;
