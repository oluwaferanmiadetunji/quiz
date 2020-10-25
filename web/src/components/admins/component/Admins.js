import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow, useStyles } from './style';
import dayjs from 'dayjs';
import Delete from './Delete';
import Loader from '../../utils/Loader';

export default function ({ firebase }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    firebase
      .admins()
      .orderByChild('createdAt')
      .on('value', (snapshot) => {
        const adminObject = snapshot.val();
        if (adminObject) {
          const adminsArray = Object.keys(adminObject).map((key) => ({
            ...adminObject[key],
            uid: key
          }));
          setAdmins(adminsArray);
          setLoading(false);
        } else {
          setAdmins([]);
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
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Created On</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        {admins ? (
          <TableBody>
            {admins.map(({ email, createdAt, uid }, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right"> {email} </StyledTableCell>
                <StyledTableCell align="right">{dayjs(createdAt).format('MMM DD YYYY HH:mm')}</StyledTableCell>
                <StyledTableCell align="right">
                  <Delete firebase={firebase} uid={uid} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        ) : (
          <div>No Admins</div>
        )}
      </Table>
    </TableContainer>
  );
}
