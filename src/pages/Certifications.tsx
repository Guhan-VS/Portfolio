import React from 'react';

const Certifications: React.FC = () => {
  const certifications = [
    { title: 'IBM Full Stack Software Developer', issuer: 'IBM', year: '2025' },
    { title: 'Microsoft AI & ML Engineering', issuer: 'Microsoft', year: '2025' },
    { title: 'Google Data Analytics Certificate', issuer: 'Google', year: '2025' },
    { title: 'IBM AI Developer', issuer: 'IBM', year: '2025' },
    { title: 'Google Gen AI Program', issuer: 'GDG', year: '2024-2025' },
    { title: 'Google IT Support & Automation', issuer: 'Google', year: '2025' },
  ];

  return (
    <div className="certifications-page" style={{ padding: '4rem 0' }}>
      <section id="certifications" className="certifications">
        <h2>Certifications</h2>
        <div className="project-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {certifications.map((cert, index) => (
            <div key={index} className="project-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📜</div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{cert.title}</h4>
              <p style={{ color: 'var(--primary-purple)', fontSize: '1rem', fontWeight: 'bold' }}>{cert.issuer}</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '0.5rem' }}>Completed: {cert.year}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Certifications;
