import { MarketPlaceFilters } from '../components/marketPlace/MarketPlaceFilters';
import { MarketPlaceHeader } from '../components/marketPlace/MarketPlaceHeader';
import { MarketPlaceSubmenu } from '../components/marketPlace/MarketPlaceSubmenu';
import { LayoutContainer } from '../layout/LayoutContainer';

// additional imports
import axios from 'axios';
import {API} from '../constants/endpoints';
import { useState, useEffect } from 'react';
import { ShoeSection } from '../components/shoeSection/ShoeSection';
import {ShoeAdd} from "../components/shoeManage/shoeAdd/ShoeAdd";

export function HomePage() {
  const [shoes , setShoes] = useState([]);
  
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
  
  useEffect(() => {
    fetchShoes();
  }, []);
  return (
    <LayoutContainer>
      <MarketPlaceHeader />
      <MarketPlaceSubmenu />
      <MarketPlaceFilters />
      <ShoeSection shoes={shoes}/>
      <ShoeAdd onAddShoe={addShoe}/>
    </LayoutContainer>
  );
}
