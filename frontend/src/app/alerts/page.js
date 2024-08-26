import styles from '../../styles/Alerts.module.css';

export default function Alerts() {
  const alerts = [
    { region: 'Punjab', crop: 'Wheat', disease: 'Blight', date: '2024-08-10' },
    { region: 'Haryana', crop: 'Rice', disease: 'Blast', date: '2024-08-12' },
    { region: 'Karnataka', crop: 'Maize', disease: 'Mosaic Virus', date: '2024-08-15' }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Outbreak Alerts</h2>
      <div className={styles.alertGrid}>
        {alerts.map((alert, index) => (
          <div key={index} className={styles.alertCard}>
            <h3>{alert.crop} - {alert.disease}</h3>
            <p><strong>Region:</strong> {alert.region}</p>
            <p><strong>Date:</strong> {alert.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
