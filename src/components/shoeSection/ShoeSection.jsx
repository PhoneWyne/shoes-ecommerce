import axios from 'axios';
import { useState, useEffect } from 'react';
import { API } from '../../constants/endpoints';
import { ShoeCard } from '../shoeCard/ShoeCard';

export function ShoeSection() {
  const [shoes , setShoes] = useState([]);
  const fetchShoes = async () => {
    try{
      const response = await axios.get(API.SHOES_URL);
      setShoes(response.data);
    } catch (error) {
      console.error('Error fetching shoes:', error);
    }
  };
  useEffect(() => {
    fetchShoes();
  }, []);
  return (
    <div className='grid xlm:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-6 gap-8'>
      {shoes?.map((shoe) => (
        <ShoeCard shoe={shoe} />
      ))}
    </div>
  );
}


