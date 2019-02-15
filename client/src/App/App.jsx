import React from 'react';
import axios from 'axios';
import Carousel from './Carousel/Carousel.jsx';
import app from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relationship: 'Related items',
      products: [],
      pageNumber: 1,
      pages: null,
      productsPerPage: 4,
    };
  }

  componentWillMount() {
    this.fetchProducts()
      .then(() => {
        this.updateWidth();
        window.addEventListener('resize', this.updateWidth.bind(this));
      });
  }

  updateWidth() {
    const width = Math.max(window.innerWidth, 1000);
    const productsPerPage = Math.floor((width - 100) / 170);
    this.setState(({ products }) => ({
      productsPerPage,
      pages: Math.ceil(products.length / productsPerPage),
    }));
  }

  fetchProducts() {
    return axios.get('/category/05')
      .then(({ data }) => {
        this.setState({ products: data });
      });
  }

  render() {
    const {
      products, relationship, pageNumber, pages, productsPerPage,
    } = this.state;
    const firstIndex = productsPerPage * pageNumber;
    const lastIndex = productsPerPage * (pageNumber + 1);
    return (
      <section className={app.section}>
        <header className={app.header}>
          <h4 className={app.title}>
            {relationship}
          </h4>
          <h4 className={app.pages}>
            {`Page ${pageNumber} of ${pages}`}
          </h4>
        </header>
        <Carousel products={products.slice(firstIndex, lastIndex)} />
      </section>
    );
  }
}

export default App;