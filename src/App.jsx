import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
// pages
import { HomePage } from "./pages/homePage/HomePage";
import { MarketPlace } from "./pages/marketPlace/MarketPlace";
import { Checkout } from "./pages/checkout/Checkout";
// context
import { CartProvider } from "./contexts/CartContext";
// routes
import { browserRoutes } from "./constants/routes";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path={browserRoutes.MARKETPLACE}
            element={
              <Layout>
                <MarketPlace />
              </Layout>
            }
          />

          <Route
            path={browserRoutes.CHECKOUT}
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />

          {/* Add routes for About Us */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
