import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesList from './pages/MoviesList';
import MovieForm from './pages/MovieForm';
import ReviewsList from './pages/ReviewsList';
import ReviewForm from './pages/ReviewForm';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <div>
        <section className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<MoviesList />} />
              <Route path="/movie/:id" element={<MovieForm />} />
              <Route path="/reviews" element={<ReviewsList />} />
              <Route path="/reviews/movie/:movieId" element={<ReviewForm />} />
              <Route path="/reviews/:id" element={<ReviewForm />} />
            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
};

export default App;
