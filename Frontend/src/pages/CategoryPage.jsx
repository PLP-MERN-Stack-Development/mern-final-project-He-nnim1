import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { ProduceCard } from '../components/ProduceCard';

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getProducts({ category: categoryName });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products by category:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading products...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 capitalize">
        Showing All {categoryName}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(product => <ProduceCard key={product.id} produce={product} />)
        ) : (
          <p className="text-gray-600 col-span-full">No products found in this category.</p>
        )}
      </div>
    </div>
  );
};