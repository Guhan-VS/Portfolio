import { useScrollReveal } from '../hooks/useScrollReveal';

const skillCategories = [
  {
    icon: '💻',
    title: 'Languages',
    skills: ['C', 'C++', 'Java', 'Python', 'JavaScript'],
  },
  {
    icon: '🌐',
    title: 'Web Technologies',
    skills: ['HTML5', 'CSS3', 'React.js', 'Node.js', 'Django', 'REST APIs'],
  },
  {
    icon: '🗄️',
    title: 'Databases',
    skills: ['MySQL', 'MongoDB'],
  },
  {
    icon: '⚙️',
    title: 'DevOps & Tools',
    skills: ['Linux', 'Git', 'GitHub'],
  },
  {
    icon: '🧠',
    title: 'Concepts',
    skills: ['Generative AI', 'Machine Learning'],
  },
  {
    icon: '🤝',
    title: 'Soft Skills',
    skills: ['Communication', 'Teamwork', 'Problem Solving', 'Adaptability', 'Analytical Thinking'],
  },
];

const Skills = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="skills" className="section scroll-reveal" ref={ref}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Technical Toolkit</h2>
          <p className="section-subtitle">
            A versatile skill set spanning full-stack development, cloud infrastructure, and AI.
          </p>
        </div>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="glass-card skill-category stagger-child">
              <span className="skill-category-icon">{category.icon}</span>
              <h3>{category.title}</h3>
              <div className="skill-list">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
