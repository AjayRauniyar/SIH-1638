import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to CropNurture</h1>
        <p>Your AI-powered assistant for crop disease detection and management.</p>
        <a href="/analyze" className={styles.heroBtn}>Get Started</a>
      </section>
      <section className={styles.features}>
        <h2>Our Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <h3>Instant Crop Diagnosis</h3>
            <p>Quickly identify crop diseases using our AI-powered analysis tool.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Personalized Treatment</h3>
            <p>Receive tailored treatment recommendations based on your crop’s condition.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Community Support</h3>
            <p>Join our community to discuss farming practices and share knowledge.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Educational Resources</h3>
            <p>Access a wide range of educational materials to improve your farming skills.</p>
          </div>
        </div>
      </section>
      <section className={styles.newsletter}>
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest updates on crop management and AI tools.</p>
        <form className={styles.newsletterForm}>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
}
