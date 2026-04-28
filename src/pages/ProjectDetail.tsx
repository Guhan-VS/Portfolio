import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PasswordChecker from '../apps/PasswordChecker/PasswordChecker';
import CryptoTool from '../apps/CryptoTool/CryptoTool';

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

const projectsData: Project[] = [
  {
    id: 'file-organiser',
    title: 'Smart File Organiser',
    description: 'Built a desktop application to organize files automatically by type and keywords.',
    fullDescription: 'A robust Python-based desktop application that automates the organization of cluttered directories. It uses advanced file-handling logic to categorize files into folders based on extensions, keywords, and metadata. Features include a user-friendly GUI, real-time monitoring, and custom rule sets.',
    skills: ['Python', 'Tkinter', 'OS Module', 'File I/O'],
    additionalPhotos: [
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1614849286521-4c58b2f0ff15?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544383335-c5464522c070?auto=format&fit=crop&w=800&q=80'
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
  },
  {
    id: 'crypto-tool',
    title: 'Cryptography Tool',
    description: 'AES-256-GCM file encryption, classical cipher analysis, and key management tool.',
    fullDescription: 'A full-stack cryptography tool implementing AES-256-GCM file encryption, classical cipher analysis (Caesar, Vigenère, ROT13), and cipher detection — built with the Web Crypto API. Supports encryption of any file type with user-controlled key delivery. The server never stores keys.',
    skills: ['Python', 'Flask', 'Cryptography', 'AES-256-GCM', 'RSA', 'Web Crypto API'],
    detailedReportUrl: '#',
    component: <CryptoTool />
  }
];

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projectsData.find(p => p.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="project-detail-page" style={{ padding: '4rem 0' }}>
      <Link to="/projects" style={{ color: 'var(--primary-purple)', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>
        ← Back to Projects
      </Link>
      
      <div className="project-detail-content">
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{project.title}</h1>
        
        <div className="skill-tags" style={{ justifyContent: 'flex-start', marginBottom: '2rem' }}>
          {project.skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>

        {project.image && (
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ width: '100%', borderRadius: '24px', marginBottom: '2rem', border: '1px solid var(--border-color)' }} 
          />
        )}

        <div style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '1rem' }}>Project Overview</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.8' }}>
            {project.fullDescription}
          </p>

          {project.component && (
            <div style={{ marginBottom: '3rem', padding: '2rem', background: 'var(--surface-color)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Live Demo / Interaction</h3>
              {project.component}
            </div>
          )}

          {project.additionalPhotos && project.additionalPhotos.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Gallery</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {project.additionalPhotos.map((photo, index) => (
                  <img 
                    key={index} 
                    src={photo} 
                    alt={`${project.title} screenshot ${index}`} 
                    style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-color)' }} 
                  />
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {project.links?.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                className="cta-button"
                target={link.isDownload ? undefined : "_blank"}
                rel={link.isDownload ? undefined : "noopener noreferrer"}
                download={link.isDownload}
              >
                {link.label}
              </a>
            ))}
            {project.detailedReportUrl && (
              <a href={project.detailedReportUrl} className="cta-button" style={{ background: 'transparent', border: '1px solid var(--primary-purple)' }}>
                View Detailed Report
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
export { projectsData };
