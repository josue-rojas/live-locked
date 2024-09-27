import { useEffect, useState } from 'react';
import { ImageService } from '../../services/ImageService';
import { Button } from '../Button';
import { Pixel } from '../Pixel';
import ImageUpload from '../UploadButton';
import styles from './styles.module.css';

const WIDTH = 32;
const HEIGHT = 32;
const PIXEL_ARR = new Array(WIDTH * HEIGHT).fill('#000000')

export function PixelCanvas() {
  const [pixelColors, setPixelColors] = useState(PIXEL_ARR);
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    function mouseDownEvent() {
      if (!isMouseDown) { setIsMouseDown(true); }
    }

    function mouseUpEvent() {
      if (isMouseDown) { setIsMouseDown(false); }
    }
    document.addEventListener('mousedown', mouseDownEvent);
    document.addEventListener('mouseup', mouseUpEvent);
    document.addEventListener('touchstart', mouseDownEvent);
    document.addEventListener('touchend', mouseUpEvent);

    return () => {
      document.removeEventListener('mousedown', mouseDownEvent);
      document.removeEventListener('mouseup', mouseUpEvent);
      document.removeEventListener('touchstart', mouseDownEvent);
      document.removeEventListener('touchend', mouseUpEvent);
    }
  })

  const handleDownload = () => {
    const canvas = document.getElementById('canvas-element') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    pixelColors.forEach((color, i) => {
      const x = i % WIDTH;
      const y = Math.floor(i / WIDTH);
      if (context) {
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
      }
    });

    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleSendToAPI = async () => {
    const canvas = document.getElementById('canvas-element') as HTMLCanvasElement;
    const context = canvas.getContext('2d');

    // Set canvas size
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Draw pixels on canvas
    pixelColors.forEach((color, i) => {
      const x = i % WIDTH;
      const y = Math.floor(i / WIDTH);
      if (context) {
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
      }
    });

    // Convert canvas to Blob and create File
    canvas.toBlob(async (blob) => {
      if (blob) {
        const file = new File([blob], `pixel-art-${Date.now()}.png`, { type: 'image/png' });

        try {
          const uploadResponse = await ImageService.uploadImage(file);

          if (uploadResponse.success) {
            alert('Image uploaded successfully!');
            console.log('Image path:', uploadResponse.data?.fullPath);
          } else {
            alert('Image upload failed: ' + uploadResponse.error?.message);
          }
        } catch (error) {
          console.error('Upload error:', error);
          alert('Failed to upload image');
        }
      } else {
        alert('Failed to convert canvas to image');
      }
    }, 'image/png');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        img.src = reader.result as string;
        img.onload = () => {
          // Set canvas size based on the uploaded image size
          canvas.width = WIDTH;
          canvas.height = HEIGHT;
          context?.drawImage(img, 0, 0, WIDTH, HEIGHT);
  
          const imgData = context?.getImageData(0, 0, WIDTH, HEIGHT);
          const newPixelColors = [...pixelColors];
  
          if (imgData) {
            for (let i = 0; i < imgData.data.length; i += 4) {
              const r = imgData.data[i];
              const g = imgData.data[i + 1];
              const b = imgData.data[i + 2];
              const a = imgData.data[i + 3] / 255; // Alpha value (0 to 1)
  
              // If alpha is 0 (fully transparent), set pixel color to black, else use the extracted color
              const hexColor = a === 0 ? '#000000' : `rgba(${r},${g},${b},${a})`;
  
              // Update the corresponding pixel color
              newPixelColors[i / 4] = hexColor;
            }
          }
  
          setPixelColors(newPixelColors);
        };
      };
    }
  };
  

  return (
    <div>
      <div>
        <label htmlFor="color-picker">Select color: </label>
          <input type="color" id="color-picker" value={currentColor} onChange={(e) => {
            setCurrentColor(e.target.value);
          }} />
      </div>

      <div className={styles.canvasContainer} id="canvas">{
        pixelColors.map((color, i) => {
          return <Pixel
            key={`pixel-${i}`}
            index={i}
            color={color}
            onMouseDown={(e) => {
              e.preventDefault();
              const nextPixelColors = [...pixelColors];
              nextPixelColors[i] = currentColor;

              setPixelColors(nextPixelColors);
            }}
            onMouseEnter={(e) => {
              e.preventDefault();

              if (isMouseDown) {
                const nextPixelColors = [...pixelColors];
                nextPixelColors[i] = currentColor;
  
                setPixelColors(nextPixelColors);
              }
            }}
            onTouchStart={(e) => {
              const nextPixelColors = [...pixelColors];
              nextPixelColors[i] = currentColor;
              setPixelColors(nextPixelColors);
            }}
            onTouchMove={(e) => {
              const touch = e.touches[0];
              const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLDivElement;
              const index = parseInt(target?.getAttribute('data-index') || '-1');

              if (index !== -1 && isMouseDown) {
                const nextPixelColors = [...pixelColors];
                nextPixelColors[index] = currentColor;
                setPixelColors(nextPixelColors);
              }
            }}
          ></Pixel>;
        })
      }</div>

      <div className={styles.buttonsWrapper}>
        <Button onClick={handleSendToAPI} styleType="send">Send</Button>
        <Button onClick={handleDownload}>Download Art</Button>
        <ImageUpload onChange={handleImageUpload} />
      </div>

    <canvas id="canvas-element" style={{display:'none'}}></canvas> 
    </div>
  )
}
