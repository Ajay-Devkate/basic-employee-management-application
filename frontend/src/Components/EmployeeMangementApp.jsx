import React, { useEffect, useState } from "react";
import EmployeeTable from "./EmployeeTable";
import { GetAllEmployees, deleteEmployeeById } from "../api";
import AddEmployee from "./AddEmployee";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils";

function EmployeeMangementApp() {
    const [showModal, setShowModal] = useState(false);
     const [updateEmpObj, setUpdateEmpObj] = useState(null);
    const[employees, setEmployees] = useState({
        "employees": [],
        "pagination": {
            "total": 0,
            "currentPage": 1,
            "totalPages": 1,
            "pageSize": 5
          }
    });

    const fetchEmployees = async (Search="", page=1,limit=5) => { 

        try {
            const {data} = await GetAllEmployees(Search,page,limit);
            setEmployees(data);
            
        } catch (err) {
            console.log("Error",err);
            
        }
    }
    
    useEffect(() => {
       fetchEmployees();
      }, []);

      const handleAddEmployee = () => {
        setShowModal(true);

      };

      const handleUpdateEmployee = (empObj) => {
        setUpdateEmpObj(empObj);
        setShowModal(true);
      };

      const handleDeleteEmployee = async (emp) => {
        console.log('delete emp',emp);
        try {
            const {success, message} = await deleteEmployeeById(emp._id);
            if (success) {
                    notify(message, "success");
                  } else {
                    notify(message, "error");
                  }
                  fetchEmployees();
        } catch (err) {
            notify(err, "error");
        }
      };

      const handleSearch = (e) => {
        console.log(e);
        
        fetchEmployees(e.target.value);
      };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>EmployeeMangementApp</h1>
      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p3 " style={{ width: "80%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-primary " onClick={() => { handleAddEmployee()
            }}> Add </button>

            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search Employee"
              className="form-control w-50"
            />
          </div>


        <EmployeeTable
        handleDeleteEmployee={handleDeleteEmployee}
        handleUpdateEmployee={handleUpdateEmployee}
        employees={employees.employees}
        pagination={employees.pagination}
            fetchEmployees={fetchEmployees}
        />
        <AddEmployee
        updateEmpObj={updateEmpObj}
        fetchEmployees={fetchEmployees}
        showModal={showModal}
        setShowModal={setShowModal}/>
        </div>
      </div>

      <ToastContainer 
    position='top-right'
    autoClose={3000}
    hideProgressBar={false}
/>

    </div>
  );
}

export default EmployeeMangementApp; 
