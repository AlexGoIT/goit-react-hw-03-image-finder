import { Component } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSearchQuery(this.state.value.toLowerCase().trim());

    this.setState({ value: '' });
  };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ value });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <BiSearchAlt className="react-icon" />
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchbar.propTypes = {
  onSearchQuery: PropTypes.func.isRequired,
};
