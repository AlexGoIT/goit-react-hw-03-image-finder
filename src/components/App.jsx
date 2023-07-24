import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Container from '@mui/material/Container';

// import { Container } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';

import getImages from 'services/api';

document.title = 'HW-3 Finder';

export default class App extends Component {
  state = {
    hits: [],
    page: 1,
    searchQuery: '',
    isLoading: false,
    showLoadMoreBtn: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || page !== prevState.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { searchQuery, page } = this.state;

    this.setState({ isLoading: true });
    try {
      const response = await getImages(searchQuery, page);

      const totalPages = Math.floor(response.totalHits / 12);

      if (response.hits.length === 0) {
        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      this.setState(({ hits }) => ({
        hits: [...hits, ...response.hits],
        page,
        totalPages,
      }));

      if (page === 1) {
        Notify.success(`Hooray! We found ${response.totalHits} images.`);
      } else {
        setTimeout(() => this.scroll(), 100);
      }

      if (page >= totalPages) {
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } catch (err) {
      Notify.failure(`Oops, something went wrong: ${err.message}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { queryInput } = evt.target.elements;

    const searchQuery = queryInput.value.trim();
    queryInput.value = '';
    const page = 1;

    if (searchQuery === '') {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    this.setState({ searchQuery, page, hits: [] });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          {isNotEmpty && <ImageGallery hits={hits} />}
          {isLoading ? (
            <Loader />
          ) : (
            isNotEmpty &&
            isNotEndList && <Button onLoadMore={this.handleLoadMore} />
          )}
        </Container>
      </>
    );
  }
}
