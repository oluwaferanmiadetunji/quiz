import React, { useEffect } from 'react';
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
import { setTitle } from '../../components/layout/redux';
import { SET_QUESTIONS } from './redux';
import { setQuestion } from '../question/redux';

const Courses = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	const questions = useSelector((state) => state.questions);

	useEffect(() => {
		dispatch(setTitle('Questions'));
		const getQuestions = async () => {
			const { data } = await makeGetReq('questions');
			dispatch({ type: SET_QUESTIONS, payload: data });
		};
		getQuestions();
	}, [dispatch]);

	const getSingleQuestion = (id) => {
		const singleQuestion = [...questions].find((question) => question.id === id);
		dispatch(setQuestion(singleQuestion));
		history.push(`/questions/${id}`);
	};

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
						{questions.map(({ type, createdAt, question, category, id }, index) => (
							<StyledTableRow key={index}>
								<StyledTableCell component='th' scope='row'>
									{index + 1}
								</StyledTableCell>
								<StyledTableCell align='right'> {question} </StyledTableCell>
								<StyledTableCell align='right'> {category} </StyledTableCell>
								<StyledTableCell align='right'> {type} </StyledTableCell>
								<StyledTableCell align='right'>{dayjs(createdAt).format('MMM DD YYYY HH:mm')}</StyledTableCell>
								<StyledTableCell align='right'>
									<Button
										color='secondary'
										variant='contained'
										onClick={() => {
											getSingleQuestion(id);
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
