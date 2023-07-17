import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ hit, onItemClick }) => {
  const { largeImageURL, webformatURL, tags } = hit;

  return (
    <ImageItem>
      <a
        href={largeImageURL}
        onClick={e => {
          e.preventDefault();

          onItemClick(largeImageURL);
        }}
      >
        <Image src={webformatURL} alt={tags} loading="lazy" />
      </a>
    </ImageItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  hit: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onItemClick: PropTypes.func.isRequired,
};
