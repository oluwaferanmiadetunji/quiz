import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withLayout from '../../components/layout';
import { setTitle } from '../../components/layout/redux';
import { validateData } from '../../utils/validateData';
import { makePostReq } from '../../utils/api';
import Toast from '../../utils/Toast';
import { makeGetReq } from '../../utils/api';
import { SET_COURSES } from '../courses/redux';
import { addQuestion } from '../questions/redux';

const AddQuestion = () => {
	const dispatch = useDispatch();
	const classes = Styles();
	const [question, setQuestion] = useState('');
	const [correctAnswer, setCorrectAnswer] = useState('');
	const [incorrectAnswer1, setIncorrectAnswer1] = useState('');
	const [incorrectAnswer2, setIncorrectAnswer2] = useState('');
	const [incorrectAnswer3, setIncorrectAnswer3] = useState('');
	const [type, setType] = useState('Free');
	const [category, setCategory] = useState('');
	const [loading, setLoading] = useState(false);

	const courses = useSelector((state) => state.courses);

	const invalid =
		!validateData(question) || !validateData(correctAnswer) || !validateData(incorrectAnswer1) || !validateData(type) || !validateData(category);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		let questionData = {
			question: '',
			correctAnswer: '',
			incorrectAnswers: [],
			type: '',
			category: '',
		};
		questionData.question = question.trim();
		questionData.correctAnswer = correctAnswer.trim();
		questionData.incorrectAnswers.push(incorrectAnswer1.trim());
		questionData.type = type;
		questionData.category = category;

		if (incorrectAnswer2.trim() !== '') questionData.incorrectAnswers.push(incorrectAnswer2.trim());
		if (incorrectAnswer3.trim() !== '') questionData.incorrectAnswers.push(incorrectAnswer3.trim());

		const { status, message, data } = await makePostReq('questions', questionData);
		Toast(message, status);
		if (data) {
			setQuestion('');
			setCorrectAnswer('');
			setIncorrectAnswer1('');
			setIncorrectAnswer2('');
			setIncorrectAnswer3('');
			setType('Free');
			setCategory('');
			dispatch(addQuestion(data));
		}
		setLoading(false);
	};

	useEffect(() => {
		dispatch(setTitle('Add Question'));
		const getCourses = async () => {
			const { data } = await makeGetReq('courses');
			dispatch({ type: SET_COURSES, payload: data });
		};
		getCourses();
	}, [dispatch]);

	return (
		<div className={classes.root}>
			<Typography variant='h6'>Add Question</Typography>
			<form className={classes.root} noValidate autoComplete='off'>
				<div className={classes.formField}>
					<TextField
						id='question'
						label='Question *'
						variant='outlined'
						autoFocus
						error={question.length > 0 && question.trim() === '' ? true : false}
						helperText={question.length > 0 && question.trim() === '' ? 'Enter a question' : ''}
						multiline
						rows={4}
						fullWidth
						value={question}
						onChange={(event) => setQuestion(event.target.value)}
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
						error={correctAnswer.length > 0 && correctAnswer.trim() === '' ? true : false}
						helperText={correctAnswer.length > 0 && correctAnswer.trim() === '' ? 'Enter a correct answer' : ''}
						value={correctAnswer}
						onChange={(event) => setCorrectAnswer(event.target.value)}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
					/>
				</div>
				<div className={classes.formField}>
					<TextField
						id='incorrectAnswer1'
						label='Incorrect Answer 1*'
						variant='outlined'
						value={incorrectAnswer1}
						onChange={(event) => setIncorrectAnswer1(event.target.value)}
						fullWidth
						error={incorrectAnswer1.length > 0 && incorrectAnswer1.trim() === '' ? true : false}
						helperText={incorrectAnswer1.length > 0 && incorrectAnswer1.trim() === '' ? 'Enter an incorrect' : ''}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
					/>
				</div>
				<div className={classes.formField}>
					<TextField
						id='incorrectAnswer2'
						label='Incorrect Answer 2'
						variant='outlined'
						fullWidth
						value={incorrectAnswer2}
						onChange={(event) => setIncorrectAnswer2(event.target.value)}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
					/>
				</div>
				<div className={classes.formField}>
					<TextField
						id='incorrectAnswer3'
						label='Incorrect Answer 3'
						variant='outlined'
						fullWidth
						value={incorrectAnswer3}
						onChange={(event) => setIncorrectAnswer3(event.target.value)}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
					/>
				</div>
				<div className={classes.formField}>
					<TextField
						id='category'
						label='Category'
						variant='outlined'
						fullWidth
						select
						error={!category}
						helperText='Please select the Category'
						value={category}
						onChange={(event) => setCategory(event.target.value)}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}>
						{courses.map(({ course }, index) => (
							<option value={course} key={index} style={{ borderBottom: '2px solid white' }}>
								{course}
							</option>
						))}
					</TextField>
				</div>
				<div className={classes.formField}>
					<TextField
						id='type'
						label='Type'
						variant='outlined'
						fullWidth
						select
						error={!type}
						helperText='Please select the type'
						value={type}
						onChange={(event) => setType(event.target.value)}
						InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
						InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}>
						<option value={'Free'} style={{ borderBottom: '2px solid white' }}>
							{'Free'}
						</option>
						<option value={'Premium'}>{'Premium'}</option>
					</TextField>
				</div>

				<Button style={{ background: '#111', color: 'yellow' }} variant='contained' disabled={invalid} onClick={handleSubmit}>
					{loading ? 'Connecting' : 'Submit'}
				</Button>
			</form>
		</div>
	);
};

export default withLayout(AddQuestion);
