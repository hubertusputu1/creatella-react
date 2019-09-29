import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

import FormatPrice from '../../utils/formatPrice';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: 10,
    width: '100%',
    minHeight: 100,
    flexDirection: 'column',
    padding: '0px 10px 0px 10px',
    justifyContent: 'space-between',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export default function Item(props) {
  const classes = useStyles();
  const { date, face, price, size } = props.product;
  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.content}>
          <Typography
            variant="body1"
            style={{ fontSize: size }}
            color="secondary"
          >
            {face}
          </Typography>
          <Typography variant="body2">Price: ${FormatPrice(price)}</Typography>
        </div>
        <Typography variant="caption">{date}</Typography>
      </Paper>
    </div>
  );
}
