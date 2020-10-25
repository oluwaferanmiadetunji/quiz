import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { Styles } from './style';
import { SUCCESS_MESSAGE, FAILURE_MESSAGE } from './constants';

export default function Edit({ firebase, uid, question, correctAnswer, incorrectAnswers }) {
  const [open, setOpen] = useState(false);
  const classes = Styles();
  const [q, setQuestion] = useState('');
  const [ca, setCorrectAnswer] = useState('');
  const [ica, setIncorrectAnswers] = useState([]);
  const [ic1] = useState('');
  const [ic2] = useState('');
  const [ic3] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuestion(question);
    setCorrectAnswer(correctAnswer);
    setIncorrectAnswers(incorrectAnswers);
  }, [correctAnswer, incorrectAnswers, question]);

  const invalid = question === '' || correctAnswer === '';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    let questionData = {
      createdAt: '',
      question: '',
      correctAnswer: '',
      incorrectAnswers: []
    };

    questionData.createdAt = firebase.serverValue.TIMESTAMP;
    questionData.question = q.trim();
    questionData.correctAnswer = ca.trim();
    questionData.incorrectAnswers.push(ic1.trim());
    questionData.incorrectAnswers.push(ic2.trim());
    questionData.incorrectAnswers.push(ic3.trim());
    firebase
      .question(uid)
      .update(questionData)
      .then(() => {
        setMessage(SUCCESS_MESSAGE);
      })
      .catch(() => {
        setMessage(FAILURE_MESSAGE);
      });
    setLoading(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" style={{ color: 'yellow', margin: 10 }} onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle
          id="form-dialog-title"
          style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}
        >
          Edit Question
        </DialogTitle>
        <DialogContent style={{ textAlign: 'center', background: 'rgba(0, 0, 0, 0.9)', color: 'white' }}>
          <div className={classes.formField}>
            <TextField
              id="question"
              label="Question *"
              variant="outlined"
              autoFocus
              error={q.trim() === '' ? true : false}
              helperText={q.trim() === '' ? 'Enter a question' : ''}
              multiline
              rows={4}
              fullWidth
              value={q}
              onChange={(event) => {
                setQuestion(event.target.value);
              }}
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
              error={ca.trim() === '' ? true : false}
              helperText={ca.trim() === '' ? 'Enter a correct answer' : ''}
              value={ca}
              onChange={(event) => {
                setCorrectAnswer(event.target.value);
              }}
              InputProps={{ style: { color: 'white', background: '#111', borderColor: 'white !important' } }}
              InputLabelProps={{ style: { color: 'white', background: '#111', border: 'white' } }}
            />
          </div>
          {ica.map((answer, index) => (
            <div className={classes.formField} key={index}>
              <TextField
                id={`incorrectAnswer${index + 1}`}
                label={`Incorrect Answer ${index + 1}*`}
                variant="outlined"
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
