import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarsList from './pages/BarsList';
import BarForm from './pages/BarForm';
import BieresList from './pages/BieresList';
import BiereForm from './pages/BiereForm';
import NavBar from './components/NavBar';
import { ROUTE_BARLIST, ROUTE_BARFORM, ROUTE_BIEREFORM, ROUTE_BIERELIST, ROUTE_COMMANDEFORM, ROUTE_COMMANDELIST } from './constante';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div>
        <section className="section">
          <div className="container">
            <Routes>
              <Route path='/' element={<>Main Menu</>} />
              <Route path={ROUTE_BARLIST} element={<BarsList />} />
              <Route path={ROUTE_BARFORM} element={<BarForm />} />
              <Route path={ROUTE_BIERELIST} element={<BieresList />} />
              <Route path={ROUTE_BIEREFORM} element={<BiereForm />} />
              <Route path={ROUTE_COMMANDELIST} element={<>CommandesList </>} />
              <Route path={ROUTE_COMMANDEFORM} element={<> CommandesForm</>} />
            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
};

export default App;
