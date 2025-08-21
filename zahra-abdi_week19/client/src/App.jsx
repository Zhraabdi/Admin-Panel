import Login from "./pages/Login";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";  
import PageNotFound from "./pages/404";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Login/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <ToastContainer className="font-vazirmatn" rtl={true} position="bottom-left" autoClose={3000} />
    </>
  );
}

export default App;
