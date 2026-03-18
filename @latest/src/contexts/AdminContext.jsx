import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Super admin credentials (hardcoded for demo)
  const SUPER_ADMIN_EMAIL = 'admin@shestyled.com';
  const SUPER_ADMIN_PASSWORD = 'superadmin2026!';

  const loginAsAdmin = (email, password) => {
    if (email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setEditingProduct(null);
  };

  const value = {
    isAdmin,
    loginAsAdmin,
    logoutAdmin,
    editingProduct,
    setEditingProduct
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

