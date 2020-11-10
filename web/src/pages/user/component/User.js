import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Grid from '@material-ui/core/Grid';
import Loader from '../../utils/Loader';
import dayjs from 'dayjs';

export default function ({ firebase, match }) {
  const classes = useStyles();
  const [data, setData] = useState();

  useEffect(() => {
    firebase.user(match.params.userId).once('value', (snapshot) => {
      setData(snapshot.val());
    });
  }, [firebase, match.params.userId]);

  // console.log(JSON.stringify(data));

  return data ? (
    <Grid container spacing={2}>
      <Grid item xs={12} md={1} lg={1}></Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Name: {data.name}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Email: {data.email}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Plan: {data.status}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Exam Count: {data.count}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Exam Duration: {data.duration} minutes
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Number of Correct Questions: {data.correct}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Total Number of Questions Attempted: {data.total}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Total Number of Attempts: {data.times}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Last Login: {dayjs(data.lastLogin).format('MMM DD YYYY HH:mm')}
            </Typography>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Account Created On: {dayjs(data.createdAt).format('MMM DD YYYY HH:mm')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <Loader />
  );
}
