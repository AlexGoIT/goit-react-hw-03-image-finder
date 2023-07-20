import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Container } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

import ImageAPI from 'services/api';
const imageAPI = new ImageAPI();

document.title = 'HW-3 Finder';

export default class App extends Component {
  state = {
    hits: [],
    page: 1,
    totalPages: 1,
    searchQuery: null,
    isLoading: false,
    showLoadMoreBtn: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchQuery, page, totalPages, hits } = this.state;

    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });

      const response = await imageAPI.getImages(searchQuery, page);

      this.setState(({ hits }) => ({
        hits: [...hits, ...response.hits],
        isLoading: false,
      }));

      setTimeout(() => this.scroll(), 100);
    }

    if (page >= totalPages && hits !== prevState.hits) {
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );

      this.setState({ showLoadMoreBtn: false });
    }
  }

  handleSearchQuery = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { queryInput } = e.target.elements;

    const searchQuery = queryInput.value.trim();
    queryInput.value = '';
    const page = 1;

    if (searchQuery === '') {
      Notify.warning("You didn't enter anything!");
      return;
    }

    this.setState({ isLoading: true });
    const response = await imageAPI.getImages(searchQuery, page);
    this.setState({ isLoading: false });

    if (response.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      Notify.success(`"Hooray! We found ${response.totalHits} images."`);
    }

    const totalPages = Math.floor(response.totalHits / 12);

    if (totalPages > 1) {
      this.setState({ showLoadMoreBtn: true });
    }

    this.setState({
      hits: response.hits,
      searchQuery,
      page,
      totalPages,
    });
  };

  scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

  render() {
    const { hits, isLoading, totalPages, page } = this.state;
    const isNotEmpty = hits.length !== 0;
    const isNotEndList = page < totalPages;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {isNotEmpty && <ImageGallery hits={hits} />}
        {isLoading ? (
          <Loader />
        ) : (
          isNotEmpty &&
          isNotEndList && <Button onLoadMore={this.handleLoadMore} />
        )}
      </Container>
    );
  }
}
