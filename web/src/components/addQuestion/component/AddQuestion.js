import React, { useEffect, useState } from 'react';
import { Styles } from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { v1 as uuidv1 } from 'uuid';
import { SUCCESS_MESSAGE, FAILURE_MESSAGE } from './constant';
import Sort from '../../utils/sort';

export const AddQuestionForm = ({ firebase }) => {
  const classes = Styles();
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswer1, setIncorrectAnswer1] = useState('');
  const [incorrectAnswer2, setIncorrectAnswer2] = useState('');
  const [incorrectAnswer3, setIncorrectAnswer3] = useState('');
  const [type, setType] = useState('Free');
  const [category, setCategory] = useState('');
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const invalid =
    question.trim() === '' ||
    correctAnswer.trim() === '' ||
    incorrectAnswer1.trim() === '' ||
    type.trim() === '' ||
    category.trim() === '';

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    let questionData = {
      createdAt: '',
      question: '',
      correctAnswer: '',
      incorrectAnswers: [],
      type: '',
      category: ''
    };
    questionData.createdAt = firebase.serverValue.TIMESTAMP;
    questionData.question = question.trim();
    questionData.correctAnswer = correctAnswer.trim();
    questionData.incorrectAnswers.push(incorrectAnswer1.trim());
    questionData.type = type;
    questionData.category = category;

    if (incorrectAnswer2.trim() !== '') questionData.incorrectAnswers.push(incorrectAnswer2.trim());
    if (incorrectAnswer3.trim() !== '') questionData.incorrectAnswers.push(incorrectAnswer3.trim());

    firebase
      .question(uuidv1())
      .set(questionData)
      .then(() => {
        setQuestion('');
        setCorrectAnswer('');
        setIncorrectAnswer1('');
        setIncorrectAnswer2('');
        setIncorrectAnswer3('');
        setType('Free');
        setCategory('');
        setMessage(SUCCESS_MESSAGE);
      })
      .catch(() => {
        setMessage(FAILURE_MESSAGE);
      });
    setLoading(false);
  };

  useEffect(() => {
    firebase
      .courses()
      .orderByChild('createdAt')
      .on('value', (snapshot) => {
        const courseObject = snapshot.val();
        if (courseObject) {
          const coursesArray = Object.keys(courseObject)
            .map((key) => ({
              ...courseObject[key],
              uid: key
            }))
            .sort(Sort('createdAt', 'desc'));
          setCourses(coursesArray);
          setLoading(false);
        } else {
          setCourses([]);
          setLoading(false);
        }
      });
  }, [firebase]);

  return (
    <div className={classes.root}>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formField}>
          <TextField
            id="question"
            label="Question *"
            variant="outlined"
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
            id="correctAnswer"
            label="Correct Answer *"
            variant="outlined"
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
            id="incorrectAnswer1"
            label="Incorrect Answer 1*"
            variant="outlined"
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
            id="incorrectAnswer2"
            label="Incorrect Answer 2"
            variant="outlined"
            fullWidth
            value={incorrectAnswer2}
            onChange={(event) => setIncorrectAnswer2(event.target.value)}
            InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
          />
        </div>
        <div className={classes.formField}>
          <TextField
            id="incorrectAnswer3"
            label="Incorrect Answer 3"
            variant="outlined"
            fullWidth
            value={incorrectAnswer3}
            onChange={(event) => setIncorrectAnswer3(event.target.value)}
            InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
          />
        </div>
        <div className={classes.formField}>
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            fullWidth
            select
            error={!category}
            helperText="Please select the Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
          >
            {courses.map(({ course }, index) => (
              <option value={course} key={index} style={{ borderBottom: '2px solid white' }}>
                {course}
              </option>
            ))}
          </TextField>
        </div>
        <div className={classes.formField}>
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            fullWidth
            select
            error={!type}
            helperText="Please select the type"
            value={type}
            onChange={(event) => setType(event.target.value)}
            InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
          >
            <option value={'Free'} style={{ borderBottom: '2px solid white' }}>
              {'Free'}
            </option>
            <option value={'Premium'}>{'Premium'}</option>
          </TextField>
        </div>

        {message && (
          <Typography gutterBottom style={{ color: 'yellow', textAlign: 'center' }}>
            {message}
          </Typography>
        )}
        <Button
          style={{ background: '#111', color: 'yellow' }}
          variant="contained"
          disabled={invalid}
          onClick={handleSubmit}
        >
          {loading ? 'Connecting' : 'Submit'}
        </Button>
      </form>
    </div>
  );
};
