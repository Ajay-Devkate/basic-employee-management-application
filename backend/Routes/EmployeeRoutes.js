const router = require('express').Router();
const {createEmployees, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById} = require('../Controllers/EmployeeController');
const { cloudinaryFileUploader } = require('../Middlewares/FileUploader');


router.get('/', getAllEmployees); 

router.post('/', cloudinaryFileUploader.single('profileImage'), createEmployees);

router.get('/:id', getEmployeeById); 

router.delete('/:id', deleteEmployeeById); 

router.put('/:id', cloudinaryFileUploader.single('profileImage'), updateEmployeeById);

router.delete('/:id', deleteEmployeeById); 

module.exports = router;

