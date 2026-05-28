import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ component: Component }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }
  return user ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
