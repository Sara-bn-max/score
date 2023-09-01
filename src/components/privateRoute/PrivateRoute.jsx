import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from "../../contexts/auth-context";

  export default function PrivateRoute({ children }) {
    const { token } = useAuthState();
    const location = useLocation()
    
    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
  
    return children
  }