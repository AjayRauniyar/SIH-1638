import styles from '../../styles/Education.module.css';

export default function Education() {
  const resources = [
    { title: 'Understanding Crop Diseases', link: 'https://example.com/crop-diseases', description: 'A comprehensive guide to common crop diseases and their management.' },
    { title: 'Organic Treatments for Crop Diseases', link: 'https://example.com/organic-treatments', description: 'Explore organic and natural treatment methods for various crop diseases.' },
    { title: 'Using AI in Agriculture', link: 'https://example.com/ai-agriculture', description: 'Learn how AI is revolutionizing the agriculture industry.' }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Educational Resources</h2>
      <div className={styles.resourceGrid}>
        {resources.map((resource, index) => (
          <div key={index} className={styles.resourceCard}>
            <h3><a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.title}</a></h3>
            <p>{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
