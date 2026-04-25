import './App.css'
import PasswordChecker from './apps/PasswordChecker/PasswordChecker'

function App() {
  const certifications = [
    { title: 'IBM Full Stack Software Developer', issuer: 'IBM', year: '2025' },
    { title: 'Microsoft AI & ML Engineering', issuer: 'Microsoft', year: '2025' },
    { title: 'Google Data Analytics Certificate', issuer: 'Google', year: '2025' },
    { title: 'IBM AI Developer', issuer: 'IBM', year: '2025' },
    { title: 'Google Gen AI Program', issuer: 'GDG', year: '2024-2025' },
    { title: 'Google IT Support & Automation', issuer: 'Google', year: '2025' },
  ];

  return (
    <div className="portfolio">
      <nav className="navbar">
        <div className="logo">GUHAN V S</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#certifications">Certifications</a>
        </div>
      </nav>

      <header className="hero">
        <h1>Guhan V S</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'var(--accent-purple)', fontWeight: '500' }}>
          BCA STUDENT | SOFTWARE DEVELOPER
        </p>
        <p>
          Passionate about building secure, real-world applications using 
          Python, Java, and Cloud technologies.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <a href="https://www.linkedin.com/in/guhanvs06/" target="_blank" rel="noopener noreferrer" className="cta-button">LinkedIn</a>
          <a href="mailto:guhanvs2006@gmail.com" className="cta-button" style={{ background: 'transparent', border: '1px solid var(--primary-purple)' }}>Email Me</a>
        </div>
      </header>

      <main>
        <section id="about" className="about">
          <h2>Profile</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            BCA student with hands-on experience in Python, Java, MySQL, and basic web technologies. 
            Seeking an entry-level internship role to apply programming, data handling, and 
            problem-solving skills in real-world projects.
          </p>
        </section>

        <section id="education" className="education">
          <h2>Education</h2>
          <div className="project-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h3>Bachelor of Computer Applications (BCA)</h3>
            <p style={{ color: 'var(--primary-purple)', fontWeight: 'bold' }}>Sri Krishna Arts and Science College, Coimbatore</p>
            <p>2024 – 2027</p>
          </div>
        </section>

        <section id="projects" className="projects">
          <h2>Projects</h2>
          <div className="project-grid">
            <div className="project-card">
              <h3>Smart File Organiser</h3>
              <p>Built a desktop application to organize files automatically by type and keywords. Improved efficiency and reduced manual sorting.</p>
              <div className="skill-tags" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                <span>Python</span>
                <span>Tkinter</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://github.com/Guhan-VS/Smart-File-Organsier" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--primary-purple)' }}>Code</a>
                <a href="/SmartFileOrganiser.exe" download className="cta-button" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Download .EXE</a>
              </div>
            </div>

            <div className="project-card">
              <h3>Flora X Farmer Assistance</h3>
              <p>Designed an agriculture-focused app idea for disease identification and farmer data tracking, including an alert system.</p>
              <div className="skill-tags" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                <span>Python</span>
                <span>Database Design</span>
              </div>
            </div>

            <div className="project-card">
              <h3>Computer-Controlled Robot</h3>
              <p>Developed a basic robot controlled via computer commands using serial communication (Arduino UNO, C/C++).</p>
              <div className="skill-tags" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                <span>Arduino</span>
                <span>C/C++</span>
              </div>
            </div>

            <div className="project-card">
              <h3>Password Strength Checker</h3>
              <p>Real-time security analyzer implementing OWASP guidelines with interactive feedback.</p>
              <PasswordChecker />
            </div>
          </div>
        </section>

        <section id="certifications" className="certifications">
          <h2>Certifications</h2>
          <div className="project-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {certifications.map((cert, index) => (
              <div key={index} className="project-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{cert.title}</h4>
                <p style={{ color: 'var(--primary-purple)', fontSize: '0.9rem' }}>{cert.issuer}</p>
                <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{cert.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="skills">
          <h2>Technical Skills</h2>
          <div className="skill-tags">
            <span>Python</span>
            <span>Java</span>
            <span>C/C++</span>
            <span>MySQL</span>
            <span>Selenium</span>
            <span>Git/GitHub</span>
            <span>React</span>
            <span>AWS Amplify</span>
            <span>OOP/DBMS/SDLC</span>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Guhan V S. Built for the future.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.6 }}>
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </footer>
    </div>
  )
}

export default App
