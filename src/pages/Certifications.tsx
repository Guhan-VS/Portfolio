import React, { useState } from 'react';

interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
  skills: string[];
  link?: string;
  photos?: string[];
  detailedReport?: string;
}

const Certifications: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const certifications: Certification[] = [
    { 
      title: 'IBM Full Stack Software Developer', 
      issuer: 'IBM', 
      year: '2025',
      description: 'Comprehensive program covering front-end, back-end, cloud-native development, and DevOps practices using React, Node.js, and Python.',
      skills: ['React', 'Node.js', 'Docker', 'Kubernetes', 'CI/CD'],
      link: '#',
      photos: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80'],
      detailedReport: '#'
    },
    { 
      title: 'Microsoft AI & ML Engineering', 
      issuer: 'Microsoft', 
      year: '2025',
      description: 'Advanced certification focused on building AI solutions with Azure, including machine learning models, computer vision, and NLP.',
      skills: ['Azure ML', 'Python', 'PyTorch', 'Computer Vision', 'NLP'],
      link: '#',
      photos: ['https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=400&q=80'],
      detailedReport: '#'
    },
    { 
      title: 'Google Data Analytics Certificate', 
      issuer: 'Google', 
      year: '2025',
      description: 'In-depth training on data cleaning, analysis, and visualization using SQL, R, and Tableau.',
      skills: ['SQL', 'R Programming', 'Tableau', 'Data Viz', 'Spreadsheets'],
      link: '#',
      photos: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80'],
      detailedReport: '#'
    },
    { 
      title: 'IBM AI Developer', 
      issuer: 'IBM', 
      year: '2025',
      description: 'Specialized program for creating AI-powered applications, focusing on Generative AI, LLMs, and integration with Watson.',
      skills: ['Generative AI', 'Watson AI', 'Python', 'LLMs', 'Prompt Engineering'],
      link: '#',
      photos: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80'],
      detailedReport: '#'
    },
    { 
      title: 'Google Gen AI Program', 
      issuer: 'GDG', 
      year: '2024-2025',
      description: 'A deep dive into Generative AI technologies, including Vertex AI and Gemini model implementation.',
      skills: ['Gemini API', 'Vertex AI', 'TensorFlow', 'Machine Learning'],
      link: '#',
      photos: ['https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80'],
      detailedReport: '#'
    },
    { 
      title: 'Google IT Support & Automation', 
      issuer: 'Google', 
      year: '2025',
      description: 'Foundational IT support combined with advanced Python automation for systems administration.',
      skills: ['Python Automation', 'IT Support', 'Networking', 'Security', 'SysAdmin'],
      link: '#',
      photos: ['https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80'],
      detailedReport: '#'
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="certifications-page" style={{ padding: '4rem 0' }}>
      <section id="certifications" className="certifications">
        <h2>Certifications</h2>
        <div className="project-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className={`project-card ${expandedIndex === index ? 'expanded' : ''}`} 
              style={{ 
                padding: '2rem', 
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => toggleExpand(index)}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2.5rem', marginRight: '1rem' }}>📜</div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', margin: 0 }}>{cert.title}</h4>
                  <p style={{ color: 'var(--primary-purple)', fontSize: '0.9rem', fontWeight: 'bold', margin: 0 }}>{cert.issuer}</p>
                </div>
              </div>
              
              <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: expandedIndex === index ? '1rem' : '0' }}>
                Completed: {cert.year}
              </p>

              {expandedIndex === index && (
                <div className="cert-details" style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    {cert.description}
                  </p>

                  {cert.photos && cert.photos.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h5 style={{ fontSize: '0.9rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>Certification Highlights:</h5>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
                        {cert.photos.map((photo, pIdx) => (
                          <img 
                            key={pIdx} 
                            src={photo} 
                            alt={`${cert.title} highlight`} 
                            style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)' }} 
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h5 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Key Skills:</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {cert.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          style={{ 
                            fontSize: '0.75rem', 
                            background: 'var(--accent-bg)', 
                            color: 'var(--accent)', 
                            padding: '2px 8px', 
                            borderRadius: '4px',
                            border: '1px solid var(--accent-border)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'auto', flexWrap: 'wrap' }}>
                    {cert.link && (
                      <a 
                        href={cert.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cta-button"
                        style={{ 
                          fontSize: '0.8rem', 
                          padding: '0.5rem 1rem', 
                          width: 'fit-content'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Verify Certificate
                      </a>
                    )}
                    {cert.detailedReport && (
                      <a 
                        href={cert.detailedReport} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cta-button"
                        style={{ 
                          fontSize: '0.8rem', 
                          padding: '0.5rem 1rem', 
                          width: 'fit-content',
                          background: 'transparent',
                          border: '1px solid var(--primary-purple)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Detailed Report
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              {!expandedIndex !== null && expandedIndex !== index && (
                <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--primary-purple)', textAlign: 'right' }}>
                  Click to see details ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Certifications;
