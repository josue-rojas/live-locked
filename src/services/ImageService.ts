import { IS_PROD } from "../constants/environment";

export class ImageService {
  static readonly URL = IS_PROD ? 'https://rphgcdgdqylokpeygnyy.supabase.co/functions/v1' : 'http://localhost:54321/functions/v1';
  static readonly BEARER_TOKEN = process.env.REACT_APP_SUPABASE_ANON_KEY; 

  static async getAllIMages() {
    const imageFetch = await fetch(this.URL + '/image-all', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.BEARER_TOKEN}`
      }
    });
    const imagesData = await imageFetch.json();

    return imagesData.data;
  }

  static async uploadImage(image: unknown) {
    return true;
  }
}

