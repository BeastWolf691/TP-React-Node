import { Link } from 'react-router-dom';
import { ROUTE_BARLIST, ROUTE_BIERECOMMANDELIST, ROUTE_BIERELIST, ROUTE_COMMANDELIST } from '../constante';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <strong>Bar'aton</strong>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_BARLIST}>Bars</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_BIERELIST}>Bieres</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_COMMANDELIST}>Commandes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={ROUTE_BIERECOMMANDELIST}>Suivi des bières</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;