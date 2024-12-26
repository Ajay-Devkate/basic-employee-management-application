const Employee = require("../Models/EmployeeModel");

//  Create an a employee
const createEmployees = async (req, res) => {
  try {
    const body = req.body;
    body.profileImage = req.file ? req.file?.path : null;
    console.log(body);

    const employee = new Employee(body);

    const result = await employee.save();

    res.status(201).json({
      message: "Employee created successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

// Geting all employees
const getAllEmployees = async (req, res) => {
  try {

    let {page, limit, search} = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const skip = (page - 1) * limit;

    let searchCriteria = {};
    
    if (search) {
      searchCriteria = {
        name: { 
          $regex: search,
          $options: 'i'
        },
      };
    };
    
      const totalEmployees = await Employee.countDocuments(searchCriteria);

    const emps = await Employee.find(searchCriteria)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      message: "Employees fetched successfully",
      success: true,
      data: {
        employees: emps,
        pagination: {
          total: totalEmployees,
          currentPage: page,
          totalPages,
          pageSize: limit,
        }
      },
    });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

// Show single employee
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const emps = await Employee.findById(id);

    res.status(200).json({
      message: "Get employee by id successfully",
      success: true,
      data: emps,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

// Delete a single employees
const deleteEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const emps = await Employee.findByIdAndDelete(id);

    res.status(200).json({
      message: "Employee deleted successfully",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

//  Update employee by id
const updateEmployeeById = async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;
    const { id } = req.params;

    let updateData = {
      name,
      email,
      phone,
      department,
      salary,
      updatedAt: Date.now(),
    };

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const updateEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updateEmployee) {
      return res.status(404).json({
        message: "Employee not found",
        success: false,
      });
    }

    res.status(201).json({
      message: "Employee updated successfully",
      success: true,
      data: updateEmployee,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err,
    });
  }
};

module.exports = {
  createEmployees,
  getAllEmployees,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployeeById,
};
