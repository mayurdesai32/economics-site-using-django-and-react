import './App.css';
import './bootstrap.min.css';

import { Container } from 'react-bootstrap';

import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';

import ProductPage from './pages/ProductPage';

import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <>
              <Route path='/' element={<HomePage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/cart/' element={<CartPage />} />
              {/* <Route path='/*' element={<Navigate to= "/" />} /> */}
            </>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
