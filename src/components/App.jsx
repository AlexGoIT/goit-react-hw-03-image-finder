import { Component } from 'react';
import { Container } from './App.styled';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

import ImageAPI from './services/api';
const imageAPI = new ImageAPI();

export default class App extends Component {
  state = {
    hits: [],
    page: 1,
    totalPages: 1,
    searchQuery: '',
    isLoading: false,
    showLoadMoreBtn: false,
    showModal: false,
    largeImageURL: '',
  };

  // componentDidMount() {
  //   this.fetchImages();
  // }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({ isLoading: true });

    try {
      const images = await imageAPI.getImages(
        this.state.searchQuery,
        this.state.page
      );

      const { hits, totalHits } = images;
      const totalPages = Math.ceil(totalHits / 12);

      // if (totalPages > 1) {
      //   this.setState({ showLoadMoreBtn: true });
      // }

      // this.setState({ hits, totalPages });

      this.setState(prevState => {
        return { hits: [...prevState.hits, ...hits], totalPages };
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchQuery = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      if (prevState.page < this.state.totalPages) {
        return { page: prevState.page + 1 };
      } else {
        console.log('Not images');
      }
    });

    if (this.state.page >= this.state.totalPages) {
      this.setState({ showLoadMoreBtn: false });
    }
  };

  // toggleLoadMoreBtn = () => {
  //   const { showLoadMoreBtn } = this.state;

  //   this.setState({ showLoadMoreBtn: !showLoadMoreBtn });
  // };

  handleImageClick = largeImageURL => {
    this.setState({ largeImageURL, showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { hits, isLoading, showModal } = this.state;

    return (
      <Container>
        <Searchbar onSearchQuery={this.handleSearchQuery} />
        {hits.length > 0 && (
          <ImageGallery hits={hits} onImageClick={this.handleImageClick} />
        )}
        <Button onLoadMore={this.handleLoadMore}>Load More</Button>
        {isLoading && <Loader />}
        {showModal && (
          <Modal onCloseModal={this.handleCloseModal}>
            <img src={this.state.largeImageURL} alt="" />
          </Modal>
        )}
      </Container>
    );
  }
}
