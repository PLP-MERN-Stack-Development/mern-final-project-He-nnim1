import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className="container mx-auto p-8 text-center flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-9xl font-bold text-green-700">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">Sorry, we couldn't find the page you're looking for.</p>
      <Link to="/" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
        Go Back Home
      </Link>
    </div>
  );
};