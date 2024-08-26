import styles from '../../styles/Pharmacists.module.css';

export default function Pharmacists() {
  const pharmacists = [
    { name: 'AgriPharm', location: 'Ludhiana, Punjab', contact: '9876543210', mapLink: 'https://maps.google.com/' },
    { name: 'GreenCare', location: 'Karnal, Haryana', contact: '9876543211', mapLink: 'https://maps.google.com/' },
    { name: 'CropHealth', location: 'Bangalore, Karnataka', contact: '9876543212', mapLink: 'https://maps.google.com/' }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Find a Pharmacist</h2>
      <div className={styles.pharmacistGrid}>
        {pharmacists.map((pharmacist, index) => (
          <div key={index} className={styles.pharmacistCard}>
            <h3>{pharmacist.name}</h3>
            <p><strong>Location:</strong> {pharmacist.location}</p>
            <p><strong>Contact:</strong> {pharmacist.contact}</p>
            <a href={pharmacist.mapLink} target="_blank" rel="noopener noreferrer">View on Map</a>
          </div>
        ))}
      </div>
    </div>
  );
}
