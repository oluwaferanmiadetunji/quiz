import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow, useStyles } from './style';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';
import { makeGetReq } from '../../utils/api';
import withLayout from '../../components/layout';
import { SET_QUESTIONS } from './redux';

const Courses = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	const questions = useSelector((state) => state.questions);

	useEffect(() => {
		const getQuestions = async () => {
			const { data } = await makeGetReq('questions');
			dispatch({ type: SET_QUESTIONS, payload: data });
		};
		getQuestions();
	}, []);

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='customized table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>S/N</StyledTableCell>
						<StyledTableCell align='right'>Question</StyledTableCell>
						<StyledTableCell align='right'>Category</StyledTableCell>
						<StyledTableCell align='right'>Status</StyledTableCell>
						<StyledTableCell align='right'>Date</StyledTableCell>
						<StyledTableCell align='right'></StyledTableCell>
					</TableRow>
				</TableHead>
				{questions ? (
					<TableBody>
						{questions.map(({ key, data }, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component='th' scope='row'>
									{index + 1}
								</StyledTableCell>
								<StyledTableCell align='right'> {data.question} </StyledTableCell>
								<StyledTableCell align='right'> {data.category} </StyledTableCell>
								<StyledTableCell align='right'> {data.type} </StyledTableCell>
								<StyledTableCell align='right'>{dayjs(data.createdAt).format('MMM DD YYYY HH:mm')}</StyledTableCell>
								<StyledTableCell align='right'>
									<Button
										color='secondary'
										variant='contained'
										onClick={() => {
											history.push(`/questions/${key}`);
										}}>
										View
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				) : (
					<div>No courses</div>
				)}
			</Table>
		</TableContainer>
	);
};

export default withLayout(Courses);
