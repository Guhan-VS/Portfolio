import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Guhan V S. Built for the future.</p>
      <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.6 }}>
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </footer>
  );
};

export default Footer;
