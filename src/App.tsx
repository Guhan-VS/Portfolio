import './App.css'
import PasswordChecker from './apps/PasswordChecker/PasswordChecker'

function App() {
  return (
    <div className="portfolio">
      <header className="hero">
        <h1>Guhan's Portfolio</h1>
        <p>Software Developer | Security Enthusiast | AWS Explorer</p>
      </header>

      <main>
        <section className="about">
          <h2>About Me</h2>
          <p>
            Welcome to my portfolio! I'm a passionate developer building tools 
            that make the web safer and more efficient. This site is hosted on 
            <strong> AWS Amplify</strong>.
          </p>
        </section>

        <section className="projects">
          <h2>Live Projects</h2>
          <div className="project-grid">
            <div className="project-card">
              <h3>Password Strength Checker</h3>
              <p>An OWASP-aligned tool to analyze and improve password security.</p>
              <PasswordChecker />
            </div>
          </div>
        </section>

        <section className="skills">
          <h2>Technical Skills</h2>
          <div className="skill-tags">
            <span>Python</span>
            <span>React</span>
            <span>TypeScript</span>
            <span>AWS Amplify</span>
            <span>OWASP Security</span>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Guhan. Built with React & Vite.</p>
      </footer>
    </div>
  )
}

export default App
