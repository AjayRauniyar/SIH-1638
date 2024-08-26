import styles from '../../styles/Community.module.css';

export default function Community() {
  const posts = [
    { author: 'Farmer Raj', content: 'What is the best treatment for wheat blight?', date: '2024-08-12' },
    { author: 'Farmer Sunita', content: 'I tried neem oil for rice blast, worked well!', date: '2024-08-13' },
    { author: 'Farmer Akash', content: 'Looking for organic solutions for maize mosaic virus.', date: '2024-08-14' }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Community Discussions</h2>
      <div className={styles.postsList}>
        {posts.map((post, index) => (
          <div key={index} className={styles.postItem}>
            <h3>{post.author}</h3>
            <p>{post.content}</p>
            <p className={styles.postDate}>Posted on: {post.date}</p>
          </div>
        ))}
      </div>
      <div className={styles.newPost}>
        <h3>Start a New Discussion</h3>
        <textarea placeholder="Share your thoughts..."></textarea>
        <button type="submit">Post</button>
      </div>
    </div>
  );
}
