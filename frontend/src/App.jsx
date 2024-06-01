import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarsList from './pages/BarsList';
import BarForm from './pages/BarForm';
import BieresList from './pages/BieresList';
import BiereForm from './pages/BiereForm';
import NavBar from './components/NavBar';
import { ROUTE_BARLIST, ROUTE_BARFORM_DYNAMIC, ROUTE_BIEREFORM_DYNAMIC, ROUTE_BIERELIST, ROUTE_COMMANDEFORM_DYNAMIC, ROUTE_COMMANDELIST, ROUTE_BIERECOMMANDELIST, ROUTE_BIERECOMMANDEFORM_DYNAMIC} from './constante';
import CommandeForm from './pages/CommandeForm';
import CommandesList from './pages/CommandesList';
import BieresCommandesList from './pages/BieresCommandesList';
import BiereCommandesForm from './pages/BieresCommandesForm';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div>
        <section className="section">
          <div className="container">
            <Routes>
              <Route path='/' element={<></>} />
              <Route path={ROUTE_BARLIST} element={<BarsList />} />
              <Route path={ROUTE_BARFORM_DYNAMIC} element={<BarForm />} />
              <Route path={ROUTE_BIERELIST} element={<BieresList />} />
              <Route path={ROUTE_BIEREFORM_DYNAMIC} element={<BiereForm />} />
              <Route path={ROUTE_COMMANDELIST} element={<CommandesList />} />
              <Route path={ROUTE_COMMANDEFORM_DYNAMIC} element={<CommandeForm />} />
              <Route path={ROUTE_BIERECOMMANDELIST} element={<BieresCommandesList />} />
              <Route path={ROUTE_BIERECOMMANDEFORM_DYNAMIC} element={<BiereCommandesForm />} />
            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
};

export default App;
