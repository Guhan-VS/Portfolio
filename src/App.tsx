import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StarlightBackground from './components/StarlightBackground';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Publications from './sections/Publications';
import Contact from './sections/Contact';

function App() {
  return (
    <>
      <StarlightBackground />
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Experience />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Certifications />
        <div className="divider" />
        <Publications />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
