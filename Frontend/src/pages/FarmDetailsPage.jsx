import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { ProduceCard } from '../components/ProduceCard';

export const FarmDetailsPage = () => {
  const { farmId } = useParams();
  const [farm, setFarm] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const farmData = await api.getFarmById(farmId);
        const productsData = await api.getProducts({ farmId });
        setFarm(farmData);
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch farm details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [farmId]);

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading farm details...</div>;
  }

  if (!farm) {
    return <div className="container mx-auto p-8 text-center">Farm not found.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <img src={farm.image} alt={farm.name} className="w-full h-64 object-cover rounded-lg shadow-md mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{farm.name}</h1>
        <p className="text-lg text-gray-600">{farm.description}</p>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Produce from this Farm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(product => <ProduceCard key={product.id} produce={product} />)
        ) : (
          <p className="text-gray-600 col-span-full">This farm has no produce listed yet.</p>
        )}
      </div>
    </div>
  );
};