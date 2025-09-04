import Login from "./pages/Login";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";  
import PageNotFound from "./pages/404";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";


function App() {
  const { state } = useAuth();
  return (
    <>
      <Routes>
      <Route path="/login" element={state.isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}/>
      <Route path="/register" element={state.isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}/>
      <Route path="/" element={state.isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <ToastContainer className="font-vazirmatn" rtl={true} position="bottom-left" autoClose={3000} />
    </>
  );
}

export default App;
