import axios from 'axios'
import React from 'react'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { IoMailOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(e.target.elements.email?.value);
    const email= e.target.elements.email?.value
    const password = e.target.elements.password?.value
    
    if (!email) {
      alert("Please enter your email")
    }
    if (!password) {
      alert("Please enter your password")
    }

    try {
      const res = await axios.post("http://localhost:8000/api/employees/login",
        {email, password},
        {
          withCredentials:true
        }
      )
      console.log(res.data);
      navigate("/home")
      
    } catch (error) {
      console.log(error,"Error while login user");
    }

  }
  
  return (
    <div className="container-fluid vh-100 login-page-css pt5 px-2 px-lg-0 d-flex flex-column justify-content-center">
      
      <div className="w50 mx-auto mt- mb-2 px-5 pt-4 pb-1 rounded-3 bg-white shadow-lg">
        <h2 className="pt-1 text-center fw-bold ">Log In</h2>
        <p className="fw-normal pb-4 text-center ">
          Enter your credentials to Login
        </p>

        <form onSubmit={(e)=>handleLogin(e)}>
          <div className="mb-3 ">
            
              <div className="inp d-flex border rounded">
                <span className="px-2 d-flex align-items-center">
                  <IoMailOutline />
                </span>
                <input
                  type="email"
                  className="form-control d-inline border-0"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your Email address"
                  name="email"
                />
              </div>
            
          </div>

          <div className="mb-3 ">
            <div className="inp d-flex border rounded">
              <span className="px-2 d-flex align-items-center">
                <HiOutlineLockClosed />
              </span>
              <input
                type="password"
                className="form-control d-inline border-0"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your password"
                name="password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

        </form>

        <p className="text-center pt-2 my-3">
          <Link to={"/"} className=" hover-red text-decoration-none">
            Don't have an account? Register now
          </Link>
        </p>
      </div>

    </div>
  )
}

export default Login