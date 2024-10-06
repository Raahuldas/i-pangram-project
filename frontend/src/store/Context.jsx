import { createContext } from "react";

const Context = createContext({
  sortBy : String ,
  setSortBy: ()=>{},
  sortType: String,
  setSortType: ()=>{} ,
  deptEmp:{},
  setDeptEmp:()=>{},
  allEmp:[],
      setAllEmp:()=>{},
      fetchAllEmployees:()=>{}
});

export default Context;
