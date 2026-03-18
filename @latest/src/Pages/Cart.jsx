import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { useProducts } from '../contexts/ProductsContext.jsx';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, cartTotalPrice, checkout } = useCart();
  const { products } = useProducts();
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleCheckout = () => {
    const order = checkout(paymentMethod);
    if (order) {
      alert(`Order #${order.id} created! Total: KSh ${order.total.toLocaleString()}\nPayment: ${paymentMethod === 'mpesa' ? 'M-Pesa' : 'Cash on Delivery'}`);
      navigate('/orders');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button onClick={() => navigate(-1)} className="mb-8 bg-white hover:bg-gray-100 text-gray-600 p-3 rounded-xl shadow-md flex items-center">
            ← Back to Products
          </button>
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="w-24 h-24 bg-shestyled-beige rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-3xl font-bold text-shestyled-chocolate mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some beautiful items to get started</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-shestyled-pink to-shestyled-terracotta text-white py-4 px-8 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              🛍️ Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="mb-8 bg-white hover:bg-gray-100 text-gray-600 p-3 rounded-xl shadow-md flex items-center">
          ← Back to Products
        </button>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Cart Items */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-shestyled-chocolate mb-8">Shopping Cart ({cart.length} items)</h2>
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-6 p-6 bg-gray-50 rounded-xl group hover:bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-24 h-28 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-shestyled-chocolate text-lg mb-1">{item.name}</h3>
                    <p className="text-gray-600 mb-2">{item.category}</p>
                    <p className="text-2xl font-bold text-shestyled-pink">KSh {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-white p-2 rounded-xl shadow-sm">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-600 hover:text-gray-900 text-xl font-bold px-2">-</button>
                      <span className="w-12 text-center font-bold text-lg mx-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-600 hover:text-gray-900 text-xl font-bold px-2">+</button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-shestyled-chocolate mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                <span>KSh {cartTotalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-2xl">
                <span>Total:</span>
                <span>KSh {cartTotalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <label className="block text-lg font-semibold text-shestyled-chocolate mb-3">Payment Method</label>
              <div className="space-y-3">
                <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all group">
                  <input
                    type="radio"
                    name="payment"
                    value="mpesa"
                    checked={paymentMethod === 'mpesa'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-purple-600 mr-4 focus:ring-purple-500"
                  />
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-purple-600">M-Pesa</div>
                    <div className="text-sm text-gray-600">Pay via M-Pesa (STK Push)</div>
                  </div>
                </label>
                <label className="flex items-center p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-all group">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-purple-600 mr-4 focus:ring-purple-500"
                  />
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-purple-600">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when you receive your order</div>
                  </div>
                </label>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-shestyled-pink to-shestyled-terracotta text-white py-5 px-8 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:from-pink-600 hover:to-terracotta-600 transition-all transform hover:scale-105"
            >
              {`Place Order - KSh ${cartTotalPrice.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

