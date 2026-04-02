import { useState, useCallback } from 'react';
import { useAuth } from './UseAuth.jsx';

export const useTrustedContacts = () => {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);

  const addContact = useCallback((contactValue) => {
    if (!contactValue.trim() || contacts.length >= 5 || contacts.some(c => c.value === contactValue.trim())) {
      return false;
    }
    
    const newContact = {
      id: Date.now().toString(),
      value: contactValue.trim(),
      label: contactValue.trim().split('@')[0] || contactValue.trim().slice(0, 12),
      addedAt: new Date().toISOString()
    };
    
    setContacts(prev => [...prev, newContact]);
    return true;
  }, [contacts]);

  const removeContact = useCallback((contactId) => {
    setContacts(prev => prev.filter(c => c.id !== contactId));
  }, []);

  return {
    contacts,
    loading: false,
    error: null,
    addContact,
    removeContact
  };
};

