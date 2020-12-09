import React from 'react';
import Card from '@material-ui/core/Card';
import { useSelector } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Grid from '@material-ui/core/Grid';
import dayjs from 'dayjs';
import withLayout from '../../components/layout';

const User = () => {
	const classes = useStyles();
	const { activated, total, createdAt, count, times, duration, name, correct, lastLogin, email } = useSelector((state) => state.user);

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={1} lg={1}></Grid>
			<Grid item xs={12} md={6} lg={6}>
				<Card className={classes.root}>
					<CardContent>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Name: {name}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Email: {email}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Plan: {activated ? 'Premium' : 'Free'}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Exam Count: {count}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Exam Duration: {duration} minutes
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Number of Correct Questions: {correct}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Total Number of Questions Attempted: {total}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Total Number of Attempts: {times}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Last Login: {dayjs(lastLogin).format('MMM DD YYYY HH:mm')}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Account Created On: {dayjs(createdAt).format('MMM DD YYYY HH:mm')}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default withLayout(User);
