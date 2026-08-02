import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import PdfViewerModal from '../components/PdfViewerModal';

const publications = [
  {
    type: 'paper',
    icon: '📄',
    title: 'Research Paper — ICAC 2024',
    detail: 'Published paper in ML/AI & Healthcare at the International Conference on Advanced Computing.',
    pdf: '/certificates/ICAC 2024.pdf',
  },
  {
    type: 'paper',
    icon: '📄',
    title: 'Research Paper — IICBS 2025',
    detail: 'Published paper in ML/AI & Healthcare at the International Interdisciplinary Conference on Biological Sciences.',
    pdf: '/certificates/IICBS- 2025.pdf',
  },
  {
    type: 'paper',
    icon: '📄',
    title: 'Research Paper — PSGR-KCW 2025',
    detail: 'Published paper in ML/AI & Healthcare.',
    pdf: '/certificates/PSGR KCW.pdf',
  },
  {
    type: 'book',
    icon: '📘',
    title: 'Book Chapter Contribution',
    detail: '"Bridging Code and Queries" — ISBN: 978-81-985222-8-3',
    url: 'https://www.amazon.in/Bridging-Code-Queries-Prof-N-Karthick/dp/B0DW8MYH4K',
  },
];

const Publications = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [viewingPdf, setViewingPdf] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="publications" className="section scroll-reveal" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Publications</span>
          <h2 className="section-title">Research & Writing</h2>
          <p className="section-subtitle">
            3 papers in ML/AI & Healthcare and a book chapter contribution.
          </p>
        </div>
        <div className="pub-list">
          {publications.map((pub, index) => (
            <div key={index} className="glass-card pub-card stagger-child">
              <span className="pub-icon">{pub.icon}</span>
              <div className="pub-info">
                <h4>{pub.title}</h4>
                <p>{pub.detail}</p>
                <div className="pub-actions">
                  {pub.pdf && (
                    <button
                      className="cert-view-btn cert-view-btn-inline"
                      onClick={() => setViewingPdf({ url: pub.pdf!, title: pub.title })}
                      title={`View ${pub.title}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      View Paper
                    </button>
                  )}
                  {pub.url && (
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-view-btn cert-view-btn-inline cert-view-btn-link"
                      title={`View on Amazon`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      View on Amazon
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
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

export default Publications;
