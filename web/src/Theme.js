import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#000'
    },
    secondary: {
      light: '#000',
      main: '#000',
      dark: '#000',
      contrastText: '#ff0'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: 'black',
          color: 'white'
        },
        a: {
          textTransform: 'none',
          textDecoration: 'none',
          color: 'inherit'
        },
        '.MuiPaper-root.MuiDrawer-paper': { background: '#111111', backgroundColor: '#111111', color: '#fff' }
      }
    }
  },
  customColors: {
    gray: '#111111',
    black: '#000000',
    yellow: '#ffff00'
  }
});
