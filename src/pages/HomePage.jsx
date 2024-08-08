import { MarketPlaceFilters } from '../components/marketPlace/MarketPlaceFilters';
import { MarketPlaceHeader } from '../components/marketPlace/MarketPlaceHeader';
import { MarketPlaceSubmenu } from '../components/marketPlace/MarketPlaceSubmenu';
import { LayoutContainer } from '../layout/LayoutContainer';

import { ShoeSection } from '../components/shoeSection/ShoeSection';

export function HomePage() {
  return (
    <LayoutContainer>
      <MarketPlaceHeader />
      <MarketPlaceSubmenu />
      <MarketPlaceFilters />
      <ShoeSection />
    </LayoutContainer>
  );
}
