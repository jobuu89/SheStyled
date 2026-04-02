import { createContext, useContext, useState, useEffect } from 'react';

const TrustedContactsContext = createContext();

export const TrustedContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const addContact = (value) => {
    if (contacts.length >= 5 || contacts.some(c => c.value.toLowerCase() === value.toLowerCase().trim())) return false;
    
    const newContact = {
      id: Date.now().toString(),
      value: value.trim(),
      label: value.trim().split('@')[0] || value.trim(),
    };
    
    setContacts(prev => [...prev, newContact]);
    return true;
  };

  const removeContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  return (
    <TrustedContactsContext.Provider value={{ contacts, addContact, removeContact }}>
      {children}
    </TrustedContactsContext.Provider>
  );
};

export const useTrustedContacts = () => useContext(TrustedContactsContext);

