import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";

function UpdateDepartment(props) {
  const handleUpdateDepartment = async (e) => {
    e.preventDefault();
    const deptId = props.selectedDepartment._id;

    const departmentName =
      e.target.elements.departmentName?.value ||
      props.selectedDepartment.departmentName;

    try {
      const res = await axios.post(
        `http://localhost:8000/api/department/update-dept/${deptId}`,
        { departmentName },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      alert("updated successfully")
      props.onHide();

    } catch (error) {
      console.log(error, "Error while updating Department details");
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
          Update Department Details
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={(e) => handleUpdateDepartment(e)}>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Department Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Department Name"
              name="departmentName"
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

export default UpdateDepartment;
