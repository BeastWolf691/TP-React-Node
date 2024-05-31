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
              <Route path="/bars" element={<BarsList />} />
              <Route path="/bars/:id" element={<BarForm />} />
              <Route path="/bieres" element={<BieresList />} />
              <Route path="/biere/:id" element={<BiereForm />} />

            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
};

export default App;
