
import { useContext, useEffect, useState} from "react";
import { ShoeSection } from "../../components/shoeSection/ShoeSection";
import { CartContext } from "../../contexts/CartContext";
import { API } from "../../constants/endpoints";
import axios from "axios";
import { useSearchParams } from "react-router-dom";


export function MarketPlace () {
  const [shoes , setShoes] = useState([]);
  const {addToCart, removeFromCart} = useContext(CartContext);
  const [searchParams] = useSearchParams();

  const fetchShoes = async () => {
    try{
      const response = await axios.get(API.SHOES_URL);
      setShoes(response.data);
    } catch (error) {
      console.error('Error fetching shoes:', error);
    }
  }

  useEffect(()=> {
    fetchShoes();
  }, []);

  // Get the search query from the URL
  const searchQuery = searchParams.get('search') || '';

  
  // Filter shoes based on the search query
  const filteredShoes = shoes.filter(shoe => 
    shoe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Marketplace</h1>
      <ShoeSection 
        shoes={filteredShoes}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};


