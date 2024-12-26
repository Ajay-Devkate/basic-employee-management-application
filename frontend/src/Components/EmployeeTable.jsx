import React from "react";
import { Link } from "react-router-dom";

function EmployeeTable({
  employees,
  pagination,
  fetchEmployees,
  handleUpdateEmployee,
  handleDeleteEmployee,
}) {
  const employ = employees;
  const Pagination = pagination;

  const handleNextPage = () => {
    if (Pagination.currentPage < Pagination.totalPages) {
      handlePagination(Pagination.currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (Pagination.currentPage > 1) {
      handlePagination(Pagination.currentPage - 1);
    }
  };

  const handlePagination = (currPage) => {
    console.log(currPage);

    fetchEmployees("", currPage, 5);
  };

  const header = ["Name", "Email", "Phone", "Department", "Actions"];
  const pageNumbers = Array.from(
    { length: Pagination.totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employ.map((item, index) => (
            <tr key={index}>
              <td>
                <Link to={`/employee/${item._id}`} className="text-decoration-none">
                  {item.name}
                </Link>
              </td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.department}</td>
              <td>
                <i
                  className="bi bi-pencil-fill text-warning md-4"
                  role="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  onClick={() => handleUpdateEmployee(item)}
                ></i>
                &nbsp; &nbsp;
                <i
                  className="bi bi-trash-fill text-danger md-4"
                  role="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  onClick={() => handleDeleteEmployee(item)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center my-3">
        <span className="badge bg-primary">
          Page {Pagination.currentPage} of {Pagination.totalPages}
        </span>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => handlePreviousPage()}
            disabled={Pagination.currentPage === 1}
          >
            Previous
          </button>

          {pageNumbers.map((item, index) => (
            <button
              onClick={() => handlePagination(item)}
              key={index}
              className={`btn btn-outline-primary me-2 ${
                Pagination.currentPage === item ? "active" : ""
              }`}
            >
              {item}
            </button>
          ))}

          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => handleNextPage()}
            disabled={Pagination.totalPages === pagination.currentPage}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default EmployeeTable;
