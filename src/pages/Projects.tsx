import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from './ProjectDetail';

const Projects: React.FC = () => {
  return (
    <div className="projects-page" style={{ padding: '4rem 0' }}>
      <section id="projects" className="projects">
        <h2 style={{ marginBottom: '1rem' }}>Projects Showcase</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
          A collection of my work in software development, embedded systems, and security tools.
        </p>
        
        <div className="project-grid">
          {projectsData.map((project) => (
            <Link 
              to={`/projects/${project.id}`}
              key={project.id} 
              className="project-card"
              style={{ 
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease, border-color 0.3s ease'
              }}
            >
              <h3 style={{ marginBottom: '1rem' }}>{project.title}</h3>
              
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-color)', height: '200px', objectFit: 'cover' }} 
                />
              )}

              <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)', flexGrow: 1 }}>
                {project.description}
              </p>

              <div className="skill-tags" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                {project.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} style={{ fontSize: '0.7rem', padding: '0.4rem 0.8rem' }}>{skill}</span>
                ))}
                {project.skills.length > 3 && <span style={{ fontSize: '0.7rem', padding: '0.4rem 0.8rem' }}>+{project.skills.length - 3} more</span>}
              </div>

              <div style={{ color: 'var(--primary-purple)', fontWeight: '600', fontSize: '0.9rem', textAlign: 'right' }}>
                View Project Details →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
