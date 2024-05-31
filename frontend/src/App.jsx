import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarsList from './pages/BarsList';
import BarForm from './pages/BarForm';
import BieresList from './pages/BieresList';
import BiereForm from './pages/BiereForm';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar >
      <div>
        <section className="section">
          <div className="container">
            <Routes>
              <Route path="/bars" element={<BarsList />} />
              <Route path="/" element={<BarForm />} />
              <Route path="/" element={<BieresList />} />
              <Route path="/" element={<BiereForm />} />

            </Routes>
          </div>
        </section>
      </div>
      </NavBar>
    </Router>
  );
};

export default App;
