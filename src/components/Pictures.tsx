import React, { VFC, useState, useRef } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
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
    const newStudents = await findSimilar(faceId);
    setStudents(newStudents);
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
    const newFaces = await detect(file);
    setFaces(newFaces);
    setLoading(false);
    if (newFaces.length === 1) await onClickFaceRect(newFaces[0].faceId, 0);
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
                  <Typography>
                    判定したい顔を
                    <br />
                    タップしてください
                  </Typography>
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
              {students[0].confidence >= 0.7 ? 'です！' : 'に似ています！'}
            </Typography>
          </Grid>
          <Grid item container>
            {students.map((student) => (
              <Grid item container justify="center" key={student.name}>
                <Typography>
                  {student.name} ... 類似度{' '}
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
