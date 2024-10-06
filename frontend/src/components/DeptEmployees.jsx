import React, { useContext, useEffect, useState } from "react";
import Context from "../store/Context";
import { FaPlus } from "react-icons/fa6";
import AddEmployee from "./modals/AddEmployee";

function DeptEmployees() {
  const { deptEmp } = useContext(Context);

  const [showAddEmp, setShowAddEmp] = useState();
  

  const handleShowAddEmp = () => {
    
    setShowAddEmp(true);
  };


  return (
    <div className="p-2 mx-auto">
      <AddEmployee
        show={showAddEmp}
        onHide={() => setShowAddEmp(false)}
        deptEmp={deptEmp}
      />
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-sm btn-primary d-flex align-items-center justify-center"
          onClick={() => handleShowAddEmp(deptEmp)}
        >
          <FaPlus /> &nbsp;Add Employee
        </button>
      </div>

      <div className="w-75 mx-auto p-5">
        <div className="fs-3 text-center fw-semibold mb-2">
          Employees of Department{" "}
        </div>
        <table className="table table-bordere border table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Email</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {deptEmp.employees?.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeptEmployees;
