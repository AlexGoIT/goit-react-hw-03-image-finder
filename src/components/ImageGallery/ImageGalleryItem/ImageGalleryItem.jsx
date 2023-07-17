import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ hit }) => {
  const { largeImageURL, webformatURL, tags } = hit;

  return (
    <ImageItem>
      <a
        href={largeImageURL}
        onClick={e => {
          e.preventDefault();

          console.log(e.target.src);
        }}
      >
        <Image src={webformatURL} alt={tags} loading="lazy" />
      </a>
    </ImageItem>
  );
};

export default ImageGalleryItem;
