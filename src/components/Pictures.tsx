import React, { VFC, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { detect, findSimilar } from '../hooks/useApi';

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

const Pictures: VFC = () => {
  const classes = useStyles();
  const [imageData, setImageData] = useState<string | undefined>(undefined);
  const [faces, setFaces] = useState<Face[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    const file = files && files.length ? files[0] : null;
    if (!file) return;

    const newFaces = await detect(file);
    setFaces(newFaces);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const { result } = reader;
      setImageData(result as string);
    };
  };

  const onClick = async () => {
    const newStudents = await findSimilar(faces[0].faceId);
    setStudents(newStudents);
  };

  return (
    <>
      <Grid item container justify="center">
        <Button variant="contained" color="primary" component="label">
          画像を選択
          <input type="file" accept="image/*" hidden onChange={onChangeInput} />
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
