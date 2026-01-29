import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const[token, setToken] = useState(localStorage.getItem("token"));

    const login = (tok)=>{
        const payload = JSON.parse(atob(tok.split(".")[1]));
        localStorage.setItem("token", tok);
        localStorage.setItem("role", payload.role);
        setToken(tok);
    };
    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
    const role = localStorage.getItem("role");
    };

    return (
        <AuthContext.Provider value={{token, login, logout}}>{children}</AuthContext.Provider>
    );
};