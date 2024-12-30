import React, { useEffect, useState } from 'react';
import { createEmployee, updateEmployee,getEmployee,deleteEmployee } from '../services/EmployeeService';
import { useNavigate,useParams } from 'react-router-dom';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [err, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
     const {id} =useParams();

    const navigator = useNavigate();

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error=>{
                console.error(error);
            })
        }
    },[id])

    function handleFirstName(e) {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => setLastName(e.target.value);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        if (validateForm()) {
          
            const employee = { firstName, lastName, email };
            console.log(employee);

            if(id){
                updateEmployee(id,employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employee')
                }).catch(error=>{
                    console.error(error)
                })
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employee');
                }).catch(error=>{
                    console.error(error)
                });

            }

           
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...err }; // Use the correct state variable here
        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'Firstname is required';
            valid = false;
        }
        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Lastname is required';
            valid = false;
        }
        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }
        setErrors(errorsCopy); // Update the correct state variable here
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }
        else{
            return <h2 className='text-center'>Add Employee</h2>
        }

    }
    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                  {
                    pageTitle()
                  }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${err.firstName ? 'is-invalid' : ''}`}
                                    onChange={handleFirstName}
                                />
                                {err.firstName && <div className="invalid-feedback">{err.firstName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${err.lastName ? 'is-invalid' : ''}`}
                                    onChange={handleLastName}
                                />
                                {err.lastName && <div className="invalid-feedback">{err.lastName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Email'
                                    name='Email'
                                    value={email}
                                    className={`form-control ${err.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {err.email && <div className="invalid-feedback">{err.email}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeComponent;
