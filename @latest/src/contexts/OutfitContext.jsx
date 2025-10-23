import React, { createContext, useContext, useState } from 'react'

const OutfitContext = createContext(null)

export function OutfitProvider({ children }){
  const [filters, setFilters] = useState({ safetyMode: false })
  const value = { filters, setFilters, getRecommendations: () => {} }
  return (
    <OutfitContext.Provider value={value}>
      {children}
    </OutfitContext.Provider>
  )
}

export function useOutfit(){
  return useContext(OutfitContext) || { filters: { safetyMode: false }, setFilters: ()=>{}, getRecommendations: ()=>{} }
}
