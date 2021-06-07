import React, { VFC, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { detect, findSimilar } from '../hooks/useApi';

const useStyles = makeStyles(() =>
  createStyles({
    picturesOuter: {
      width: '100%',
      paddingTop: '50%',
      position: 'relative',
    },
    picturesInner: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    loaded: {
      width: '100%',
      objectFit: 'scale-down',
    },
  })
);

const Pictures: VFC = () => {
  const classes = useStyles();
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const [faces, setFaces] = useState<Face[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  // const [selectedFaceNum, setSelectedFaceNum] = useState(-1);

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    const file = files && files.length ? files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const { result } = reader;
      setImageData(result as string);
    };
    const newFaces = await detect(file);
    setFaces(newFaces);
  };

  const onClick = async () => {
    const newStudents = await findSimilar(faces[0].faceId);
    setStudents(newStudents);
  };

  return (
    <>
      {imageData && (
        <Grid item container>
          <Grid className={classes.picturesOuter}>
            <Grid
              className={classes.picturesInner}
              item
              container
              direction="row"
            >
              <Grid item container xs={6} justify="center" alignItems="center">
                <img
                  src={imageData}
                  alt="選択した画像"
                  className={classes.loaded}
                />
              </Grid>
              <Grid item container xs={6} justify="center" alignItems="center">
                fuga
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Grid item container justify="center">
        <Button variant="contained" color="primary" component="label">
          画像を選択
          <input type="file" accept="image/*" hidden onChange={onChangeInput} />
        </Button>
      </Grid>
      {faces.length > 0 && (
        <Grid item container justify="center">
          <Button variant="contained" color="primary" onClick={onClick}>
            判定
          </Button>
        </Grid>
      )}
      {students.length > 0 &&
        students.map((student) => (
          <Grid item container justify="center" key={student.name}>
            <Typography>
              {student.name} : {student.confidence * 100}%
            </Typography>
          </Grid>
        ))}
    </>
  );
};

export default Pictures;
