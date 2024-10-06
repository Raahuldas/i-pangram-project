import React from "react";
import { Button, Card, Modal } from "react-bootstrap";

function ViewEmployee(props) {
  console.log(props, "props");

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Employee Details
        </Modal.Title>
      </Modal.Header>
      
        <Modal.Body>
          <div className="mb-3">
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Name: {props.selectedEmp?.name}</Card.Title>

                <Card.Text>
                  Email: {props.selectedEmp?.email} <br />
                  Location: {props.selectedEmp?.location} <br />
                  Employee ID: {props.selectedEmp?._id}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      
    </Modal>
  );
}

export default ViewEmployee;
