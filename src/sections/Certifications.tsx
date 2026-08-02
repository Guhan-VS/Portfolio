import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PdfViewerModal from '../components/PdfViewerModal';

const certifications = [
  {
    title: 'Google Data Analytics Certificate',
    issuer: 'Google',
    year: '2025',
    pdf: '/certificates/Google Data Analytics.pdf',
  },
  {
    title: 'IBM AI Developer',
    issuer: 'IBM',
    year: '2025',
    pdf: '/certificates/IBM AI Developer.pdf',
  },
  {
    title: 'Google Project Management',
    issuer: 'Google',
    year: '2025',
    pdf: '/certificates/Google Project Management.pdf',
  },
  {
    title: 'Google Gen AI Program',
    issuer: 'GDG',
    year: '2024–2025',
    pdf: '/certificates/GDG Gen AI Program.pdf',
  },
  {
    title: 'Microsoft AI & ML Engineering',
    issuer: 'Microsoft',
    year: '2025',
    pdf: '/certificates/MS AI & ML Eng.pdf',
  },
  {
    title: 'Google IT Support',
    issuer: 'Google',
    year: '2025',
    pdf: '/certificates/Google IT support.pdf',
  },
  {
    title: 'Google IT Automation with Python',
    issuer: 'Google',
    year: '2025',
    pdf: '/certificates/Google IT Automation with Python.pdf',
  },
  {
    title: 'IBM Full Stack Software Developer',
    issuer: 'IBM',
    year: '2025',
    pdf: '/certificates/IBM Full STack Software Developer.pdf',
  },
  {
    title: 'OCI Generative AI Professional',
    issuer: 'Oracle',
    year: '2025',
    pdf: '/certificates/OCI Generative AI Professional.pdf',
  },
  {
    title: 'Developing Soft Skills and Personality',
    issuer: 'NPTEL',
    year: '2024',
    pdf: '/certificates/Developing Soft Skills and Personality.pdf',
  },
];

const issuerIcons: Record<string, string> = {
  Google: '🔵',
  IBM: '🟣',
  Microsoft: '🟢',
  GDG: '🔴',
  Oracle: '🟠',
  NPTEL: '🟡',
};

const Certifications = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewingPdf, setViewingPdf] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="certifications" className="section scroll-reveal" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Certifications</span>
          <h2 className="section-title">Professional Credentials</h2>
          <p className="section-subtitle">
            Industry-recognized certifications from leading tech companies.
            Click to view each certificate.
          </p>
        </div>
        <div className="certs-grid">
          {certifications.map((cert, index) => {
            const inner = (
              <>
                <div className="cert-icon">{issuerIcons[cert.issuer] || '📜'}</div>
                <div className="cert-info">
                  <h4>{cert.title}</h4>
                  <p className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span> · {cert.year}
                  </p>
                </div>
              </>
            );

            return cert.pdf ? (
              <div
                key={index}
                className="glass-card cert-card cert-card-link stagger-child"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setViewingPdf({ url: cert.pdf!, title: cert.title })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setViewingPdf({ url: cert.pdf!, title: cert.title })}
                title={`View ${cert.title} certificate`}
              >
                {inner}
                <span className={`cert-view-btn${hoveredIndex === index ? ' cert-view-btn-active' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View
                </span>
              </div>
            ) : (
              <div key={index} className="glass-card cert-card stagger-child">
                {inner}
              </div>
            );
          })}
        </div>
      </div>

      <PdfViewerModal
        pdfUrl={viewingPdf?.url ?? null}
        title={viewingPdf?.title ?? ''}
        onClose={() => setViewingPdf(null)}
      />
    </section>
  );
};

export default Certifications;
