import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { Styles } from './style';
import { makePostReq } from '../../utils/api';

export default function () {
	const singleQuestion = useSelector((state) => state.question);

	const [open, setOpen] = useState(false);
	const classes = Styles();
	const [question, setQuestion] = useState(singleQuestion.question);
	const [correctAnswer, setCorrectAnswer] = useState(singleQuestion.correctAnswer);
	const [incorrectAnswers, setIncorrectAnswers] = useState(singleQuestion.incorrectAnswers);
	const [createdAt, setCreatedAt] = useState(singleQuestion.createdAt);
	const [type, setType] = useState(singleQuestion.type);
	const [category, setCategory] = useState(singleQuestion.category);
	const [id, setId] = useState(singleQuestion.id);

	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const invalid = question === '' || correctAnswer === '';

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setMessage('');
		setLoading(true);

		let questionData = {
			question: '',
			correctAnswer: '',
			incorrectAnswers: [],
		};

		questionData.question = q.trim();
		questionData.correctAnswer = ca.trim();
		questionData.incorrectAnswers.push(ic1.trim());
		if (ic2.trim() !== '') questionData.incorrectAnswers.push(ic2.trim());
		if (ic3.trim() !== '') questionData.incorrectAnswers.push(ic3.trim());
		console.log(questionData);
		// const { status, message, data } = await makePostReq(`questions/${key}`, questionData);
		// console.log({ status, message, data });
		setLoading(false);
	};

	return (
		<>
			<Button variant='outlined' color='primary' style={{ color: 'yellow', margin: 10 }} onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' fullWidth>
				<DialogTitle id='form-dialog-title' style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
					Edit Question
				</DialogTitle>
				<DialogContent style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
					<div className={classes.formField}>
						<TextField
							id='question'
							label='Question *'
							variant='outlined'
							autoFocus
							error={question.trim() === '' ? true : false}
							helperText={question.trim() === '' ? 'Enter a question' : ''}
							multiline
							rows={4}
							fullWidth
							value={question}
							onChange={(event) => {
								setQuestion(event.target.value);
							}}
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
							error={correctAnswer.trim() === '' ? true : false}
							helperText={correctAnswer.trim() === '' ? 'Enter a correct answer' : ''}
							value={correctAnswer}
							onChange={(event) => {
								setCorrectAnswer(event.target.value);
							}}
							InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
							InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
						/>
					</div>
					{incorrectAnswers.map((answer, index) => (
						<div className={classes.formField} key={index}>
							<TextField
								id={`incorrectAnswer${index}`}
								label={`Incorrect Answer ${index + 1}*`}
								variant='outlined'
								value={answer}
								// onChange={(event) => {
								//   setIncorrectAnswers(event.target.value);
								// }}
								fullWidth
								InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
								InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
							/>
						</div>
					))}

					{message && (
						<Typography gutterBottom style={{ color: 'yellow', textAlign: 'center' }}>
							{message}
						</Typography>
					)}
				</DialogContent>
				<DialogActions style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
					<Button onClick={handleClose} style={{ color: 'white', backgroundColor: 'black' }}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} style={{ color: 'yellow', backgroundColor: 'black' }} disabled={invalid}>
						{loading ? 'Connecting' : 'Submit'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
