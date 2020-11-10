import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow, useStyles } from './style';
import Button from '@material-ui/core/Button';
import dayjs from 'dayjs';
import Sort from '../../utils/sort';
import Loader from '../../utils/Loader';

export default function ({ firebase, history }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase
      .users()
      .orderByChild('createdAt')
      .on('value', (snapshot) => {
        const userObject = snapshot.val();
        if (userObject) {
          const usersArray = Object.keys(userObject)
            .map((key) => ({
              ...userObject[key],
              uid: key
            }))
            .sort(Sort('createdAt', 'desc'));
          setUsers(usersArray);
          setLoading(false);
        } else {
          setUsers([]);
          setLoading(false);
        }
      });
  }, [firebase]);

  return loading ? (
    <Loader />
  ) : (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S/N</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Created On</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        {users ? (
          <TableBody>
            {users.map(({ name, email, status, createdAt, uid }, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right"> {name} </StyledTableCell>
                <StyledTableCell align="right"> {email} </StyledTableCell>
                <StyledTableCell align="right"> {status} </StyledTableCell>
                <StyledTableCell align="right">{dayjs(createdAt).format('MMM DD YYYY HH:mm')}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      history.push(`/users/${uid}`);
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
