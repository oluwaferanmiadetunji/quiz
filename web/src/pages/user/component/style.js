import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  root: {
    minWidth: 275,
    background: '#111'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20
  },
  pos: {
    marginBottom: 12
  },
  paper: {
    height: 140,
    width: 100
  }
});
