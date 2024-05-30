import { useState } from 'react';
import styles from './styles.module.css';

type ImageBlock = [imageName: string, imageSrc: string];
interface ImageUploadProps {
  setImages: (imageBlock: ImageBlock) => void;
  isDisabled?: boolean;
}

const ImageUpload = ({ setImages, isDisabled }: ImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState({ imageName: '', url: '' });

  const handleFileInput = async (e: any) => {
    const file = e.target.files[0];
    // const { uploadUrl, imageName } = await firebaseUtils.uploadImage(file)
    // setImageUrl({ imageName, url: uploadUrl })
    // setImages([imageName, uploadUrl]);
  }

  return (
    <div className="file-uploader">
      <label className={styles.uploadButton}>
        <input type="file" onChange={handleFileInput} disabled={isDisabled} />
        Upload Image
      </label>

      {imageUrl.imageName &&
        <>
          <br></br>
          Image succesfully updated
          <br></br>
          <a href={imageUrl.url}>
            <span>{imageUrl.imageName}</span>
          </a>
        </>}
      </div>
    )
}

export default ImageUpload;
