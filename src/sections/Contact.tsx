import { useScrollReveal } from '../hooks/useScrollReveal';

const Contact = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="contact" className="section scroll-reveal" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Connect</h2>
        </div>
        <div className="contact-inner">
          <p>
            I'm always open to discussing new opportunities, collaborations, or just having a tech conversation.
          </p>
          <div className="contact-links">
            <a href="mailto:guhanvs2006@gmail.com" className="contact-item">
              ✉️ guhanvs2006@gmail.com
            </a>
            <a href="tel:+916382058504" className="contact-item">
              📞 6382058504
            </a>
            <a href="https://www.linkedin.com/in/guhanvs06/" target="_blank" rel="noopener noreferrer" className="contact-item">
              🔗 LinkedIn
            </a>
            <a href="https://github.com/Guhan-VS" target="_blank" rel="noopener noreferrer" className="contact-item">
              💻 GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
