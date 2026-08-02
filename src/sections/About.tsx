import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="about" className="section scroll-reveal" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">About Me</span>
          <h2 className="section-title">Professional Summary</h2>
        </div>
        <div className="about-content">
          <p>
            I am a passionate and dedicated <strong style={{ color: 'var(--text-primary)' }}>BCA student</strong> at 
            Sri Krishna Arts and Science College, Coimbatore, with hands-on experience in full-stack development 
            gained through an internship at <strong style={{ color: 'var(--accent-2)' }}>Skypark iTech</strong>. 
            Skilled in building end-to-end web applications using modern frameworks and 
            eager to contribute technical skills to solving real-world problems while maintaining 
            high security and performance standards.
          </p>
          <div className="about-stats">
            <div className="about-stat stagger-child">
              <span className="stat-number gradient-text">8.6</span>
              <span className="stat-label">CGPA</span>
            </div>
            <div className="about-stat stagger-child">
              <span className="stat-number gradient-text">10+</span>
              <span className="stat-label">Certifications</span>
            </div>
            <div className="about-stat stagger-child">
              <span className="stat-number gradient-text">3</span>
              <span className="stat-label">Publications</span>
            </div>
            <div className="about-stat stagger-child">
              <span className="stat-number gradient-text">3+</span>
              <span className="stat-label">Projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
