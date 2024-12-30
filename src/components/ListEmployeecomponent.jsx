import React, { useEffect, useState } from 'react';
import { listEmployee, deleteEmployee  } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
    }, []);

    function getAllEmployees() {
        listEmployee()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    function addNewEmployee() {
        navigate('/add-employee');
    }

    function updateEmployee(id) {
        navigate(`/edit-employee/${id}`);
    }
    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response)=>{
            getAllEmployees();
        }).catch((error)=>{
            console.error(error)
        })
    }

   
    
    

    return (
        <div className='container'>
            <h2 className='text-center'>List Of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee FirstName</th>
                        <th>Employee LastName</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListEmployeeComponent;
