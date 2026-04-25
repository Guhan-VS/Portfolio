import './App.css'
import PasswordChecker from './apps/PasswordChecker/PasswordChecker'

function App() {
  return (
    <div className="portfolio">
      <nav className="navbar">
        <div className="logo">GUHAN.DEV</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
        </div>
      </nav>

      <header className="hero">
        <h1>Building for the <span className="purple-text">Secure</span> Web</h1>
        <p>
          Software Developer specialized in Python, React, and AWS. 
          Focused on creating high-performance applications with security at their core.
        </p>
        <a href="#projects" className="cta-button">View My Work</a>
      </header>

      <main>
        <section id="about" className="about">
          <h2>About Me</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            I am a developer passionate about building tools that solve real-world problems. 
            This portfolio serves as a hub for my latest projects and experiments, 
            deployed globally using <strong>AWS Amplify</strong> for maximum reliability and speed.
          </p>
        </section>

        <section id="projects" className="projects">
          <h2>Featured Project</h2>
          <div className="project-grid">
            <div className="project-card">
              <h3>Password Strength Checker</h3>
              <p>
                An interactive tool built to help users understand password security. 
                Implements OWASP guidelines with real-time feedback and tips.
              </p>
              <PasswordChecker />
            </div>
          </div>
        </section>

        <section id="skills" className="skills">
          <h2>Technical Skills</h2>
          <div className="skill-tags">
            <span>Python</span>
            <span>React</span>
            <span>TypeScript</span>
            <span>AWS Amplify</span>
            <span>Node.js</span>
            <span>OWASP Security</span>
            <span>Git</span>
            <span>Vite</span>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Guhan. Handcrafted with Passion.</p>
      </footer>
    </div>
  )
}

export default App
