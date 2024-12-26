import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EmployeeMangementApp from "./Components/EmployeeMangementApp";
import EmployeeDetails from "./Components/EmployeeDetails";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/employee" />} />
          <Route path="/employee" element={< EmployeeMangementApp />} />
          <Route path="/employee/:id" element={< EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
