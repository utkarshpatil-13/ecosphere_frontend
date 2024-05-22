import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

export function UserContextProvider({children}){

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch('https://ecosphere-backend.onrender.com/api/profile', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
          }
        })
        .then(response => response.json())
        .then(res => {
          setUser(res.data);
          setReady(true);
        })
      }, [token]);

    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;