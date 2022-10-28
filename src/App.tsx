import React from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { ProtectedRoutes }  from './ProtectedRoutes'
import ErrorPage from './pages/Error404';
import {UserProvider} from './ContextHandler'
 
function App() {

  
  return (
    <div className="app page-container">
      <div className="content-wrap">
      <UserProvider >
        <main className=" w-100 m-auto ">         
          <BrowserRouter>
            <Routes>
              <React.Fragment>
              
              <Route path="/*" element={<Login />} />
              <Route path="/login/*" element={<Login />} />

              <Route element={<ProtectedRoutes />} >
                <Route path="/home/*" element={<Home></Home>} />
              </Route>            

              </React.Fragment>
            </Routes> 
          </BrowserRouter>

        </main>    
      </UserProvider>

      </div>
    </div>
  );
}
export default App;
