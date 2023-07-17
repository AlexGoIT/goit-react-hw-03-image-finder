import PropTypes from 'prop-types';
import { Backdrop, ModalContainer } from './Modal.styled';

const Modal = ({ children }) => {
  return (
    <Backdrop>
      <ModalContainer>{children}</ModalContainer>
    </Backdrop>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
};
