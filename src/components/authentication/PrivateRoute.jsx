import React from 'react'
import { Outlet ,Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

// This is deprecated version for react router v5
// export default function PrivateRoute({element:Element,...rest}) {
//     const {user} = useAuth()

//   return (
//     <Route
//     {...rest}
//     loader={props=>{
//         user?<Element {...props}/>:redirect('/login ')
//     }}/>
//   )
// }

// export default function PrivateOutlet() {
//         const {user} = useAuth();
//         return user ? <Outlet /> : <Navigate to="/login" />;
// }

export default function PrivateRouter({children}) {
        const {user} = useAuth();
        return user ? children : <Navigate to="/login" />;
}

