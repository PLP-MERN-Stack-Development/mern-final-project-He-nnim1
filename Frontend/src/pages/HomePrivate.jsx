import { useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { FarmCard } from '../components/FarmCard';
import { SearchBar } from '../components/SearchBar';

const CATEGORIES = ['fruits', 'vegetables', 'cereals', 'animal products'];

export const HomePrivate = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Changed to array to support multiple selections
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        setLoading(true);
        const data = await api.getFarms();
        setFarms(data);
      } catch (error) {
        console.error('Failed to fetch farms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFarms();
  }, []);

  // Toggle logic for multi-select
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category) // Remove if already selected
        : [...prev, category] // Add if not selected
    );
  };

  const filteredFarms = useMemo(() => {
    return (farms.filter(farm => {
      const nameMatch = farm.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const farmCategories = farm.categories || [];

      // Match if NO categories are selected OR if farm has ANY of the selected categories
      const categoryMatch = selectedCategories.length === 0
        ? true
        : farmCategories.some(cat => selectedCategories.includes(cat));

      return nameMatch && categoryMatch;
    }));
  }, [farms, searchTerm, selectedCategories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-lg text-gray-600 animate-pulse">Loading farms...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Discover Local Farms
        </h1>
        <p className="text-gray-500">Fresh produce directly from the source</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>

      {/* Categories - Centered & Multi-select */}
      <div className="flex flex-col items-center mb-2">
        <div className="flex flex-wrap justify-center gap-3">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all duration-200 shadow-sm
                  ${isSelected
                    ? 'bg-green-700 text-white shadow-md hover:bg-green-800' /* Selected: Dark Green */
                    : 'bg-green-100 text-green-800 hover:bg-green-200 border border-transparent' /* Unselected: Regular Green */
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* User Friendly Helpers: Clear Button & Count */}
        <div className="h-8 mt-3 flex items-center space-x-4 text-sm">
          {selectedCategories.length > 0 && (
            <>
              <span className="text-gray-500">
                Showing {filteredFarms.length} results
              </span>
              <button
                onClick={() => setSelectedCategories([])}
                className="text-red-500 hover:text-red-700 underline font-medium"
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      </div>

      {/* Farms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFarms.length > 0 ? (
          filteredFarms.map(farm => (
            <FarmCard key={farm._id || farm.id} farm={farm} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-xl mb-4">
              No farms found.
            </p>

          </div>
        )}
      </div>
    </div>
  );
};