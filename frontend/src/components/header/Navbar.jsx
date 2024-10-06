import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Context from '../../store/Context';

function Navbar() {
    const location = useLocation();

    const {setSortBy, setSortType} = useContext(Context);
    
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">I-PANGRAM</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {location.pathname === "/home/all-emp" && <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/home">Department</a>
        </li>}
        {location.pathname === "/home" && <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/home/all-emp">Employees</a>
        </li>}
        
        {location.pathname === "/home/all-emp" && (
            <>
            <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort Type
          </a>
          <ul className="dropdown-menu">
            <li onClick={()=>setSortType("asc")} className='py-1 px-2 hover-grey pointer'>Ascending</li>
            <li onClick={()=>setSortType("desc")} className='py-1 px-2 hover-grey pointer'>Descending</li>
            
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort By
          </a>
          <ul className="dropdown-menu">
            <li onClick={()=>setSortBy("name")} className='py-1 px-2 hover-grey pointer'>Name</li>
            <li onClick={()=>setSortBy("location")} className='py-1 px-2 hover-grey pointer'>Location</li>
            
          </ul>
        </li>
        </>
        )}
      </ul>
      
    </div>
  </div>
</nav>
  )
}

export default Navbar