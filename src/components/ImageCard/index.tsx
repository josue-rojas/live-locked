import styles from './styles.module.css';

interface ImageCardProps {
  alt: string;
  author: string;
  className?: string;
  src: string;
  title: string;
  date: string;
}

export function ImageCard(props: ImageCardProps) {
  return <div className={styles.imageCard + ' ' + props.className}>
    <img src={props.src} alt={props.alt}></img>
    <div className={styles.info}>
      <p>File Name: {props.title}</p>
      <p>Uploaded by: {props.author}</p>
      <p>Upload date: {props.date}</p>
    </div>
  </div>
}
