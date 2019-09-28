import React, { Component } from 'react';
import { connect } from 'react-redux';

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
          <p>first</p>
        </CssBaseline>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  state => {
    return {};
  },
  dispatchEvent => {
    return {};
  }
)(App);
