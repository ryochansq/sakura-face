import React, { VFC, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Container,
  Grid,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import useDetect from './hooks/useDetect';
import useFindSimilar from './hooks/useFindSimilar';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    body: {
      // padding: 0,
      marginTop: 8,
    },
    img: {
      width: '100%',
      objectFit: 'scale-down',
    },
  })
);

const App: VFC = () => {
  const classes = useStyles();
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  // const [detect, faces, detectError, isDetectLoading] = useDetect();
  // const [findSimilar, students, findSimilarError, isFindSimilarLoading] =
  //   useFindSimilar();
  const [detect, faces] = useDetect();
  const [findSimilar, students] = useFindSimilar();
  // const loading = isDetectLoading || isFindSimilarLoading;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    const file = files && files.length ? files[0] : null;
    if (!file) return;
    detect(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const { result } = reader;
      setImageData(result as string);
    };
  };

  const onClick = () => findSimilar(faces[0].faceId);

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            さくら学院の誰に似てるかな（開発中）
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" className={classes.body}>
        <Grid container spacing={2}>
          <Grid item container justify="center">
            <img src="camera_kao_ninshiki.png" alt="顔認識" />
          </Grid>
          <Grid item>
            <Typography>
              画像に写っている人が、さくら学院の中で
              <b>どの生徒にどのくらい似ている</b>のか判定するよ！
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
          </Grid>
          <Grid item container justify="center">
            <Button variant="contained" color="primary" component="label">
              画像を選択
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={onChangeInput}
              />
            </Button>
          </Grid>
          {imageData && (
            <Grid item container justify="center">
              <img src={imageData} alt="選択した画像" className={classes.img} />
            </Grid>
          )}
          {faces.length > 0 && (
            <Grid item container justify="center">
              <Button variant="contained" color="primary" onClick={onClick}>
                判定
              </Button>
            </Grid>
          )}
          <Grid item container justify="center">
            {students.length > 0 &&
              students.map((student) => (
                <Typography key={student.name}>
                  {student.name} : {student.confidence * 100}%
                </Typography>
              ))}
          </Grid>
          <Grid item container justify="flex-end">
            <Typography variant="caption">
              開発：{' '}
              <Link href="https://twitter.com/ryochan_metal" target="_blank">
                @ryochan_metal
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
