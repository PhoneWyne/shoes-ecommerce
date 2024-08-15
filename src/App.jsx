import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
// pages
import { HomePage } from "./pages/homePage/HomePage";
import { MarketPlace } from "./pages/marketPlace/MarketPlace";
import { Checkout } from "./pages/checkout/Checkout";
import { Profile } from "./pages/profile/Profile";
// context
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
// routes
import { browserRoutes } from "./constants/routes";
function App() {
  return (
    <AuthProvider>
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
            <Route
              path={browserRoutes.PROFILE}
              element={
                <Layout>
                  <Profile />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
