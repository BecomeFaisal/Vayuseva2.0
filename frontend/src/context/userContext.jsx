import React from 'react'
import { useState } from 'react'
export const UserDataContext = React.createContext();   

const userContext = ({children}) => {
    const [user,setUser] = useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        },
        }
    );
  return (
    <div>
        <UserDataContext.Provider value={{user,setUser}}>
            {children}
        </UserDataContext.Provider>

    </div>
  )
}

export default userContext
