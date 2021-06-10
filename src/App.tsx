import { VFC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Container,
  createMuiTheme,
  Grid,
  Link,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Pictures from './components/Pictures';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#00acee',
    },
  },
});

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    container: {
      padding: 0,
    },
    body: {
      padding: 8,
    },
  })
);

const App: VFC = () => {
  const classes = useStyles();

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" className={classes.title}>
              さくら学院そっくりさん（開発中）
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md" className={classes.container}>
          <Paper className={classes.body}>
            <Grid container spacing={2}>
              <Grid item>
                <Typography>
                  画像に写っている人が、さくら学院の中で
                  <b>どの生徒にどのくらい似ているか</b>判定するよ！
                </Typography>
                <Typography variant="caption">
                  ※画像は判定のため
                  <Link
                    href="https://azure.microsoft.com/ja-jp/services/cognitive-services/face/#demo"
                    target="_blank"
                  >
                    Microsoft
                  </Link>
                  へ送信されます、それ以外には使用されません
                </Typography>
                <br />
                <Typography variant="caption">
                  ※顔全体が正面を向いて写っていると、認識されやすいです
                </Typography>
              </Grid>
              <Pictures />
              <Grid item container justify="flex-end">
                <Typography variant="caption">
                  開発：{' '}
                  <Link
                    href="https://twitter.com/ryochan_metal"
                    target="_blank"
                  >
                    @ryochan_metal
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
