import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow, useStyles } from './style';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';
import Sort from '../../utils/sort';

export default function ({ firebase, history }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    firebase
      .questions()
      .orderByChild('createdAt')
      .on('value', (snapshot) => {
        const questionObject = snapshot.val();
        if (questionObject) {
          const questionsArray = Object.keys(questionObject)
            .map((key) => ({
              ...questionObject[key],
              uid: key
            }))
            .sort(Sort('createdAt', 'desc'));
          setQuestions(questionsArray);
          setLoading(false);
        } else {
          setQuestions([]);
          setLoading(false);
        }
      });
  }, [firebase]);

  return loading ? (
    <CircularProgress style={{ textAlign: 'center' }} />
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S/N</StyledTableCell>
            <StyledTableCell align="right">Question</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        {questions ? (
          <TableBody>
            {questions.map(({ question, type, createdAt, category, uid }, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right"> {question} </StyledTableCell>
                <StyledTableCell align="right"> {category} </StyledTableCell>
                <StyledTableCell align="right"> {type} </StyledTableCell>
                <StyledTableCell align="right">{dayjs(createdAt).format('MMM DD YYYY HH:mm')}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      history.push(`/questions/${uid}`);
                    }}
                  >
                    View
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <div>No questions</div>
        )}
      </Table>
    </TableContainer>
  );
}
