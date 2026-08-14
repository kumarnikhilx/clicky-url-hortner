import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

// ProtectedRoute wraps pages that require authentication.
// If the user is not logged in, they are sent to /login.
// While the session check is in progress, a loading spinner is shown.
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Still checking the session cookie — wait before deciding
  if (isLoading) {
    return <Loading fullScreen />;
  }

  // Not logged in — redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in — render the page
  return children;
};

export default ProtectedRoute;
