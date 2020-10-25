import React, { useState, useEffect } from 'react';
import { Styles } from './style';
import TextField from '@material-ui/core/TextField';
import dayjs from 'dayjs';
import Delete from './Delete';
import Edit from './Edit';

export default function ({ firebase, match }) {
  const classes = Styles();
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [createdAt, setCreatedAt] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    firebase.question(match.params.questionId).once('value', (snapshot) => {
      setQuestion(snapshot.val().question);
      setCorrectAnswer(snapshot.val().correctAnswer);
      setIncorrectAnswers(snapshot.val().incorrectAnswers);
      setCreatedAt(snapshot.val().createdAt);
      setType(snapshot.val().type);
      setCategory(snapshot.val().category);
    });
  }, [firebase, match.params.questionId]);

  return (
    <div className={classes.root}>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.formField}>
          <TextField
            id="question"
            label="Question *"
            variant="outlined"
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
            id="correctAnswer"
            label="Correct Answer *"
            variant="outlined"
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
              variant="outlined"
              value={answer}
              fullWidth
              InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
              InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
            />
          </div>
        ))}
        <div className={classes.formField}>
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            fullWidth
            value={category}
            InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
          />
        </div>
        <div className={classes.formField}>
          <TextField
            id="type"
            label="Type"
            variant="outlined"
            fullWidth
            value={type}
            InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
          />
        </div>
        <div className={classes.formField}>
          <TextField
            id="createdAt"
            label="Created At"
            variant="outlined"
            fullWidth
            value={dayjs(createdAt).format('MMM DD YYYY HH:mm')}
            InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
            InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
          />
        </div>
        <Edit
          uid={match.params.questionId}
          firebase={firebase}
          question={question}
          correctAnswer={correctAnswer}
          incorrectAnswers={incorrectAnswers}
        />
        <Delete uid={match.params.questionId} firebase={firebase} />
      </form>
    </div>
  );
}
