'use client'; 

import React, { useState } from 'react';
import styles from '../../styles/Education.module.css';

export default function Education() {
  const [activeIndex, setActiveIndex] = useState(null);

  const resources = [
    { title: 'Understanding Crop Diseases', link: 'https://geopard.tech/blog/how-to-control-crop-diseases-with-smart-agriculture/#:~:text=Crop%20diseases%20symptoms%20caused%20by,and%20the%20entire%20plant%3B%20and', description: 'A comprehensive guide to common crop diseases and their management.' },
    { title: 'Organic Treatments for Crop Diseases', link: 'https://cropprotectionnetwork.org/', description: 'Explore organic and natural treatment methods for various crop diseases.' },
    { title: 'Using AI in Agriculture', link: 'https://intellias.com/artificial-intelligence-in-agriculture/', description: 'Learn how AI is revolutionizing the agriculture industry.' }
  ];

  const faqs = [
    { question: 'What are the most common causes of crop diseases?', answer: 'Crop diseases are typically caused by pathogens such as fungi, bacteria, viruses, and nematodes. Environmental factors like poor soil conditions, excessive moisture, and temperature fluctuations can also contribute to the spread of diseases.' },
    { question: 'How can I identify if my crops are diseased?', answer: 'Common signs of crop diseases include discoloration, wilting, spots on leaves, stunted growth, and abnormal development. Early identification is crucial for effective management.' },
    { question: 'What are some natural methods for managing crop diseases?', answer: 'Natural methods include crop rotation, using disease-resistant crop varieties, applying organic fungicides, and encouraging beneficial insects that can help control disease-spreading pests.' },
    { question: 'Can crop diseases spread from one plant to another?', answer: 'Yes, many crop diseases can spread through water, wind, soil, insects, or contaminated tools. It\'s important to implement good hygiene practices and proper crop spacing to minimize the risk of spreading diseases.' },
    { question: 'How can I prevent crop diseases from affecting my harvest?', answer: 'Preventative measures include selecting resistant crop varieties, ensuring proper soil health, rotating crops, practicing good irrigation management, and maintaining proper plant spacing to reduce humidity around plants.' },
    { question: 'Are there any technologies that can help in detecting and managing crop diseases?', answer: 'Yes, modern technologies such as drones, AI-based disease detection tools, and mobile apps can help farmers monitor crop health, detect early signs of diseases, and manage them more efficiently.' }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Crop Diseases with Educational Resources</h2>
      
      <div className={styles.infoSection}>
        <div className={styles.textWithImage}>
          <div className={styles.textSection}>
            <h3 className={styles.subheading}>What is crop disease?</h3>
            <p className={styles.paragraph}>
              Plants become diseased when they are consistently affected by a particular cause, leading to disruptions in their normal physiological processes. This interference can alter the plant's structure, growth, and overall functioning.<br /><br />
              Disease symptoms arise due to disturbances in one or more of the plant’s vital biochemical and physiological systems.<br /><br />
              The frequency and spread of crop diseases change with the seasons, influenced by the presence of pathogens, environmental conditions, and the types of crops and varieties being cultivated. Certain plant varieties are more vulnerable to disease outbreaks than others.
            </p>
          </div>
          <div className={styles.imageSection}>
            <img src="image.png" alt="Crop Disease" className={styles.image}/>
          </div>
        </div>
      </div>

      <div className={styles.resourceGrid}>
        {resources.map((resource, index) => (
          <div key={index} className={styles.resourceCard}>
            <h3><a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.title}</a></h3>
            <p>{resource.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.faqSection}>
        <h3 className={styles.faqHeading}>Frequently Asked Questions (FAQs)</h3>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div 
              className={styles.faqQuestion} 
              onClick={() => toggleFAQ(index)}
            >
              <span className={styles.faqIndicator}>
                {activeIndex === index ? '–' : '+'}
              </span>
              {faq.question}
            </div>
            <div 
              className={`${styles.faqAnswer} ${activeIndex === index ? styles.open : ''}`}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <br/><br/><br/>
    </div>
  );
}
