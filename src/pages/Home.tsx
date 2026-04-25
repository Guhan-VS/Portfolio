import React from 'react';

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
          <a href="/projects" className="cta-button">Explore Projects</a>
          <a href="https://www.linkedin.com/in/guhanvs06/" target="_blank" rel="noopener noreferrer" className="cta-button" style={{ background: 'transparent', border: '1px solid var(--primary-purple)' }}>LinkedIn</a>
        </div>
      </header>

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
