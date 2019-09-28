import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: 'auto',
    maxWidth: 1000,
  },
}));

export default function Ads() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="body1">
          Here you're sure to find a bargain on some of the finest ascii
          available to purchase. Be sure to peruse our selection of ascii faces
          in an exciting range of sizes and prices. But first, a word from our
          sponsors:
        </Typography>
        <img
          src={`${process.env.REACT_APP_API_HOST}/ads/?r=${Math.floor(
            Math.random() * 1000
          )}`}
          alt="ads"
        />
      </Paper>
    </div>
  );
}
