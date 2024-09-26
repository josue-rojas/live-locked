import { useEffect, useState } from "react";
// import ImageUpload from "../../components/UploadButton";
import { AllImagesResponse, ImageService } from "../../services/ImageService";
// import { useImageUpload } from "../../hooks/useImageUpload";
import { ImageCard } from "../../components/ImageCard";
import { BUCKET_URL } from "../../constants/supabase";
import styles from './styles.module.css';
import { PixelCanvas } from "../../components/PixelCanvas";

export function Home() {
  const [images, setImages] = useState<AllImagesResponse>([]);
  // const { uploadFunction, loading, imageUploaded, errorMessage } = useImageUpload();

  useEffect(() => {
    ImageService.getAllIMages().then((images) => {
      if (images.data) {
        setImages(images.data);
      }
    });
  }, []);

  return <>
    <PixelCanvas/>
    {/* <ImageUpload
      onChange={(e) => {
        const imageFile = e.target.files?.[0];

        if (!imageFile) {
          console.warn('TODO: image not found')
        } else {
          uploadFunction(imageFile).then((newImage) => {
            if (newImage) {
              const copyImages = [...images];
              copyImages.unshift({
                id: Date.now(), // todo: set this right
                uploaded_date: new Date().toString(),
                bucket_location: newImage.name,
                uploaded_by: 'You!',
                storage_id: '1'
              });
              setImages(copyImages);
            }
          })
        }
      }}
      imageUploaded={imageUploaded}
      loading={loading}
      errorMessage={errorMessage}
    /> */}
    <div className="images">
      {images.map((image) => {
        return <ImageCard
          className={styles.imageCard}
          key={image.id}
          src={BUCKET_URL + 'images/' + image.bucket_location}
          alt={image.bucket_location}
          title={image.bucket_location}
          author={image.uploaded_by}
          date={image.uploaded_date}
        />
      })}
    </div>
  </>;
}
