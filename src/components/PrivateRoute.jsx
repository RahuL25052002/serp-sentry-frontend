import { Navigate } from 'react-router-dom';
import { getToken } from '../services/UserService';

export function PrivateRoute({ children }) {
    const token = getToken();
    
    if (!token) {
        // Redirect to login if there's no token
        return <Navigate to="/login" />;
    }

    // Render the protected component if authenticated
    return children;
} 