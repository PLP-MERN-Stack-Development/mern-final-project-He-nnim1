import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { api } from '../services/api'; // Import real API
import { useNavigate, Link } from 'react-router-dom';

export const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, currentFarmId } = useCart();
  
  const [ordering, setOrdering] = useState(false); 
  const navigate = useNavigate();

    const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setOrdering(true);
    try {
      // Prepare data for the backend 'Order' model
      // Adjust these field names if your OrderController expects different ones
      const orderData = {
        orderItems: items.map(item => ({
          product: item._id || item.id, 
          qty: item.quantity,
          price: item.price
        })),
        totalPrice: totalPrice,
      };

      await api.createOrder(orderData);
      clearCart();
      alert('Order placed successfully!');
      navigate('/'); // Redirect to home after success
    } catch (error) {
      console.error("Checkout failed", error);
      alert('Failed to place order. Please try again.');
    } finally {
      setOrdering(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {items.map(item => (
              
              <div key={item._id || item.id} className="flex items-center p-4 border-b last:border-b-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.farmName}</p>
                  <p className="text-lg font-bold text-green-700">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Pass ID correctly to update functions */}
                  <button onClick={() => updateQuantity(item._id || item.id, -1)} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">-</button>
                  <span className="px-3">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id || item.id, 1)} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">+</button>
                </div>
                <button onClick={() => removeFromCart(item._id || item.id)} className="ml-6 text-red-500 hover:text-red-700 font-medium">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button onClick={clearCart} className="mt-4 text-sm text-gray-500 hover:text-red-600">
            Clear Entire Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal ({items.length} items)</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Taxes</span>
              <span className="font-semibold">Calculated at checkout</span>
            </div>
            <div className="flex justify-between font-bold text-xl mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={ordering}
              className={`w-full px-6 py-3 rounded-lg font-semibold mt-6 text-white transition-colors ${
                ordering 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {ordering ? 'Processing Order...' : 'Proceed to Checkout'}
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Note: You are currently shopping from{' '}
              <Link to={`/farm/${currentFarmId}`} className="text-green-600 font-medium underline">
                {items[0]?.farmName}
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};