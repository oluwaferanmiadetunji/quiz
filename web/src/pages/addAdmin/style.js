import { makeStyles } from '@material-ui/core/styles';
export const Styles = makeStyles((theme) => ({
  root: {
    display: 'block',
    textAlign: 'center',
    width: '80%',
    margin: 'auto',
    padding: 20,
    background: '#111',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: '100%',
      padding: 5
    }
  },
  formField: {
    margin: '20px 0',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0px'
    }
  }
}));
