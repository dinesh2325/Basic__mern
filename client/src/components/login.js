import React from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../App';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
}
    from 'mdb-react-ui-kit';

const Login = () => {
   const {state,dispatch}=useContext(UserContext);  

    const navigate = useNavigate();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const userLogin = async(e)=>{
        e.preventDefault();

        const res=await fetch("/login",{
             method:"POST",
             headers:{
               "Content-Type":"application/json"
             },
             body:JSON.stringify({
               email,password
             })
         });

         const data=await res.json();
         if (res.status === 400 || !data) 
         {
           window.alert('Invalid Credential');
         }
         else
         {
           dispatch({type:"USER",payload:true});
           window.alert('login successfull');
           navigate('/');
         }
    }

    return (
        <>
           

            <form method='POST'>
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

                    <MDBInput wrapperClass='mb-4' label='Email address' id='form1' name='email' type='email' value={email}  onChange={(e)=>{setEmail(e.target.value)}}/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='form2' name='password' type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>

                    <MDBBtn type='submit' className="mb-4" onClick={userLogin}>login</MDBBtn>

                </MDBContainer>
            </form>

        </>
    )
}

export default Login
