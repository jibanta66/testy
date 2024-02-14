// App.js
import React from "react";
import Sidebar from "./components/sidebar";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Cats from "./pages/teacher";
import Dogs from "./pages/student" ;
import ErrorPage from "./pages/404";
import GoogleSignUp from "./fierbase/auth";
import Login from "./pages/loginform";
import Loginteacher from "./pages/teacherlogin";

function App() {
  
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <div style={{ maxWidth: "lg", margin: "auto" }}>
            <Routes>
              <Route
                exact
                path={"React-Sidebar-example/"}
                element={<Home />}
              />
              <Route
                path={"React-Sidebar-example/teacher"}
                element={<Cats />}
              />
              <Route
                path={"React-Sidebar-example/student"}
                element={<Dogs />}
              />


<Route
                path={"React-Sidebar-example/GoogleSignUp"}
                element={<GoogleSignUp />}
              />
              <Route
                path={"React-Sidebar-example/Login"}
                element={<Login />}
              />
               <Route
                path={"React-Sidebar-example/Loginteacher"}
                element={<Loginteacher/>}
              />
             
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
