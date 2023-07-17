import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { ImageContainer } from './ImageGallery.styled';

const ImageList = ({ hits }) => {
  return (
    <ImageContainer>
      {hits.map(hit => (
        <ImageGalleryItem key={hit.id} hit={hit} onClick={handleClick} />
      ))}
    </ImageContainer>
  );
};

export default ImageList;

const handleClick = e => {
  console.log(e.target.src);
};

ImageList.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      previewURL: PropTypes.string.isRequired,
    })
  ),
};
