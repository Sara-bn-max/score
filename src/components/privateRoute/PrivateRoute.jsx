import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from "../../contexts/authContext";

  export default function PrivateRoute({ children }) {
    const { token } = useAuthState();
    const location = useLocation()
    
    if (!token) {
      return <Navigate to="/loginAdminPanel" state={{ from: location }} replace />
    }
  
    return children
  }