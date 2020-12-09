import React from 'react';
import { useSelector } from 'react-redux';
import { Styles } from './style';
import TextField from '@material-ui/core/TextField';
import dayjs from 'dayjs';
import withLayout from '../../components/layout';
import Delete from './Delete';
// import Edit from './Edit';

const Question = () => {
	const classes = Styles();

	const singleQuestion = useSelector((state) => state.question);
	const { question, correctAnswer, incorrectAnswers, createdAt, type, category } = singleQuestion;

	return (
		<div className={classes.root}>
			<form className={classes.root} noValidate autoComplete='off'>
				<div className={classes.formField}>
					<TextField
						id='question'
						label='Question *'
						variant='outlined'
						autoFocus
						multiline
						rows={4}
						fullWidth
						value={question}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
					/>
				</div>
				<div className={classes.formField}>
					<TextField
						id='correctAnswer'
						label='Correct Answer *'
						variant='outlined'
						fullWidth
						value={correctAnswer}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
					/>
				</div>
				{incorrectAnswers.map((answer, index) => (
					<div className={classes.formField} key={index}>
						<TextField
							id={`incorrectAnswer${index + 1}`}
							label={`Incorrect Answer ${index + 1}*`}
							variant='outlined'
							value={answer}
							fullWidth
							InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
						/>
					</div>
				))}
				<div className={classes.formField}>
					<TextField
						id='category'
						label='Category'
						variant='outlined'
						fullWidth
						value={category}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
					/>
				</div>
				<div className={classes.formField}>
					<TextField
						id='type'
						label='Type'
						variant='outlined'
						fullWidth
						value={type}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
					/>
				</div>
				<div className={classes.formField}>
					<TextField
						id='createdAt'
						label='Created At'
						variant='outlined'
						fullWidth
						value={dayjs(createdAt).format('MMM DD YYYY HH:mm')}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
					/>
				</div>
				{/* <Edit /> */}
				<Delete />
			</form>
		</div>
	);
};

export default withLayout(Question);
