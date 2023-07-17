import axios from 'axios';

export default class ImageAPI {
  #KEY = '35497294-a51068c2cf702ee7b95a718bd';
  #BASE_URL = 'https://pixabay.com/api/';

  #axiosInstance = axios.create({
    baseURL: this.#BASE_URL,
  });

  getImages = async (searchQuery, page) => {
    const params = {
      params: {
        q: searchQuery ? searchQuery : '',
        key: this.#KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: false,
        per_page: 12,
        page: page ? page : 1,
        timeout: 1000,
      },
    };

    const response = await this.#axiosInstance.get('', params);
    return response.data;
  };
}
