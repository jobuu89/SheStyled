import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext.jsx';
import { useAdmin } from '../contexts/AdminContext.jsx';

const Admin = () => {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { isAdmin, loginAsAdmin, logoutAdmin, editingProduct, setEditingProduct } = useAdmin();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Casual',
    price: '',
    image: '',
    description: '',
    stock: ''
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginAsAdmin(loginForm.email, loginForm.password)) {
      alert('Admin login successful!');
    } else {
      alert('Invalid credentials. Use: admin@shestyled.com / admin123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({ ...formData, id: editingProduct.id });
      setEditingProduct(null);
    } else {
      addProduct(formData);
    }
    setFormData({ name: '', category: 'Casual', price: '', image: '', description: '', stock: '' });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this product?')) {
      deleteProduct(id);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-shestyled-chocolate mb-8">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="email"
              placeholder="Email (admin@shestyled.com)"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full p-4 rounded-xl border border-shestyled-beige focus:ring-2 focus:ring-shestyled-pink"
              required
            />
            <input
              type="password"
              placeholder="Password (admin123)"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full p-4 rounded-xl border border-shestyled-beige focus:ring-2 focus:ring-shestyled-pink"
              required
            />
            <button type="submit" className="w-full bg-shestyled-pink text-white py-4 px-8 rounded-xl font-bold hover:bg-pink-600 transition-all">
              Login as Admin
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-shestyled-cream to-shestyled-beige p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-shestyled-chocolate">Admin Dashboard</h1>
          <div className="space-x-4">
            <button onClick={() => setEditingProduct(null)} className="bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700">
              New Product
            </button>
            <button onClick={logoutAdmin} className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add/Edit Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-shestyled-chocolate mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Product Name" className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-shestyled-pink" required />
              <select name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-shestyled-pink" required>
                <option value="Casual">Casual</option>
                <option value="Work">Work</option>
                <option value="Evening">Evening</option>
                <option value="Athleisure">Athleisure</option>
                <option value="Boho">Boho</option>
                <option value="Classic">Classic</option>
              </select>
              <input name="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="Price (KSh)" className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-shestyled-pink" required />
              <input name="image" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="Image URL (Unsplash)" className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-shestyled-pink" />
              <textarea name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Description" className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-shestyled-pink h-24" />
              <input name="stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} placeholder="Stock" className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-shestyled-pink" required />
              <button type="submit" className="w-full bg-shestyled-pink text-white py-4 rounded-xl font-bold hover:bg-pink-600 transition-all">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold text-shestyled-chocolate mb-6">Products ({products.length})</h2>
            <div className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="flex items-center p-4 bg-gray-50 rounded-xl group hover:bg-gray-100">
                  <img src={product.image} alt={product.name} className="w-16 h-20 object-cover rounded-lg mr-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-shestyled-chocolate truncate">{product.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{product.category}</p>
                    <p className="text-lg font-bold text-shestyled-pink">KSh {product.price}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button onClick={() => handleEdit(product)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

