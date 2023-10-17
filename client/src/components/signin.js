import React from 'react'
import { useState} from 'react';
import { useNavigate } from 'react-router-dom'



import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  }
  from 'mdb-react-ui-kit';

  let name,value;
const Signin = () => {

    const navigate = useNavigate();

         const [user,setUser] = useState({
            name:"",email:"",phone:"",password:"",cpassword:""
         });

         const handleInputs=(e)=>{
                name=e.target.name;
                value=e.target.value;   
                setUser({...user,[name]:value})
         }


         const PostData=async(e)=>{
             e.preventDefault();
             const {name,email,phone,password,cpassword}=user;

             const res=await fetch("/register",{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json"
                  },
                  body:JSON.stringify({
                    name,email,phone,password,cpassword
                  })
              });

              const data=await res.json();
              if (res.status === 422 || !data) 
              {
                window.alert('Invalid detail');
              }
              else
              {
                window.alert('Registration successful');
                navigate('/login');
              }
              
         }

  return ( 
    <>

<form method='POST'>
<MDBContainer className="p-3 my-5 d-flex flex-column w-50">
<MDBInput wrapperClass='mb-4' label='Your Name' name='name' id='form1' type='name' 
value={user.name}
onChange={handleInputs} />
<MDBInput wrapperClass='mb-4' label='Your Email' name='email' id='form2' type='email' 
value={user.email}
onChange={handleInputs} />
<MDBInput wrapperClass='mb-4' label='phone Number' name='phone' id='form3' type='name' 
value={user.phone}
onChange={handleInputs} />
<MDBInput wrapperClass='mb-4' label='Password' name='password' id='form4' type='password' 
value={user.password}
onChange={handleInputs} />
<MDBInput wrapperClass='mb-4' label='Conform Password' name='cpassword' id='form5' type='password' 
value={user.cpassword}
onChange={handleInputs} />

<div className="d-flex justify-content-between mx-3 mb-4">
  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
  <a href="!#">Forgot password?</a>
</div>

<MDBBtn type='submit' className="mb-4" onClick={PostData}>Sign in</MDBBtn>
</MDBContainer>
</form>
    </>
  )
}

export default Signin
