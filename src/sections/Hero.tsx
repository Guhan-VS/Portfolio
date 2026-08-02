import { useScrollReveal } from '../hooks/useScrollReveal';

const Hero = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-content scroll-reveal revealed">
        <div className="hero-avatar">
          <img src="/MY PIC.jpeg" alt="Guhan V S" className="hero-avatar-img" />
        </div>
        <p className="hero-greeting">Hello, I'm</p>
        <h1>
          <span className="gradient-text">Guhan V S</span>
        </h1>
        <p className="hero-tagline">
          A passionate BCA student with hands-on experience in full-stack development, 
          building secure and scalable solutions.
        </p>
        <div className="hero-roles">
          <span className="hero-role">Full-Stack Dev</span>
          <span className="hero-role">Cybersecurity</span>
          <span className="hero-role">Cloud Computing</span>
          <span className="hero-role">AI / ML</span>
        </div>
        <div className="hero-buttons">
          <a href="#projects" className="btn btn-primary">View Projects</a>
          <a href="https://www.linkedin.com/in/guhanvs06/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">LinkedIn →</a>
          <a href="https://github.com/Guhan-VS" target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub →</a>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <span>↓</span>
      </div>
    </section>
  );
};

export default Hero;
