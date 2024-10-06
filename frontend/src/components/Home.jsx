import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreateDepartment from "./modals/CreateDepartment";
import UpdateDepartment from "./modals/UpdateDepartment";
import Context from "../store/Context";
import { useNavigate } from "react-router-dom";

function Home() {
  const {setDeptEmp} = useContext(Context)
  const navigate = useNavigate()

  const [showCreateDepartment, setShowCreateDepartment] = useState(false);
  const [showUpdateDepartment, setShowUpdateDepartment] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState();

  const handleShowUpdateDepartment = (item) => {
    setSelectedDepartment(item);
    setShowUpdateDepartment(true);
  };

  const [allDepartments, setAllDepartments] = useState([]);
  const handleFetchAllDepartments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/department/all-dept",
        {
          withCredentials: true,
        }
      );
      console.log(res.data.data);
      setAllDepartments(res.data.data);
    } catch (error) {
      console.log(
        error?.response?.data || "Error while fetching all departments"
      );
    }
  };

  useEffect(() => {
    handleFetchAllDepartments();
  }, []);

  const handleViewDepartment = (item) => {
setDeptEmp(item);
navigate("/home/dept-emp")
  }

  const handleDeleteDepartment = async (deptId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/department/delete-dept/${deptId}`,
        { withCredentials: true }
      );
      console.log(res.data.data);
      
      alert("Department deleted successfully");
      handleFetchAllDepartments();
    } catch (error) {
      console.log(error, "Error while deleting department");
    }
  };

  return (
    <div className="p-5 w-75 mx-auto">
      <CreateDepartment
        show={showCreateDepartment}
        onHide={() => setShowCreateDepartment(false)}
      />
      <UpdateDepartment
        show={showUpdateDepartment}
        onHide={() => setShowUpdateDepartment(false)}
        selectedDepartment={selectedDepartment}
      />
      <div className="fs-3 text-center fw-semibold mb-2">Department Table</div>
      <table className="table table-bordere border table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Department Name</th>
            <th scope="col">No of employees</th>
            <th scope="col">
              <button
                className="btn btn-sm btn-primary d-flex align-items-center justify-center "
                onClick={() => setShowCreateDepartment(true)}
              >
                <FaPlus /> &nbsp; Create Department
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {allDepartments?.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.departmentName}</td>
              <td>{item.employees.length}</td>
              <td>
                <span
                  className="px-2 text-decoration-underline text-primary pointer"
                  onClick={() => handleViewDepartment(item)}
                >
                  View
                </span>

                <span
                  className="px-2 border-start border-end border-dark text-decoration-underline text-primary pointer"
                  onClick={() => handleShowUpdateDepartment(item)}
                >
                  Update
                </span>

                <span
                  className="px-2  text-decoration-underline text-primary pointer"
                  onClick={() => handleDeleteDepartment(item._id)}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
