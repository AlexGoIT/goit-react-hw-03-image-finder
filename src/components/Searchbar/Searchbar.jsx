import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';

import { SearchForm } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        height: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SearchForm onSubmit={onSubmit}>
        <IconButton aria-label="search" type="submit">
          <BiSearchAlt />
        </IconButton>

        <InputBase
          sx={{ paddingInline: 1 }}
          placeholder="Search images and photos"
          inputProps={{ 'aria-label': 'Search images and photos' }}
          type="text"
          autoComplete="off"
          autoFocus
          name="queryInput"
        />
      </SearchForm>
    </AppBar>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
