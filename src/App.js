import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';


// const Landing = lazy(()=>import('./views/examples/Landing'));
// const Login = lazy(()=>import('./views/Login'));

// const Profile = lazy(()=>import('./views/Profile'));
// const Index = lazy(()=>import('./views/Index'));

// const Register = lazy(()=>import('./views/Register'));
// const NotFound = lazy(()=>import('./views/NotFound'));

import Index from "views/Index.js";
import Landing from "views/examples/Landing.js";
import Login from "views/Login.js";
import Profile from "views/Profile.js";
import Register from "views/Register.js";
import NavbarF from "components/Navbars/Navbar";
import SimpleFooter from "components/Footers/SimpleFooter";


function App() {
 
  return (
    <>
    <NavbarF/>

    <Routes>
      {/* <Route path="*" element={<NotFound/>}/> */}
      <Route path="/landing-page"  element={<Landing/>} />
      <Route path="/login-page"  element={<Login/>} />
      <Route path="/profile-page" element={<Profile/>} />
      <Route path="/Composant" element={<Index/>} />      
      <Route path="/Register-page" element={<Register/>} />      

    </Routes>
    <SimpleFooter/>

    </>
  );
}

export default App;