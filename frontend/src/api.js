const Base_Url =  `http://localhost:8081`;

export const GetAllEmployees = async (search='',page=1,limit=5) =>{
    const url = `${Base_Url}/api/employees?search=${search}&page=${page}&limit=${limit}`
    try {
        const options = {
            method: 'GET',
            'Content-Type': 'application/json',
        }
        
        const result = await fetch(url, options);
        
        const data = await result.json();
        
        return data;
    } catch (error) {
        return error;
    }
}

// Create Employee
export const createEmployee = async (empObj) =>{
    const url = `${Base_Url}/api/employees`
    try {
        const formData = new FormData();

        for(const key in empObj){
            formData.append(key,empObj[key]);
        }
        const options = {
            method: 'POST',
            'Content-Type': 'application/json',
            body: formData
        }
        
        const result = await fetch(url, options);
        
        const data = await result.json();
        
        return data;
    } catch (error) {
        return error;
    }
}


// Update Employee
export const updateEmployeeById = async (empObj, id) =>{
    const url = `${Base_Url}/api/employees/${id}`
    try {
        const formData = new FormData();

        for(const key in empObj){
            formData.append(key,empObj[key]);
        }
        const options = {
            method: 'PUT',
            'Content-Type': 'application/json',
            body: formData
        }
        
        const result = await fetch(url, options);
        
        const data = await result.json();
        
        return data;
    } catch (error) {
        return error;
    }
}






// Delete Employee
export const deleteEmployeeById = async (id) =>{

    console.log(id);
    
    const url = `${Base_Url}/api/employees/${id}`
    try {

        const options = {
            method: 'DELETE',
            'Content-Type': 'application/json',
        }
        
        const result = await fetch(url, options);
        
        const data = await result.json();
        
        return data;
    } catch (error) {
        return error;
    }
}



// Fetch Single Employee
export const getEmployeeById = async (id) =>{

    console.log(id);
    
    const url = `${Base_Url}/api/employees/${id}`
    try {

        const options = {
            method: 'GET',
            'Content-Type': 'application/json',
        }
        
        const result = await fetch(url, options);
        
        const data = await result.json();
        
        return data;
    } catch (error) {
        return error;
    }
}