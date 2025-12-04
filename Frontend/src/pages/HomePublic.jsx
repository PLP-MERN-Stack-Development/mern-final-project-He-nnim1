import { Link } from 'react-router-dom';

export const HomePublic = () => {
  return (
    <div className="container mx-auto p-8 text-center">
      <div className="bg-white p-12 rounded-lg shadow-xl max-w-3xl mx-auto">
        
        <h1 className="text-4xl font-bold text-green-800 mb-6">
          Welcome to LimaMarket App
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Discover the freshest produce directly from local farms. We connect you
          with high-quality, sustainable, and organic fruits, vegetables,
          cereals, and animal products right from your community.
        </p>
        <p className="text-lg text-gray-700 mb-10">
          Browse farms, explore products, and get fresh food delivered to your
          doorstep.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};