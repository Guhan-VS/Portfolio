import React from 'react';
import PasswordChecker from '../apps/PasswordChecker/PasswordChecker';

const Projects: React.FC = () => {
  return (
    <div className="projects-page" style={{ padding: '4rem 0' }}>
      <section id="projects" className="projects">
        <h2>Projects Showcase</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Smart File Organiser</h3>
            <p>Built a desktop application to organize files automatically by type and keywords. Improved efficiency and reduced manual sorting.</p>
            <div className="skill-tags" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
              <span>Python</span>
              <span>Tkinter</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/Guhan-VS/Smart-File-Organsier" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--primary-purple)' }}>Source Code</a>
              <a href="/SmartFileOrganiser.exe" download className="cta-button" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Download .EXE</a>
            </div>
          </div>

          <div className="project-card">
            <h3>Bluetooth-Enabled Controlled Car</h3>
            <img 
              src="/bluetooth-car.jpg" 
              alt="Bluetooth Controlled Car" 
              style={{ width: '100%', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }} 
            />
            <p>
              Built a 2WD robot car controlled via a mobile app using the HC-05 Bluetooth module. 
              Managed motor logic and speed control using an Arduino Uno and L298N Motor Driver.
            </p>
            <div className="skill-tags" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
              <span>Arduino</span>
              <span>HC-05</span>
              <span>Embedded C</span>
            </div>
          </div>

          <div className="project-card">
            <h3>Password Strength Checker</h3>
            <p style={{ marginBottom: '1.5rem' }}>An interactive web tool implementing OWASP guidelines with real-time feedback and actionable security tips.</p>
            <PasswordChecker />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
