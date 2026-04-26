import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from './ProjectDetail';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <h1>Guhan V S</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'var(--accent-purple)', fontWeight: '500', letterSpacing: '0.1em' }}>
          CYBERSECURITY | CLOUD COMPUTING | DEVOPS
        </p>
        <p style={{ maxWidth: '700px', margin: '1.5rem auto 0', opacity: 0.9 }}>
          Building secure infrastructure and automated pipelines. 
          Focused on the intersection of protection, scale, and efficiency.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
          <Link to="/projects" className="cta-button">Explore Projects</Link>
          <a href="https://www.linkedin.com/in/guhanvs06/" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ background: 'transparent', border: '1px solid var(--primary-purple)' }}>LinkedIn</a>
        </div>
      </header>

      <section className="featured-projects" style={{ padding: '6rem 0' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Featured Projects</h2>
        <div className="project-grid">
          {projectsData.slice(0, 3).map((project) => (
            <Link 
              to={`/projects/${project.id}`} 
              key={project.id} 
              className="project-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h3>{project.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{project.description}</p>
              <div style={{ color: 'var(--primary-purple)', fontSize: '0.85rem', fontWeight: '600' }}>Learn More →</div>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none', borderBottom: '1px solid var(--primary-purple)' }}>
            View All Projects
          </Link>
        </div>
      </section>

      <section id="about" className="about">
        <h2>Professional Focus</h2>
        <div className="project-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div className="project-card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛡️</div>
            <h3 style={{ fontSize: '1.2rem' }}>Cybersecurity</h3>
            <p style={{ fontSize: '0.9rem' }}>Implementing OWASP standards, secure coding practices, and vulnerability assessment tools.</p>
          </div>
          <div className="project-card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>☁️</div>
            <h3 style={{ fontSize: '1.2rem' }}>Cloud Computing</h3>
            <p style={{ fontSize: '0.9rem' }}>Architecting scalable solutions on AWS and Vercel with a focus on high availability.</p>
          </div>
          <div className="project-card" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
            <h3 style={{ fontSize: '1.2rem' }}>DevOps</h3>
            <p style={{ fontSize: '0.9rem' }}>Automating workflows through CI/CD pipelines and scripting to streamline delivery.</p>
          </div>
        </div>
      </section>

      <section className="profile-summary" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Profile</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          I am Guhan V S, a BCA student with hands-on experience in Python, Java, MySQL, and basic web technologies. 
          I specialize in building tools that solve real-world problems while maintaining high security and performance standards.
        </p>
      </section>
    </div>
  );
};

export default Home;
