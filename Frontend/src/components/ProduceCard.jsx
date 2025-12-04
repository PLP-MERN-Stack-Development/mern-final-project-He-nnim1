import { useCart } from '../hooks/useCart';

export const ProduceCard = ({ produce }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white flex flex-col">
      <img src={produce.image} alt={produce.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{produce.name}</h3>
          <span className="text-lg font-semibold text-green-700">${produce.price.toFixed(2)}</span>
        </div>
        <p className="text-gray-600 text-sm mb-1">
          From: <span className="font-medium">{produce.farmName}</span>
        </p>
        <p className="text-gray-600 text-sm mb-3">
          Category: <span className="font-medium capitalize">{produce.category}</span>
        </p>
        <p className="text-gray-500 text-xs mb-3 flex-grow">{produce.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-gray-500">Rating: {produce.rating} ★</span>
          <span className="text-xs text-gray-500">Expires: {produce.expiryDate}</span>
        </div>
        
        <button
          onClick={() => addToCart(produce)}
          disabled={!produce.inStock}
          className={`w-full px-4 py-2 rounded font-semibold text-white transition-colors duration-200 ${
            produce.inStock 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {produce.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};