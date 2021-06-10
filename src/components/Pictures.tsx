import React, { VFC, useState, useRef } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import { AxiosError } from 'axios';
import { detect, findSimilar } from '../hooks/useApi';
import TweetButton from './TweetButton';

const useStyles = makeStyles(() =>
  createStyles({
    pictureContainer: {
      width: '100%',
      position: 'relative',
    },
    loaded: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    rightGrid: {
      aspectRatio: '500 / 634',
    },
    studentPicture: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    message: {
      fontWeight: 700,
      whiteSpace: 'pre-line',
    },
    tweet: {
      color: 'white',
      fontWeight: 700,
      textTransform: 'none',
    },
  })
);

const Pictures: VFC = () => {
  const classes = useStyles();
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const imgRef = useRef<HTMLImageElement>(null);
  const [faces, setFaces] = useState<Face[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFaceNum, setSelectedFaceNum] = useState(-1);
  const messages = {
    multiple: '判定したい顔を\nタップしてください',
    zero: '顔が検出されませんでした、別の画像をお試しください',
    imageError: '画像の処理に失敗しました、別の画像をお試しください',
    serverError: 'エラーが発生しました、時間をおいて再度お試しください',
  };
  const [message, setMessage] = useState(messages.multiple);

  const rectPos = (face: Face, type: keyof Face['faceRectangle']): string => {
    const wr = imgRef.current ? 100 / imgRef.current.naturalWidth : 0;
    const hr = imgRef.current ? 100 / imgRef.current.naturalHeight : 0;
    const ratio = ['left', 'width'].some((val) => val === type) ? wr : hr;
    const px = ['left', 'top'].some((val) => val === type) ? -2 : 4;
    return `calc(${face.faceRectangle[type] * ratio}% + ${px}px)`;
  };

  const onClickFaceRect = async (faceId: string, index: number) => {
    setSelectedFaceNum(index);
    setLoading(true);
    setFaces([]);
    try {
      const newStudents = await findSimilar(faceId);
      setStudents(newStudents);
    } catch {
      setMessage(messages.serverError);
    }
    setLoading(false);
  };

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    const file = files && files.length ? files[0] : null;
    if (!file) return;

    setLoading(true);
    setFaces([]);
    setStudents([]);
    setSelectedFaceNum(-1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const { result } = reader;
      setImageData(result as string);
    };
    if (file.size > 5000000) {
      setMessage('画像サイズが大きすぎます、別の画像をお試しください');
      setLoading(false);
      return;
    }
    try {
      const newFaces = await detect(file);
      setFaces(newFaces);
      setLoading(false);
      if (newFaces.length === 1) await onClickFaceRect(newFaces[0].faceId, 0);
      if (newFaces.length === 0) setMessage(messages.zero);
      else setMessage(messages.multiple);
    } catch (err) {
      const { response } = err as AxiosError<myError>;
      if (!response || response.status >= 500) {
        setMessage(messages.serverError);
      } else {
        // eslint-disable-next-line
        setMessage(`${messages.imageError}\n${response.data.error.message}`);
      }
      setLoading(false);
    }

    // TODO: Google アナリティクス登録
  };

  const rectColor = (faceNum: number): string => {
    if (selectedFaceNum === -1) return 'blue';
    if (faceNum === selectedFaceNum) return 'red';
    return 'white';
  };

  return (
    <>
      {imageData && (
        <Grid item container>
          <Grid item container direction="row">
            <Grid item container xs={6} justify="center" alignItems="center">
              <Grid className={classes.pictureContainer} item container>
                <img
                  ref={imgRef}
                  src={imageData}
                  alt="選択画像"
                  className={classes.loaded}
                />
                {faces.map((face, index) => (
                  <button
                    key={face.faceId}
                    onClick={() => onClickFaceRect(face.faceId, index)}
                    type="button"
                    style={{
                      backgroundColor: 'transparent',
                      border: `2px solid ${rectColor(index)}`,
                      color: 'transparent',
                      cursor: 'pointer',
                      position: 'absolute',
                      padding: 0,
                      left: rectPos(face, 'left'),
                      top: rectPos(face, 'top'),
                      width: rectPos(face, 'width'),
                      height: rectPos(face, 'height'),
                    }}
                  >
                    :
                  </button>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={6}
              justify="center"
              alignItems="center"
              className={classes.rightGrid}
            >
              {(() => {
                if (loading) return <CircularProgress />;
                if (students.length > 0)
                  return (
                    <img
                      className={classes.studentPicture}
                      src={`students/${students[0].name}.jpg`}
                      alt={`${students[0].name}`}
                    />
                  );
                return (
                  <Typography className={classes.message}>{message}</Typography>
                );
              })()}
            </Grid>
          </Grid>
        </Grid>
      )}
      {!imageData && (
        <Grid item container justify="center">
          <img src="camera_kao_ninshiki.png" alt="顔認識" />
        </Grid>
      )}
      {!students.length && (
        <Grid item container justify="center">
          <Button
            variant="contained"
            color="primary"
            component="label"
            disabled={loading}
          >
            {imageData ? '別の画像を選択' : '判定したい画像を選択'}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={onChangeInput}
            />
          </Button>
        </Grid>
      )}
      {students.length > 0 && !loading && (
        <>
          <Grid item container justify="center">
            <Typography>
              この人物は <b>{students[0].name}</b>{' '}
              {students[0].confidence >= 0.65 ? 'です！' : 'に似ています！'}
            </Typography>
          </Grid>
          <Grid item container>
            {students.map((student) => (
              <Grid item container justify="center" key={student.name}>
                <Typography>
                  {student.name} ... そっくり度{' '}
                  {(student.confidence * 100).toFixed(1)}%
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Grid item container direction="row" justify="center" spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component="label"
                disabled={loading}
              >
                別の画像で試す
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onChangeInput}
                />
              </Button>
            </Grid>
            <Grid item>
              <TweetButton students={students} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Pictures;
