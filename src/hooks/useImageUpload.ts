import { useState } from "react";
import { ImageService } from "../services/ImageService";

interface ImageUpload {
  name: string;
  url: string;
}

export function useImageUpload() {
  const [imageUploaded, setImageUploaded] = useState({ name: '', url: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: this function is a bit confusing. maybe we can simplifying by removing the return
  // or soemthing else
  const uploadFunction = async (file: File): Promise<ImageUpload | void> => {
    setLoading(true);
    setImageUploaded({ name: '', url: '' });
    setErrorMessage("");
    let newImage: ImageUpload | null = null;

    try {
      const uploadResponse = await ImageService.uploadImage(file)
      if (uploadResponse.success && uploadResponse.data) {
        newImage = {
          name: uploadResponse.data.path,
          url: uploadResponse.data.fullPath,
        }
        setImageUploaded(newImage);
        setLoading(false);

        return newImage
      } else {
        console.warn('useImageUpload', uploadResponse.error?.message)
        setErrorMessage(
          `Error for ${file.name}: ` + 
          uploadResponse.error?.message || 'Unknown Error Occurred'
        );
        setLoading(false);
      }
    } catch (e: any) {
      console.error('useImageUpload catch', e);
      setLoading(false);
      setErrorMessage(
        `Error for ${file.name}: ` + 
        e?.message || 'Unknown Error'
      )
    }
  }

  return {
    errorMessage,
    imageUploaded,
    loading,
    uploadFunction,
  }
}
