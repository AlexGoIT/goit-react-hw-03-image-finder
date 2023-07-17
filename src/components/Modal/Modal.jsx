import PropTypes from 'prop-types';
import { Backdrop, ModalContainer } from './Modal.styled';

const Modal = ({ children, onCloseModal }) => {
  return (
    <Backdrop onClick={() => onCloseModal()}>
      <ModalContainer>{children}</ModalContainer>
    </Backdrop>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func.isRequired,
};
