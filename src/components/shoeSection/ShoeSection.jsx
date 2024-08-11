// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { API } from '../../constants/endpoints';
import { ShoeCard } from '../shoeCard/ShoeCard';

export function ShoeSection({shoes, addToCart, removeFromCart}) { 
  return (
    <div className='grid xlm:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-6 gap-8'>
      {shoes?.map((shoe) => (
        <ShoeCard 
          shoe={shoe} 
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
}


