import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Context from '../../store/Context';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';

function AddEmployee(props) {
    const {allEmp,fetchAllEmployees} = useContext(Context)
    const deptId = props.deptEmp._id;
    
console.log(allEmp, deptId,"all emp");

const handleAddEmpInDept =async (empId) => {
    try {
        const res = await axios.post(`http://localhost:8000/api/department/add-emp/${deptId}/${empId}`,
            {},
            {
                withCredentials:true
            }
        )
        console.log(res.data);
        alert("Added successfully")
        
    } catch (error) {
        console.log(error, "Error while Adding employee in department");
        
    }
}

useEffect(()=>{
    fetchAllEmployees();
  },[])

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Employee 
        </Modal.Title>
      </Modal.Header>
      
        <Modal.Body>
          <div className="mb-3">
          <table className="table table-bordere border table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Email</th>
            <th scope="col">Location</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allEmp?.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.location}</td>
              <td>
                <button className='btn-sm btn-danger btn d-flex justify-center align-items-center'
                onClick={()=>handleAddEmpInDept(item._id)}>
                    <FaPlus/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      
    </Modal>
  )
}

export default AddEmployee