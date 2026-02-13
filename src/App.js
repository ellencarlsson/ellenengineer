/**
 * @file Configures React Router and maps all routes to page components.
 */
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import Contact from './pages/Contact/Contact';
import CV from './pages/CV/CV';
import NotFound from './pages/NotFound/NotFound';

/** Root component that sets up routing and renders Header, pages, and Footer. */
function App() {
  useEffect(() => {
    const lastNotified = localStorage.getItem('lastVisitNotification');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastNotified || now - parseInt(lastNotified, 10) > oneDay) {
      fetch('https://ellenengineer.com/notify.php', { method: 'POST' })
        .catch(() => {});
      localStorage.setItem('lastVisitNotification', now.toString());
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/cv" element={<CV />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
