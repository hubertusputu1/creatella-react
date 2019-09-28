import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: 10,
    width: '100%',
    height: 100
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const { date, face, price, size } = props.product;
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" color="secondary">
          {face}
        </Typography>
      </Paper>
    </div>
  );
}
