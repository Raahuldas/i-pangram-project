import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Container from './components/Container'
import Home from './components/Home'
import AllEmployees from './components/AllEmployees'
import { useState } from 'react'
import Context from './store/Context'
import DeptEmployees from './components/DeptEmployees'
import axios from 'axios'

function App() {
  const [sortBy, setSortBy] = useState("name");
  const [sortType, setSortType] = useState("asc");
  const [deptEmp,setDeptEmp] = useState({});
  const [allEmp, setAllEmp] = useState();

    const fetchAllEmployees = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/employees/all-emp?sortType=asc&sortBy=name`,
            {
              withCredentials: true,
            }
          );
          console.log(res.data);
          setAllEmp(res.data.data);
        } catch (error) {
          console.log(
            error || "Error while fetching all Employees"
          );
        }
      };

  return (
    <Context.Provider value={{
      sortBy,
      setSortBy,
      sortType,
      setSortType,
      deptEmp,
      setDeptEmp,
      allEmp,
      setAllEmp,
      fetchAllEmployees
    }}>

      <Router>
        <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Container/>}>
          <Route index element={<Home/>}/>
          <Route path='all-emp' element={<AllEmployees/>}/>
          <Route path='dept-emp' element={<DeptEmployees/>}/>
        </Route>
        
        </Routes>
    </Router>
    </Context.Provider>
  
  )
}

export default App
