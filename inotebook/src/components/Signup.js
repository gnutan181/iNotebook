/** @format */

import React ,{useState}from "react";
import {useNavigate} from 'react-router-dom'
const Signup = (props) => {
    const [crediential, setCrediential] = useState({name :"",email :"",password:"",cpassword:""})
    const navigate = useNavigate();
    const handleSubmit =async (e)=>{
        e.preventDefault()
      const  {name,email,password} = crediential
        const response = await fetch(
            "http://localhost:3600/api/auth/createuser",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name,email,password,})
            }
            );
            const json = await response.json()
            console.log(json)
            if(json.success){
                localStorage.setItem('token',json.authtoken)
                props.showAlert("Account created successfully" , "success")
                navigate('/')
             
          }
          else{
              props.showAlert("Invalid credentitials", "warning")
          }
    }
    const onChange = (e)=>{
        setCrediential({...crediential,[e.target.name] :e.target.value})
    }
  return (
      <div className="container mt-3">
          <h2>Create an account to use iNotebook</h2>
    <form onSubmit ={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          name="name"
        //   value ="name"
        onChange= {onChange}
        />
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          onChange= {onChange}
          name ="email"
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name ="password"
        //   value ="password"
        onChange= {onChange}
        minLength ={5} required
        
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
         Confirm Password
        </label>
        <input
          type="password"
          className="form-control"
          id="cpassword"
          name ="cpassword"
        //   value ="cpassword"
        onChange= {onChange}
        minLength ={5} required
        
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Submit

      </button>
      </div>
    </form>
    </div>
  );
};

export default Signup;
