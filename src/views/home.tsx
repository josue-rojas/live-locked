import { useEffect, useState } from "react";
import ImageUpload from "../components/UploadButton";
import { AllImagesResponse, ImageService } from "../services/ImageService";
import { useImageUpload } from "../hooks/useImageUpload";

export function Home() {
  const [images, setImages] = useState<AllImagesResponse>([]);
  const { uploadFunction, loading, imageUploaded, errorMessage } = useImageUpload();

  useEffect(() => {
    ImageService.getAllIMages().then((images) => {
      if (images.data) {
        setImages(images.data);
      }
    });
  }, []);

  console.log(images);

  return <>
    <ImageUpload
      onChange={(e) => {
        const imageFile = e.target.files?.[0];

        if (!imageFile) {
          console.log('TODO: image not found')
        } else {
          uploadFunction(imageFile);
        }
      }}
      imageUploaded={imageUploaded}
      isDisabled={loading}
      errorMessage={errorMessage}
    />
    <div className="images">
      {images.map((image) => {
        return image.bucket_location
      })}
    </div>
  </>;
}
