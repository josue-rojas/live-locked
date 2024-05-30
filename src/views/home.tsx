import { useEffect, useState } from "react";
import { ImageService } from "../services/ImageService"
export function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    ImageService.getAllIMages().then((images) => {
      setImages(images);
    });
  }, []);

  console.log(images);

  return <>Home</>
}
