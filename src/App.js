import React, { Component } from 'react';
import Products from './components/products';

import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from '@material-ui/core';

const theme = createMuiTheme({
  // palette: {
  //   type: 'dark',
  // },
  typography: { useNextVariants: true },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <Products />
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default App;
