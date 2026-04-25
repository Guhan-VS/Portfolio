import React from 'react';

const Education: React.FC = () => {
  return (
    <div className="education-page" style={{ padding: '4rem 0' }}>
      <section id="education" className="education">
        <h2>Education</h2>
        <div className="project-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎓</div>
          <h3>Bachelor of Computer Applications (BCA)</h3>
          <p style={{ color: 'var(--primary-purple)', fontWeight: 'bold', fontSize: '1.2rem', margin: '0.5rem 0' }}>
            Sri Krishna Arts and Science College, Coimbatore
          </p>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>2024 – 2027</p>
          <div style={{ marginTop: '2rem', textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Relevant Coursework:</h4>
            <div className="skill-tags" style={{ justifyContent: 'flex-start' }}>
              <span>Data Structures</span>
              <span>Database Management Systems</span>
              <span>Software Engineering</span>
              <span>Computer Networks</span>
              <span>Operating Systems</span>
              <span>Object Oriented Programming</span>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" style={{ marginTop: '6rem' }}>
        <h2>Core Competencies</h2>
        <div className="skill-tags">
          <span>Python</span>
          <span>Java</span>
          <span>C/C++</span>
          <span>MySQL</span>
          <span>Selenium</span>
          <span>Git/GitHub</span>
          <span>Vercel</span>
          <span>OOP/DBMS/SDLC</span>
        </div>
      </section>
    </div>
  );
};

export default Education;
