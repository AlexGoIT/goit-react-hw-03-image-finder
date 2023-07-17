import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import { ImageContainer } from './ImageGallery.styled';

const ImageList = ({ hits, onImageClick }) => {
  return (
    <ImageContainer>
      {hits.map(hit => (
        <ImageGalleryItem key={hit.id} hit={hit} onItemClick={onImageClick} />
      ))}
    </ImageContainer>
  );
};

export default ImageList;

ImageList.propTypes = {
  hits: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
