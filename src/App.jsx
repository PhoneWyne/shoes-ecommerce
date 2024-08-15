import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
// pages
import { HomePage } from "./pages/homePage/HomePage";
import { MarketPlace } from "./pages/marketPlace/MarketPlace";
import { Checkout } from "./pages/checkout/Checkout";
// context
import { CartProvider } from "./contexts/CartContext";
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
            path="/marketplace"
            element={
              <Layout>
                <MarketPlace />
              </Layout>
            }
          />

          <Route
            path="/checkout"
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
