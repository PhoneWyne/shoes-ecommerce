import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';
import { Layout } from './layout/Layout';
function App() {
  return (
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
        
        {/* Add routes for Marketplace and About Us */}
      </Routes>
    </Router>
  );
}

export default App;

