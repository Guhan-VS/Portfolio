import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PdfViewerModal from '../components/PdfViewerModal';

const Experience = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [viewingPdf, setViewingPdf] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="experience" className="section scroll-reveal" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Work History</h2>
        </div>
        <div className="glass-card experience-card">
          <div className="exp-header">
            <div>
              <h3 className="exp-role">Software Development Intern</h3>
              <p className="exp-company">Skypark iTech, Coimbatore</p>
            </div>
            <span className="exp-date">Apr 2026 – May 2026</span>
          </div>
          <ul className="exp-bullets">
            <li>Built a full-stack CRM Dashboard using HTML, CSS, JavaScript, Python, MySQL, and MongoDB.</li>
            <li>Completed end-to-end development workflows covering web technologies, programming, and database management.</li>
            <li>Gained hands-on experience with modern development practices including REST API design and role-based access control.</li>
          </ul>
          <div className="exp-certificates">
            <button
              className="cert-view-btn cert-view-btn-inline"
              onClick={() => setViewingPdf({ url: '/certificates/Internship Certificate.pdf', title: 'Internship Certificate' })}
              title="View Internship Certificate"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Internship Certificate
            </button>
            <button
              className="cert-view-btn cert-view-btn-inline"
              onClick={() => setViewingPdf({ url: '/certificates/CRM Dashboard.pdf', title: 'CRM Dashboard Certificate' })}
              title="View CRM Dashboard Certificate"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              CRM Dashboard Certificate
            </button>
          </div>
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

export default Experience;
