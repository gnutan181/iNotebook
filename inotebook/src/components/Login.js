/** @format */

import React,{useState} from "react";
import {useNavigate} from 'react-router-dom'
// import noteContext from "../context/notes/noteContext";

const Login = (props) => {

    
    const [crediential, setCrediential] = useState({email :"",password:""})

    const navigate = useNavigate();

    const handleSubmit =async (e)=>{
        e.preventDefault()
        const response = await fetch(
            "http://localhost:3600/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: crediential.email,password:crediential.password})
            }
            );
            const json = await response.json()
            console.log(json)
            if(json.success){
                   localStorage.setItem('token',json.authtoken)
                   props.showAlert("logged in successfully","success")
                   navigate('/')
              
          }
          else{
              props.showAlert("invalid crediential","warning")
          }
    }
    const onChange = (e)=>{
        setCrediential({...crediential,[e.target.name] :e.target.value})
    }
    
  return (
    <div className="mt-3 mb-2">
        <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" >
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value= {crediential.email}
            onChange ={onChange}
            name= "email"
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
            name="password"
            value ={crediential.password}
            onChange ={onChange}

          />
        </div>
       
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
