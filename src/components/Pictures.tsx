import React, { VFC, useState, useRef } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { detect, findSimilar } from '../hooks/useApi';

const useStyles = makeStyles(() =>
  createStyles({
    pictureContainer: {
      position: 'relative',
    },
    loaded: {
      width: '100%',
      objectFit: 'contain',
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
  // const [selectedFaceNum, setSelectedFaceNum] = useState(-1);

  const widthRatio = imgRef.current ? 100 / imgRef.current.naturalWidth : 0;
  const heightRatio = imgRef.current ? 100 / imgRef.current.naturalHeight : 0;

  const onChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files } = target;
    const file = files && files.length ? files[0] : null;
    if (!file) return;

    setLoading(true);
    setFaces([]);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const { result } = reader;
      setImageData(result as string);
    };
    const newFaces = await detect(file);
    setFaces(newFaces);
    setLoading(false);
  };

  const onClickFaceRect = async (faceId: string) => {
    setLoading(true);
    const newStudents = await findSimilar(faceId);
    setStudents(newStudents);
    setLoading(false);
  };

  return (
    <>
      {imageData && (
        <Grid item container>
          <Grid item container direction="row">
            <Grid
              className={classes.pictureContainer}
              item
              container
              xs={6}
              justify="center"
              alignItems="center"
            >
              <img
                ref={imgRef}
                src={imageData}
                alt="選択画像"
                className={classes.loaded}
              />
              {faces.map((face) => (
                <button
                  key={face.faceId}
                  onClick={() => onClickFaceRect(face.faceId)}
                  type="button"
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid blue',
                    color: 'transparent',
                    cursor: 'pointer',
                    position: 'absolute',
                    left: `${face.faceRectangle.left * widthRatio}%`,
                    top: `${face.faceRectangle.top * heightRatio}%`,
                    width: `${face.faceRectangle.width * widthRatio}%`,
                    height: `${face.faceRectangle.height * heightRatio}%`,
                  }}
                >
                  :
                </button>
              ))}
            </Grid>
            <Grid item container xs={6} justify="center" alignItems="center">
              fuga
            </Grid>
          </Grid>
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
            画像を選択
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={onChangeInput}
            />
          </Button>
        </Grid>
      )}
      <Grid item container>
        {students.map((student) => (
          <Grid item container justify="center" key={student.name}>
            <Typography>
              {student.name} : {(student.confidence * 100).toFixed(1)}%
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Pictures;
