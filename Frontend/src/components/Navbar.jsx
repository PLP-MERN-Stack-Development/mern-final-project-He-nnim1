import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();

  const activeLinkClass = "text-green-700 font-bold";
  const inactiveLinkClass = "hover:text-green-600";


  const getUserName = () => {
    if (!user) return 'User';
    return user.name || user.user?.name || 'User';
  };
  

  return (
    <nav className="bg-white shadow-md w-full p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-800">
          🌱 LimaMarket
        </Link>
        
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              {/* Links for logged-in users */}
              <NavLink to="/" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>
                Farms
              </NavLink>
              <span className="text-gray-600">Hi, {getUserName()}!</span>
              <button onClick={logout} className="text-gray-700 hover:text-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Links for logged-out users */}
              <NavLink to="/" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>
                About
              </NavLink>
              <NavLink to="/login" className={({isActive}) => isActive ? activeLinkClass : inactiveLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Register
              </NavLink>
            </>
          )}

          <NavLink to="/cart" className={({isActive}) => `relative ${isActive ? activeLinkClass : inactiveLinkClass}`}>
            🛒 Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </nav>
  );
};