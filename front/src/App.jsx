import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/menu';
import Manager from './components/manager';
import Thumb from './components/thumb';
import HomePage from './pages/homepage';
import BarList from './pages/barList';
import "./App.css";
// import ListeBieresPage from './pages/ListeBieres';
// import ListeCommandesPage from './pages/ListeCommandes';

const App = () => {
  return (
    <Router>
      <>
        <Menu />
        <main>
          <Thumb />
          <Manager />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bars" element={<BarList />} />
              {/* <Route path="/bieres" element={<ListeBieresPage />} />
              <Route path="/commandes" element={<ListeCommandesPage />} /> */}
          </Routes>
        </main>
      </>
    </Router>
  );
};

export default App;