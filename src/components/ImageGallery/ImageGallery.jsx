import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import { ImageContainer } from './ImageGallery.styled';

const ImageList = ({ hits }) => {
  return (
    <ImageContainer>
      {hits.map(hit => (
        <ImageGalleryItem key={hit.id} hit={hit} />
      ))}
    </ImageContainer>
  );
};

export default ImageList;

ImageList.propTypes = {
  hits: PropTypes.array.isRequired,
};
