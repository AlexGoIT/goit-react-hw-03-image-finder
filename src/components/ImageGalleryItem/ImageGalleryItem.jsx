import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { largeImageURL, webformatURL, tags } = this.props.hit;
    return (
      <>
        <ImageItem onClick={this.toggleModal}>
          <Image src={webformatURL} alt={tags} loading="lazy" />
        </ImageItem>
        {showModal && (
          <Modal
            toggleModal={this.toggleModal}
            imageURL={largeImageURL}
            tags={tags}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  hit: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
