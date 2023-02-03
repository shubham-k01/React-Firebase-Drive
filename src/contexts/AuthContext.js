import React, { useContext,useState,useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , sendPasswordResetEmail , updateEmail,updatePassword} from "firebase/auth";

const AuthContext = React.createContext()

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthState = ({children})=>{
    const [user, setUser] = useState()
    // loading state to track whether the user is signed in or not
    const [loading, setLoading] = useState(true)

    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    function logout(){
        return signOut(auth)
    }

    function passwordReset(email){
        return sendPasswordResetEmail(auth,email)
    }

    function update_Email(email){
        return updateEmail(user,email)
    }
    function update_Pass(password){
        return updatePassword(user,password)
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth,user=>{
        setUser(user)
        setLoading(false)
      })
    //we want to unsubscribe from the event listener of onAuthStateChanged when we are done with it or it is unmounted
      return unsubscribe
    }, [])
    

    const value = {user,signup,login,logout,passwordReset,update_Email,update_Pass}

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}