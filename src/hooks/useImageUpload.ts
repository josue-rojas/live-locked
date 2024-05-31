import { useState } from "react";
import { ImageService } from "../services/ImageService";

export function useImageUpload() {
  const [imageUploaded, setImageUploaded] = useState({ name: '', url: '' });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const uploadFunction = (file: File) => {
    setLoading(true);
    setImageUploaded({ name: '', url: '' });
    setErrorMessage("");

    ImageService.uploadImage(file).then((uploadResponse) => {
      if (uploadResponse.success && uploadResponse.data) {
        setImageUploaded({
          name: uploadResponse.data.path,
          url: uploadResponse.data.fullPath,
        });
        setLoading(false);
      } else {
        console.warn('useImageUpload', uploadResponse.error?.message)
        setErrorMessage(
          `Error for ${file.name}: ` + 
          uploadResponse.error?.message || 'Unknown Error Occurred'
        );
        setLoading(false);
      }
    }).catch((e) => {
      console.error('useImageUpload catch', e);
      setLoading(false);
      setErrorMessage(
        `Error for ${file.name}: ` + 
        e.message || 'Unknown Error'
      )
    })
  }

  return {
    errorMessage,
    imageUploaded,
    loading,
    uploadFunction,
  }
}
