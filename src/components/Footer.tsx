const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          © {new Date().getFullYear()} <strong>Guhan V S</strong> · Built with React + TypeScript
        </p>
      </div>
    </footer>
  );
};

export default Footer;
