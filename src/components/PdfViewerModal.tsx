import { useEffect } from 'react';

interface PdfViewerModalProps {
  pdfUrl: string | null;
  title: string;
  onClose: () => void;
}

const PdfViewerModal = ({ pdfUrl, title, onClose }: PdfViewerModalProps) => {
  useEffect(() => {
    if (!pdfUrl) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [pdfUrl, onClose]);

  if (!pdfUrl) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <h3 className="pdf-modal-title">{title}</h3>
          <button className="pdf-modal-close" onClick={onClose} title="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="pdf-modal-body">
          <iframe
            src={pdfUrl}
            className="pdf-modal-iframe"
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewerModal;
