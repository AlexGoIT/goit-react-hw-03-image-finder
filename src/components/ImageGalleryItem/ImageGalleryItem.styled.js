import styled from 'styled-components';

export const ImageItem = styled.li`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

export const Image = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  background: linear-gradient(
    0deg,
    rgba(255, 247, 127, 1) 0%,
    rgba(109, 156, 255, 1) 100%
  );

  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:is(:hover, :focus) {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;
