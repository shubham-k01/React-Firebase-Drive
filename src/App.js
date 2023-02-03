import React from 'react'
import {Container} from 'react-bootstrap'
import Signup from './components/authentication/Signup'
import Login from './components/authentication/Login'
import UserProfile from './components/authentication/UserProfile'
import { AuthState } from './contexts/AuthContext'
import {BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import PrivateRouter from './components/authentication/PrivateRoute'
import PasswordReset from './components/authentication/PasswordReset'
import UpdateProfile from './components/authentication/UpdateProfile'
import Dashboard from './components/drive/Dashboard'

const App = () => {
  return (
    <AuthState>
    
      <div>
        <Router>
          <Routes>
            {/* <Route exact path='/' element={<Dashboard/>}>
              <Route element={<Login/>}/>
            </Route> */}

            {/* Drive Routes */}
            <Route exact path='/' element={
              <PrivateRouter>
                <Dashboard/>
              </PrivateRouter>
            } /> 
            <Route exact path='/folder/:folderId' element={
              <PrivateRouter>
                <Dashboard/>
              </PrivateRouter>
            } /> 


            {/* Profile routes */}
            {/* The following method for private route works */}
            <Route path='/user' element={<PrivateRouter>
              <UserProfile/>
            </PrivateRouter>}/>
            <Route path='/update-profile' element={<PrivateRouter>
              <UpdateProfile/>
            </PrivateRouter>}/>

            {/* Sign up routes */}
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/password-reset' element={<PasswordReset/>}/>
          </Routes>

        </Router>
        
      </div>  
    </AuthState>
  )
}

export default App