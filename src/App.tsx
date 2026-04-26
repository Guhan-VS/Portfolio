import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="education" element={<Education />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<Projects />} />
          <Route path="certifications" element={<Certifications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
