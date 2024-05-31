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
}

const ImageUpload = ({ isDisabled, onChange, imageUploaded, errorMessage }: ImageUploadProps) => {
  return (
    <div className="file-uploader">
      <label className={styles.uploadButton}>
        <input
          type="file"
          onChange={onChange}
          disabled={isDisabled} />
        Upload Image
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
