import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/homePage/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add routes for Marketplace and About Us */}
      </Routes>
    </Router>
  );
}

export default App;

