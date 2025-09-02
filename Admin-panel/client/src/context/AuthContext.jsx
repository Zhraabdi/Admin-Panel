import { createContext, useReducer, useContext, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from "../utils/cookie";


const AuthContext = createContext();
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT": return { ...initialState };

    case "SET_LOADING":  return { ...state, isLoading: true };

    case "STOP_LOADING": return { ...state, isLoading: false };

    default: return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // const username = localStorage.getItem("username");
    const token = getCookie("token");
    const username = getCookie("username");

  
    if (token && username) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { token, user: { username } },
      });
    }
    
    dispatch({ type: "STOP_LOADING" }); 
  }, []);
  

  useEffect(() => {
    if (state.isAuthenticated) {
      setCookie("token", state.token, 7);
      setCookie("username", state.user.username, 7);
    } else {
      deleteCookie("token");
      deleteCookie("username");
    }    

  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
