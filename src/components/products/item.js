import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: 10,
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0px 10px 0px 10px',
  },
  detail: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const { date, face, price, size, id } = props.product;
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" color="secondary">
          {face}
        </Typography>
        <div className={classes.detail}>
          <Typography variant="body1">id: ${id}</Typography>
          <Typography variant="body1">Price: ${price}</Typography>
          <Typography variant="body1">Size: {size}</Typography>
          <Typography variant="caption">{date}</Typography>
        </div>
      </Paper>
    </div>
  );
}
