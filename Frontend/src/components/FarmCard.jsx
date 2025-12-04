import { Link } from 'react-router-dom';

export const FarmCard = ({ farm }) => {
  return (
    <Link 
      to={`/farm/${farm.id}`} 
      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      <img src={farm.image} alt={farm.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-green-800 mb-2">{farm.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{farm.description}</p>
        <div className="flex flex-wrap gap-2">
          {farm.categories.map(cat => (
            <span key={cat} className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};