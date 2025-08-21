import { createContext, useReducer, useContext, useEffect } from "react";

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
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
  
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
      localStorage.setItem("token", state.token);
      localStorage.setItem("username", state.user.username);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    }
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
