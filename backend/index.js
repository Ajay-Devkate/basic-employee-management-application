const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('./Models/db');
const router = require('./Routes/EmployeeRoutes');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/employees', router);

const PORT = process.env.PORT || 8081;

app.get('/', (req, res) => {
    res.send('employee management system');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
