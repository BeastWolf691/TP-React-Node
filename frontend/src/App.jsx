import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarsList from './pages/BarsList';
import BarForm from './pages/BarForm';
import BieresList from './pages/BieresList';
import BiereForm from './pages/BiereForm';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div>
        <section className="section">
          <div className="container">
            <Routes>
              <Route path="/Bars" element={<BarsList />} />
              <Route path="/bar/:id" element={<BarForm />} />
              <Route path="/Bieres" element={<BieresList />} />
              <Route path="/Biere/:id" element={<BiereForm />} />

            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
};

export default App;
