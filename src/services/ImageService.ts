import { IS_PROD } from "../constants/environment";


interface UploadResponse {
  path: string;
  id: string;
  fullPath: string;
}

export interface ImageData {
  id: number;
  upload_date: string;
  bucket_location: string;
  uploaded_by: string;
  storage_id: string;
}

export type AllImagesResponse = ImageData[]

interface ImageResponse<ResponseType> {
  success: boolean;
  data?: ResponseType;
  error?: {
    message: string;
    statusCode?: number;
    error?: string;
  }
}

export class ImageService {
  static readonly url = IS_PROD ? 'https://rphgcdgdqylokpeygnyy.supabase.co/functions/v1' : 'http://localhost:54321/functions/v1';
  static readonly bearerToken = process.env.REACT_APP_SUPABASE_ANON_KEY; 
  static readonly headers = {
    'Authorization': `Bearer ${this.bearerToken}`
  }

  static async getAllIMages(): Promise<ImageResponse<AllImagesResponse>> {
    const imageFetch = await fetch(this.url + '/image-all', {
      method: 'GET',
      headers: this.headers,
    });
    const imagesData = await imageFetch.json();

    return imagesData;
  }

  static async uploadImage(image: File): Promise<ImageResponse<UploadResponse>> {
    const formdata = new FormData();
    formdata.append('image', image);
    const imageUploadFetch = await fetch(this.url + '/image-upload', {
      method: 'POST',
      headers: this.headers,
      body: formdata
    });

    const imageUploadResponse = await imageUploadFetch.json();

    return imageUploadResponse;
  }
}

