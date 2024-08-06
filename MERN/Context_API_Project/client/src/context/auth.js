import React, {useState, useEffect, useContext, createContext} from 'react'

const AuthContext = createContext();



const AuthProvider = ()=>{
    const [auth, setAuth] = useState({
        user:null,
        token:""
    })

}




const auth = () => {
  return (
    <div>auth</div>
  )
}

const Auth2 = () => {
    return (
      <>
            <h1>jcsjkkh</h1>
      </>
    )
  }

export   {auth, Auth2}




