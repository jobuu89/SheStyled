import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext.jsx';

const Orders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { products } = useProducts();
  const ordersText = localStorage.getItem('shestyled-orders');
  const savedOrders = ordersText ? JSON.parse(ordersText) : [];
  const [orders, setOrders] = useState(savedOrders.length > 0 ? savedOrders : [
    {
      id: '#ORD001',
      date: '2024-10-20',
      status: 'Delivered',
      total: 'KSh 2,450',
      items: 3,
      tracking: null,
      itemsList: [
        { name: 'Casual Blue Dress', category: 'Casual', qty: 1, price: 'KSh 1,250' },
        { name: 'White Sneakers', category: 'Classic', qty: 1, price: 'KSh 850' },
        { name: 'Crossbody Bag', category: 'Evening', qty: 1, price: 'KSh 400' }
      ]
    },
    {
      id: '#ORD002',
      date: '2024-10-18',
      status: 'Processing',
      total: 'KSh 3,200',
      items: 4,
      tracking: null,
      itemsList: [
        { name: 'Work Blazer', category: 'Work', qty: 1, price: 'KSh 2,800' },
        { name: 'Pants', category: 'Work', qty: 1, price: 'KSh 1,200' },
        { name: 'Belt', category: 'Work', qty: 1, price: 'KSh 400' },
        { name: 'Loafers', category: 'Classic', qty: 1, price: 'KSh 800' }
      ]
    },
    {
      id: '#ORD003',
      date: '2024-10-15',
      status: 'Shipped',
      total: 'KSh 5,600',
      items: 5,
      tracking: 'https://track.example.com/ORD003',
      itemsList: [
        { name: 'Evening Gown', category: 'Evening', qty: 1, price: 'KSh 4,500' },
        { name: 'High Heels', category: 'Evening', qty: 1, price: 'KSh 800' },
        { name: 'Clutch', category: 'Evening', qty: 1, price: 'KSh 500' },
        { name: 'Jewelry Set', category: 'Evening', qty: 1, price: 'KSh 300' },
        { name: 'Scarf', category: 'Evening', qty: 1, price: 'KSh 500' }
      ]
    }
  ]);
  
  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'Processing').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'Shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length }
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status.toLowerCase().includes(activeTab);
  });

  const statusColors = {
    'Delivered': 'bg-green-100 text-green-800 border-green-200',
    'Shipped': 'bg-blue-100 text-blue-800 border-blue-200',
    'Processing': 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  const trackOrder = (trackingUrl) => {
    if (trackingUrl) {
      window.open(trackingUrl, '_blank');
    } else {
      alert('Tracking information will be available soon');
    }
  };

  const reorder = (orderId) => {
    alert(`Reorder initiated for ${orderId}! (Demo - would redirect to cart)`);
  };

  const requestReturn = (orderId) => {
    alert(`Return request submitted for ${orderId}! (Demo)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-white hover:bg-gray-100 text-gray-600 p-3 rounded-xl shadow-md flex items-center mr-6"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-shestyled-chocolate">My Orders</h1>
          </div>
          <div className="text-2xl font-semibold text-shestyled-brown">
            {filteredOrders.length} Orders
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl p-1 mb-8">
          <div className="flex border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 font-semibold transition-all text-center ${
                  activeTab === tab.id
                    ? 'border-b-2 border-shestyled-pink text-shestyled-chocolate shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.id ? 'bg-shestyled-pink text-white' : 'bg-gray-100 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-shestyled-cream to-shestyled-beige">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-shestyled-chocolate uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-shestyled-chocolate uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-shestyled-chocolate uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-shestyled-chocolate uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-shestyled-chocolate uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-shestyled-chocolate uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-shestyled-chocolate">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {order.items} items
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-shestyled-chocolate">
                        {order.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => trackOrder(order.tracking)}
                          className="text-blue-600 hover:text-blue-900 font-semibold text-xs"
                        >
                          Track
                        </button>
                        <button
                          onClick={() => reorder(order.id)}
                          className="text-green-600 hover:text-green-900 font-semibold text-xs"
                        >
                          Reorder
                        </button>
                        <button
                          onClick={() => requestReturn(order.id)}
                          className={`text-orange-600 hover:text-orange-900 font-semibold text-xs ${
                            order.status === 'Delivered' ? '' : 'opacity-50 cursor-not-allowed'
                          }`}
                          disabled={order.status !== 'Delivered'}
                        >
                          Return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="w-24 h-24 bg-shestyled-beige rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your shopping journey starts here. Browse our collection and make your first purchase!
            </p>
            <button
              onClick={() => navigate('/home')}
              className="bg-shestyled-pink hover:bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              🛍️ Start Shopping
            </button>
          </div>
        )}

        {/* Order Details Modal - Simplified */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-shestyled-chocolate">Order Details</h2>
                    <p className="text-4xl font-bold text-shestyled-pink">{selectedOrder.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                {/* Detailed order content would go here */}
                <div className="text-center py-8 text-gray-500">
                  Order details view (Click orders from list to see full details)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

