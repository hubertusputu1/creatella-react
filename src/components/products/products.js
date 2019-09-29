import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  useScrollTrigger,
  Slide,
  MenuItem,
  Menu,
  CircularProgress,
} from '@material-ui/core';
import { Sort } from '@material-ui/icons';

import Ads from './ads';
import Item from './item';

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 50,
    color: 'primary',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  loader: {
    maxWidth: 200,
    maxHeight: 130,
    // [theme.breakpoints.up('sm')]: {
    //   maxWidth: '100%',
    // },
  },
  products: {
    flexGrow: 1,
    margin: 'auto',
    marginTop: 10,
    maxWidth: 1000,
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  optionsPage: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
  },
});

const HideOnScroll = props => {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'id',
      products: [],
      tempProducts: [],
      randomNumber: null,
      loading: false,
      loadingMore: false,
      isBottom: false,
      isEnd: false,
      page: 1,
      open: false,
      anchorEl: null,
    };
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = sort => {
    this.setState(
      { open: false, anchorEl: null, sort, loading: true, products: [] },
      () => {
        this.fetchProducts();
      }
    );
  };

  addMoreProducts = () => {
    document.addEventListener('scroll', this.trackScrolling);
    this.fetchAds();
    this.setState(
      {
        loading: false,
        loadingMore: false,
        products: this.state.products.concat(this.state.tempProducts),
      },
      () => {
        this.setState({
          tempProducts: [],
        });
      }
    );
  };

  fetchProducts = (isTemp = false, forceAdd = false) => {
    const { page, sort } = this.state;
    const apiUrl = `${process.env.REACT_APP_API_HOST}/api/products?_page=${page}&_limit=20&_sort=${sort}`;

    axios.get(apiUrl).then(res => {
      if (res.data.length === 0) {
        this.setState({ isEnd: true });
        return document.removeEventListener('scroll', this.trackScrolling);
      }
      this.setState({ page: this.state.page + 1 });
      const products = res.data;

      if (!isTemp) {
        document.addEventListener('scroll', this.trackScrolling);
        return this.setState({
          products,
          loading: false,
        });
      } else if (isTemp && !forceAdd) {
        return this.setState({ tempProducts: products, loadingMore: true });
      }

      document.addEventListener('scroll', this.trackScrolling);
      this.fetchAds();
      return this.setState({
        products: this.state.products.concat(products),
        tempProducts: [],
        loadingMore: false,
        loading: false,
      });
    });
  };

  fetchAds = () => {
    const { randomNumber } = this.state;
    const max = 10;
    let newRandomNumber = Math.floor(Math.random() * 1000);
    newRandomNumber = (parseInt(newRandomNumber, 10) % max) + 1;
    if (!randomNumber || randomNumber !== newRandomNumber) {
      return this.setState({
        randomNumber: newRandomNumber,
      });
    }
    this.fetchAds();
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    this.fetchProducts();
    this.fetchAds();
  };

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('products');
    if (this.isLoadMore(wrappedElement) && !this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => {
        this.fetchProducts(true);
      });
    }
    if (this.isBottom(wrappedElement)) {
      document.removeEventListener('scroll', this.trackScrolling);
      this.setState({ loading: true, isBottom: true }, () => {
        if (this.state.tempProducts.length === 0) {
          return this.fetchProducts(true, true);
        }
        this.addMoreProducts();
      });
    }
  };

  isLoadMore = el => {
    const height = el.clientHeight / 2;
    return el.getBoundingClientRect().bottom <= height;
  };

  isBottom = el => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  };

  renderTopAppBar = classes => {
    return (
      <HideOnScroll {...this.props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={e => this.handleClick(e)}
            >
              <Sort />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Products Grid
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    );
  };

  renderNavOptions = () => {
    const { open, anchorEl, sort } = this.state;
    return (
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
        onClose={() => this.handleClose()}
      >
        <MenuItem
          selected={sort === 'id' ? true : false}
          onClick={() => this.handleClose('id')}
        >
          id
        </MenuItem>
        <MenuItem
          selected={sort === 'price' ? true : false}
          onClick={() => this.handleClose('price')}
        >
          price
        </MenuItem>
        <MenuItem
          selected={sort === 'size' ? true : false}
          onClick={() => this.handleClose('size')}
        >
          size
        </MenuItem>
      </Menu>
    );
  };

  renderLoading = () => {
    return (
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <CircularProgress className={this.props.classes.progress} />
        <Typography variant="h6">Loading Products...</Typography>
      </div>
    );
  };

  renderEndCatalogue = () => {
    return (
      <Typography variant="h6" style={{ textAlign: 'center', padding: 10 }}>
        ~ End Of Catalogue ~
      </Typography>
    );
  };

  render() {
    const { products, loading, randomNumber, isEnd } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderTopAppBar(classes)}
        <Toolbar />
        <Ads randomNumber={randomNumber} />
        <div id="products" className={classes.products}>
          {products.length > 0 &&
            products.map(product => (
              <Item key={product.id} product={product} />
            ))}
          {loading && this.renderLoading()}
          {isEnd && this.renderEndCatalogue()}
        </div>
        {this.renderNavOptions()}
      </div>
    );
  }
}

export default withStyles(styles)(Products);
