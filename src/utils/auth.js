// src/utils/auth.js
export const setToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const clearToken = () => {
    localStorage.removeItem("token");
  };
  
  export const setUser=(user)=>{
    localStorage.setItem("user", JSON.stringify(user));
  }
  
  export const getUser=()=>{
    return localStorage.getItem("user");
  }
  
  export const clearUser=()=>{
    localStorage.removeItem("user");
  }