import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Context from "../store/Context";
import ViewEmployee from "./modals/ViewEmployee";
import UpdateEmployee from "./modals/UpdateEmployee";

function AllEmployees() {
  const [selectedEmp, setSelectedEmp] = useState({});
  const [viewEmp, setViewEmp] = useState();
  const [showUpdateEmp, setShowUpdateEmp] = useState();

  const handleViewEmp = (item) => {
    setSelectedEmp(item);
    setViewEmp(true);
  };

  const handleUpdateEmp = (item) => {
    setSelectedEmp(item);
    setShowUpdateEmp(true);
  };

  const handleDeleteEmp = async (item) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/employees/delete-emp/${item._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error, "Error while deleting Employee");
    }
  };

  const { sortBy, sortType } = useContext(Context);
  const [employees, setEmployees] = useState([]);

  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/employees/all-emp?sortType=${sortType}&sortBy=${sortBy}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setEmployees(res.data.data);
    } catch (error) {
      console.log(
        error?.response?.data || "Error while fetching all Employees"
      );
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, [sortBy, sortType]);

  return (
    <div className="p-5 w-75 mx-auto">
      <ViewEmployee
        show={viewEmp}
        onHide={() => setViewEmp(false)}
        selectedEmp={selectedEmp}
      />
      <UpdateEmployee
        show={showUpdateEmp}
        onHide={() => setShowUpdateEmp(false)}
        selectedEmp={selectedEmp}
      />

      <div className="fs-3 text-center fw-semibold mb-2">Employee Table</div>
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
          {employees?.map((item, index) => (
            <tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.location}</td>

              <td>
                <span
                  className="px-2 text-decoration-underline text-primary pointer"
                  onClick={() => handleViewEmp(item)}
                >
                  View
                </span>

                <span
                  className="px-2 border-start border-end border-dark pointer text-decoration-underline text-primary"
                  onClick={() => handleUpdateEmp(item)}
                >
                  Update
                </span>

                <span
                  className="px-2  text-decoration-underline text-primary pointer"
                  onClick={() => handleDeleteEmp(item)}
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

export default AllEmployees;
