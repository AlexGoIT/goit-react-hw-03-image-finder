import { ButtonWrapper, LoadMoreButton } from './Button.styled';

const Button = ({ onLoadMore }) => {
  return (
    <ButtonWrapper>
      <LoadMoreButton onClick={() => onLoadMore()}>Load More</LoadMoreButton>
    </ButtonWrapper>
  );
};

export default Button;
