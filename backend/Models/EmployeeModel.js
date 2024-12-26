const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const EmployeeModel = mongoose.model('EmployeeModel', employeeSchema);
module.exports = EmployeeModel;
