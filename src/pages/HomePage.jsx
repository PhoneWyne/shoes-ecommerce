import { MarketPlaceFilters } from '../components/marketPlace/MarketPlaceFilters';
import { MarketPlaceHeader } from '../components/marketPlace/MarketPlaceHeader';
import { MarketPlaceSubmenu } from '../components/marketPlace/MarketPlaceSubmenu';
import { LayoutContainer } from '../layout/LayoutContainer';

// additional imports
import axios from 'axios';
import {API} from '../constants/endpoints';
import { useState, useEffect } from 'react';
import { ShoeSection } from '../components/shoeSection/ShoeSection';
import { ShoeAdd } from "../components/shoeManage/shoeAdd/ShoeAdd";
import { ShoeEdit } from '../components/shoeManage/shoeEdit/ShoeEdit';
import { Cart } from '../components/cart/Cart';

export function HomePage() {
  const [shoes , setShoes] = useState([]);
  
  const [cart , setCart] = useState([]);
  const fetchShoes = async () => {
    try{
      const response = await axios.get(API.SHOES_URL);
      setShoes(response.data);
    } catch (error) {
      console.error('Error fetching shoes:', error);
    }
  };

  // to be passed to ShoeAdd, to trigger a refresh of shoes displayed
  const addShoe = async (newShoe) => {
    try{
      await axios.post(API.SHOES_URL, newShoe);
      fetchShoes(); //refresh the shoes shown
    } catch (error) {
      console.error('Error adding shoe:', error );
    }
  };
  
  // to be passed to ShoeEdit, to trigger a refresh of shoes displayed
  const editShoe = async (updatedShoe) => {
    try{
      await axios.patch(`${API.SHOES_URL}/${updatedShoe.id}`, updatedShoe);
      fetchShoes();
    } catch (error){
      console.error('Error updating shoe:', error );
    }
  }

  const addToCart = (shoe) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === shoe.id);
      if (existingItem) {
        return prevCart.map((item) => 
          item.id === shoe.id
            ? {...item, quantity: item.quantity+1}
            : item
        );
      } else {
        return [...prevCart, {...shoe, quantity: 1}];
      }
    });
  }

  const removeFromCart = (shoeId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === shoe.id);
      if(existingItem.quantity === 1) {
        return prevCart.filter((item) => item.id !== shoeId);
      } else {
        return prevCart.map((item) =>
          item.id === shoeId
            ? {...item, quantity: item.quantity -1 }
            : item
        );
      }
    });
  }
  useEffect(() => {
    fetchShoes();
  }, []);
  return (
    <LayoutContainer>
      <MarketPlaceHeader />
      <MarketPlaceSubmenu />
      <MarketPlaceFilters />
      <ShoeSection shoes={shoes} addToCart={addToCart} removeFromCart={removeFromCart}/>
      <ShoeAdd onAddShoe={addShoe}/>
      <ShoeEdit shoes={shoes} onEditShoe={editShoe}/>
      <Cart cart={cart}/>
    </LayoutContainer>
  );
}
