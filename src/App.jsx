import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
// pages
import { HomePage } from "./pages/homePage/HomePage";
import { MarketPlace } from "./pages/marketPlace/MarketPlace";
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

          {/* Add routes for About Us */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
