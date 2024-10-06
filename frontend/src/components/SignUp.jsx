import axios from "axios";
import React, { useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineLockClosed } from "react-icons/hi";
import { IoMailOutline, IoPerson } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email?.value;
    const password = e.target.elements.password?.value;
    const name = e.target.elements.name?.value;
    const location = e.target.elements.location?.value;
    const admin = e.target.elements.isAdmin?.value;

    const isAdmin = admin == "true";

    if (!email) {
      alert("Email is required");
    }
    if (!password) {
      alert("Password is required");
    }
    if (!name) {
      alert("Name is required");
    }
    if (!location) {
      alert("Location is required");
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/employees/register",
        {
          email,
          password,
          location,
          name,
          isAdmin,
        }
      );
      console.log(res.data);
      alert("Account registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error, "Error while SignUp");
    }
  };

  return (
    <div className="container-fluid vh-100 login-page-css pt5 px-2 px-lg-0  d-flex flex-column justify-content-center">
      <div className="w50 mx-auto mt- mb-2 px-5 pt-4 pb-1 rounded-3 bg-white shadow-lg">
        <h2 className="pt-1 text-center fw-bold ">Sign Up</h2>
        <p className="fw-normal pb-4 text-center ">
          Enter your credentials to Register
        </p>

        <form onSubmit={(e) => handleSignUp(e)}>
          <div className="mb-3 ">
            <div className="inp d-flex border rounded">
              <span className="px-2 d-flex align-items-center">
                <IoPerson />
              </span>
              <input
                type="text"
                className="form-control d-inline border-0"
                id="name"
                placeholder="Enter your name"
                name="name"
              />
            </div>
          </div>
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
                <FaLocationDot />
              </span>
              <input
                type="text"
                className="form-control d-inline border-0"
                id="location"
                placeholder="Enter your location"
                name="location"
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

          <div className="mb-3 d-flex ">
            <label htmlFor="isAdmin" className="form-label d-block ">
              Register As Manager
            </label>
            <select
              className="form-select-sm ms-auto"
              id="isAdmin"
              aria-label="Default select example"
              name="isAdmin"
            >
              <option defaultValue value={false}>
                No
              </option>
              <option value={true}>yes</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Signup
          </button>
        </form>

        <p className="text-center pt-2 my-3">
          <Link to={"/login"} className=" hover-red text-decoration-none">
            Already have an account? Login now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
