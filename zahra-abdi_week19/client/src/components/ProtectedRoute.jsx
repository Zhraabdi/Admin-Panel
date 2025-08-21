import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function ProtectedRoute({ children }) {
  const { state } = useAuth();

  if (state.isLoading) {
    return  (
        <div className="flex justify-center items-center h-[400px]">
          <span className="loader-ring"></span>
        </div>
      );
    }
  

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default ProtectedRoute;

