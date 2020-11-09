import { makeStyles } from '@material-ui/core/styles';
export const Styles = makeStyles((theme) => ({
  root: {
    display: 'block',
    textAlign: 'center',
    width: '80%',
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
    },
    '& option': {
      backgroundColor: '#000',
      color: '#fff'
    }
  }
}));
