import { Routes, Route  } from 'react-router-dom';
import './App.css';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
