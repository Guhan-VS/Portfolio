import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PasswordChecker from '../apps/PasswordChecker/PasswordChecker';

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  skills: string[];
  image?: string;
  additionalPhotos?: string[];
  detailedReportUrl?: string;
  links?: { label: string; url: string; isDownload?: boolean }[];
  component?: React.ReactNode;
}

const Projects: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      setExpandedId(projectId);
      // Small delay to ensure the component is rendered
      setTimeout(() => {
        const element = document.getElementById(projectId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [projectId]);

  const projects: Project[] = [
    {
      id: 'file-organiser',
      title: 'Smart File Organiser',
      description: 'Built a desktop application to organize files automatically by type and keywords.',
      fullDescription: 'A robust Python-based desktop application that automates the organization of cluttered directories. It uses advanced file-handling logic to categorize files into folders based on extensions, keywords, and metadata. Features include a user-friendly GUI, real-time monitoring, and custom rule sets.',
      skills: ['Python', 'Tkinter', 'OS Module', 'File I/O'],
      additionalPhotos: [
        'https://images.unsplash.com/photo-1544383335-c5464522c070?auto=format&fit=crop&w=600&q=80'
      ],
      detailedReportUrl: '#',
      links: [
        { label: 'Source Code', url: 'https://github.com/Guhan-VS/Smart-File-Organsier' },
        { label: 'Download .EXE', url: '/SmartFileOrganiser.exe', isDownload: true }
      ]
    },
    {
      id: 'bluetooth-car',
      title: 'Bluetooth-Enabled Controlled Car',
      image: '/bluetooth-car.jpg',
      description: 'Built a 2WD robot car controlled via a mobile app using the HC-05 Bluetooth module.',
      fullDescription: 'An embedded systems project featuring a 2WD robot car. The hardware stack includes an Arduino Uno, L298N Motor Driver, and HC-05 Bluetooth module. The software is written in Embedded C, implementing PWM for speed control and a custom serial protocol for app-to-car communication.',
      skills: ['Arduino', 'HC-05', 'Embedded C', 'L298N Motor Driver', 'PWM Control'],
      additionalPhotos: [
        'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=600&q=80'
      ],
      detailedReportUrl: '#',
    },
    {
      id: 'password-checker',
      title: 'Password Strength Checker',
      description: 'An interactive web tool implementing OWASP guidelines with real-time feedback.',
      fullDescription: 'A specialized security utility built with React. It analyzes password complexity based on multiple entropy factors, provides live visual feedback, and offers specific recommendations to improve password strength according to modern security standards.',
      skills: ['React', 'TypeScript', 'Cybersecurity', 'Regex'],
      detailedReportUrl: '#',
      component: <PasswordChecker />
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="projects-page" style={{ padding: '4rem 0' }}>
      <section id="projects" className="projects">
        <h2>Projects Showcase</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              id={project.id}
              className={`project-card ${expandedId === project.id ? 'expanded' : ''}`}
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => toggleExpand(project.id)}
            >
              <h3>{project.title}</h3>
              
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }} 
                />
              )}

              <p style={{ marginBottom: expandedId === project.id ? '1rem' : '1.5rem' }}>
                {expandedId === project.id ? project.fullDescription : project.description}
              </p>

              {expandedId === project.id && (
                <>
                  {project.additionalPhotos && project.additionalPhotos.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h5 style={{ fontSize: '0.9rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>Project Gallery:</h5>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem' }}>
                        {project.additionalPhotos.map((photo, pIdx) => (
                          <img 
                            key={pIdx} 
                            src={photo} 
                            alt={`${project.title} gallery ${pIdx}`} 
                            style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border-color)', height: '150px', objectFit: 'cover' }} 
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {project.detailedReportUrl && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <a 
                        href={project.detailedReportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-button"
                        style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem', background: 'var(--accent-bg)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        📄 View Detailed Report
                      </a>
                    </div>
                  )}
                </>
              )}

              <div className="skill-tags" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
                {project.skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>

              {expandedId === project.id && project.component && (
                <div style={{ marginBottom: '1.5rem' }} onClick={(e) => e.stopPropagation()}>
                  {project.component}
                </div>
              )}

              {project.links && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                  {project.links.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url} 
                      target={link.isDownload ? undefined : "_blank"} 
                      rel={link.isDownload ? undefined : "noopener noreferrer"}
                      download={link.isDownload}
                      className="cta-button" 
                      style={{ 
                        fontSize: '0.8rem', 
                        padding: '0.5rem 1rem', 
                        background: link.label.includes('Source') ? 'transparent' : 'var(--primary-purple)', 
                        border: link.label.includes('Source') ? '1px solid var(--primary-purple)' : 'none' 
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              {!expandedId !== null && expandedId !== project.id && (
                <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--primary-purple)', textAlign: 'right' }}>
                  Read More ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
