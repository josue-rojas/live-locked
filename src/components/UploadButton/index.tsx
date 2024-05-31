import { ChangeEventHandler } from 'react';
import styles from './styles.module.css';

interface ImageUploadProps {
  isDisabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  imageUploaded?: {
    name: string;
    url: string;
  };
  errorMessage?: string
  loading?: boolean;
}

const ImageUpload = ({ isDisabled, onChange, imageUploaded, errorMessage, loading }: ImageUploadProps) => {
  return (
    <div className="file-uploader">
      <label className={styles.uploadButton}>
        <input
          accept=".jpg, .jpeg, .png"
          type="file"
          onChange={onChange}
          disabled={isDisabled || loading} />
        {loading ? 'loading' : 'Upload Image'}
      </label>

      {imageUploaded?.name &&
        <>
          <br></br>
          Image succesfully uploaded
          <br></br>
          <a href={imageUploaded.url}>
            <span>{imageUploaded.name}</span>
          </a>
        </>}
      {errorMessage &&
        <p>
          {errorMessage}
        </p>
      }
      </div>
    )
}

export default ImageUpload;
