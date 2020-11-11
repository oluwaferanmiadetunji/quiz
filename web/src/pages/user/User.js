import React from 'react';
import Card from '@material-ui/core/Card';
import { useSelector } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import Grid from '@material-ui/core/Grid';
import Loader from '../../components/loader';
import dayjs from 'dayjs';
import withLayout from '../../components/layout';

const User = () => {
	const classes = useStyles();
	const { data } = useSelector((state) => state.user);

	return data ? (
		<Grid container spacing={2}>
			<Grid item xs={12} md={1} lg={1}></Grid>
			<Grid item xs={12} md={6} lg={6}>
				<Card className={classes.root}>
					<CardContent>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Name: {data.name}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Email: {data.email}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Plan: {data.status}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Exam Count: {data.count}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Exam Duration: {data.duration} minutes
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Number of Correct Questions: {data.correct}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Total Number of Questions Attempted: {data.total}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Total Number of Attempts: {data.times}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Last Login: {dayjs(data.lastLogin).format('MMM DD YYYY HH:mm')}
						</Typography>
						<Typography className={classes.title} color='textSecondary' gutterBottom>
							Account Created On: {dayjs(data.createdAt).format('MMM DD YYYY HH:mm')}
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	) : (
		<Loader />
	);
};

export default withLayout(User);
