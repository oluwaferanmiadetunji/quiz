import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

export const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  formField: {
    margin: '20px 0',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0px'
    }
  }
});

export const Styles = makeStyles((theme) => ({
  root: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
    padding: 20,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: '100%',
      padding: 0
    }
  },
  formField: {
    margin: '20px 0',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0px'
    }
  },
}));