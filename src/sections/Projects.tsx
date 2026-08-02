import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import CryptoTool from '../apps/CryptoTool/CryptoTool';
import PdfViewerModal from '../components/PdfViewerModal';

const projects = [
  {
    id: 'crm',
    number: '01',
    title: 'CRM Dashboard for Wholesale & Retail Management',
    description:
      'A full-stack CRM dashboard featuring customer management, inventory tracking, and sales reporting modules. Integrates MySQL and MongoDB for hybrid storage with role-based access control and real-time dashboards.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'MySQL', 'MongoDB'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Guhan-VS/CRM' },
    ],
    certificate: '/certificates/CRM Dashboard.pdf',
  },
  {
    id: 'file-organiser',
    number: '02',
    title: 'Smart File Organiser',
    description:
      'A Python desktop application that auto-sorts files by type with a Tkinter GUI and operation logging. Reduced manual file organization effort significantly through automated folder management and custom rule sets.',
    skills: ['Python', 'Tkinter', 'OS Module', 'File I/O'],
    links: [
      { label: 'Source Code', url: 'https://github.com/Guhan-VS/Smart-File-Organsier' },
      { label: 'Download App', url: '/Smart_File_Organiser.exe', download: true },
    ],
    certificate: '/certificates/Smart File Organiser.pdf',
  },
  {
    id: 'crypto-tool',
    number: '03',
    title: 'Cryptography Tool',
    description:
      'AES-256-GCM file encryption, classical cipher analysis (Caesar, Vigenère, ROT13), and cipher detection — built with the Web Crypto API. Supports encryption of any file type with user-controlled key delivery.',
    skills: ['Python', 'Flask', 'Cryptography', 'AES-256-GCM', 'Web Crypto API'],
    links: [],
    hasDemo: true,
  },
];

const Projects = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [showDemo, setShowDemo] = useState(false);
  const [viewingPdf, setViewingPdf] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="projects" className="section scroll-reveal" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            Real-world applications spanning full-stack development, desktop tooling, and cryptography.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={project.id} className="glass-card project-card stagger-child" style={{ animationDelay: `${index * 0.1}s` }}>
              <span className="project-number">{project.number}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="tag">{skill}</span>
                ))}
              </div>
              <div className="project-links">
                {project.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.url}
                    target={(link as any).download ? undefined : "_blank"}
                    rel={(link as any).download ? undefined : "noopener noreferrer"}
                    download={(link as any).download ? true : undefined}
                    className="project-link"
                  >
                    {link.label} {(link as any).download ? '↓' : '↗'}
                  </a>
                ))}
                {project.hasDemo && (
                  <button
                    className="project-link"
                    onClick={() => setShowDemo(!showDemo)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    {showDemo ? 'Hide Demo ✕' : 'Try Live Demo ▶'}
                  </button>
                )}
                {project.certificate && (
                  <button
                    className="project-link"
                    onClick={() => setViewingPdf({ url: project.certificate!, title: `${project.title} Certificate` })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    📜 View Certificate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {showDemo && (
          <div className="demo-container" style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>
              <span className="gradient-text">Cryptography Tool</span> — Live Demo
            </h3>
            <CryptoTool />
          </div>
        )}
      </div>

      <PdfViewerModal
        pdfUrl={viewingPdf?.url ?? null}
        title={viewingPdf?.title ?? ''}
        onClose={() => setViewingPdf(null)}
      />
    </section>
  );
};

export default Projects;
