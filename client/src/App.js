import './App.css';
import './bootstrap.min.css';

import { Container } from 'react-bootstrap';

import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
function App() {
  return (
    <>
      <Header />
      <Switch>
        <>
          <main className='py-3'>
            <Container>
              <Route path='/' component={HomePage} exact />
            </Container>
          </main>
        </>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
