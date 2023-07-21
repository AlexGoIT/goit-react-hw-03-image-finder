import axios from 'axios';

const KEY = '35497294-a51068c2cf702ee7b95a718bd';
const URL = 'https://pixabay.com/api/';

const getImages = async (searchQuery, page) => {
  const response = await axios.get(URL, {
    params: {
      q: searchQuery,
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page,
    },
  });
  return response.data;
};

export default getImages;
